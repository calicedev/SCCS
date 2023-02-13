import React, { useEffect, useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useOutletContext } from 'react-router-dom'
import axios from 'libs/axios'
import api from 'constants/api'

import styled from 'styled-components'
import Chat from 'components/study/Chat'

import Drawing from 'components/study/Drawing'
import { algorithmPk, languagePk } from 'constants/pk'
import Button from 'components/common/Button'
import ButtonDropdown from 'components/common/ButtonDropdown'
import RoomInfo from 'components/study/RoomInfo'
import Loading from 'components/common/Loading'
import ShareSection from 'components/study/ShareSection'
import ScreenVideoComponent from 'components/study/ScreenVideoComponent'
import { GiCondorEmblem } from 'react-icons/gi'

export default function StudyPage() {
  const {
    user,
    studyroomId,
    roomInfo,
    stomp,
    connected,
    members,
    setMembers,
    problems,
    setProblems,
    message,
    setMessage,
    chatList,
    sendChat,
    disconnect,
    OV,
    session,
    publisher,
    setPublisher,
    subscribers,
    // mainStreamManager,
    // setMainStreamManager,
  } = useOutletContext()

  const [subscription, setSubscription] = useState(null)
  const [presenter, setPresenter] = useState(roomInfo.hostNickname)
  const [isScreenShare, setIsScreenShare] = useState(false)
  const [codeProblems, setCodeProblems] = useState(null)
  const [codeProblemIdx, setCodeProblemIdx] = useState(0)
  const [mainStreamManager, setMainStreamManager] = useState(undefined)

  const [screenContent, setScreenContent] = useState(null)

  const handleMainVideoStream = (stream) => {
    if (mainStreamManager === stream) return
    setMainStreamManager(stream)
  }

  // 코딩테스트 결과 요청
  useEffect(() => {
    const problemIds = problems.map((problem) => problem.id)
    const data = {
      id: studyroomId,
      problemIds: problemIds,
    }
    const [url, method] = api('study')
    const config = { url, method, data }
    axios(config)
      .then((res) => {
        setCodeProblems(res.data)
      })
      .catch((err) => {})
  }, [])

  // 웹 소켓 send: 문제 변경 (study 페이지)
  const changeProblem = (idx) => {
    if (roomInfo.hostId !== user.id) return
    stomp.send(
      '/pub/studyroom',
      {},
      JSON.stringify({
        status: 'problem',
        studyroomId: studyroomId,
        problemIdx: idx,
      }),
    )
  }

  // 웹 소켓 send: 발표자 변경 (study 페이지)
  const changePresenter = (nickname) => {
    if (roomInfo.hostId !== user.id) return
    stomp.send(
      '/pub/studyroom',
      {},
      JSON.stringify({
        status: 'present',
        studyroomId: studyroomId,
        presenter: nickname,
      }),
    )
  }

  // 웹 소켓 subscribe
  useEffect(() => {
    setSubscription(
      stomp.subscribe('/sub/studyroom/' + studyroomId, (chatDto) => {
        const content = JSON.parse(chatDto.body)
        if (content.status === 'present') {
          setPresenter(content.presenter)
          console.log('setPresent')
          subscribers.forEach((sub) => {
            const getNicknameTag = JSON.parse(
              sub.stream.connection.data,
            ).clientData
            console.log('sub', sub)
            console.log('nickname', getNicknameTag)
            if (getNicknameTag === content.presenter) {
              console.log('handleMainStream')
              handleMainVideoStream(sub)
            }
          })
        }
        if (content.status === 'problem') {
          setCodeProblemIdx(content.problemIdx)
        }
      }),
    )
    return () => {
      subscription && subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    changeScreen()
  }, [presenter])

  // 오픈비두 스크린 쉐어
  const changeScreen = async () => {
    // 내가 발표자일 경우
    if (presenter === user.nickname) {
      const canvas = document.querySelector('#code-with-drawing')
      const rect = canvas.getBoundingClientRect()

      const x = rect.left
      const y = rect.top
      const width = rect.width
      const height = rect.height
      console.log(x, y, width, height)

      const track = await navigator.mediaDevices
        .getDisplayMedia({
          displaySurface: 'screen',
          captureArea: {
            x: x,
            y: y,
            width: width,
            height: height,
          },
        })
        .then(function (stream) {
          return stream.getVideoTracks()[0]
          // do something with the stream
        })
      publisher.replaceTrack(track)
      setIsScreenShare(true)
      // const ctx = canvas.getContext('2d')
      // const [type, content] = await getScreenContent()
      // setScreenContent([type, content])
      // ctx.fillStyle = 'white'
      // ctx.fillRect(0, 0, canvas.width, canvas.height)
      // if (type === 'code') {
      //   ctx.lineWidth = '0.1px'
      //   ctx.strokeStyle = 'black'
      //   ctx.font = '1rem serif'
      //   ctx.strokeText(content, 10, 10)
      // } else {
      //   const problemImage = new Image(canvas.width, canvas.height)
      //   problemImage.src = content
      //   console.log('content', problemImage)
      //   ctx.drawImage(problemImage, 0, 0)
      // }
      // const track = canvas.captureStream(10).getVideoTracks()[0]
      // publisher.replaceTrack(track)
      // setIsScreenShare(true)
    }

    // 내가 이전에 발표자였을 경우
    else if (isScreenShare) {
      const devices = await OV.current.getDevices()
      // videoDevice 배열 추출
      const videoDevices = devices.filter(
        (device) => device.kind === 'videoinput',
      )
      const newPublisher = OV.current.initPublisher(undefined, {
        videoSource: videoDevices[0].deviceId,
        publishAudio: true,
        publishVideo: true,
        mirror: false,
      })
      await session.unpublish(publisher)
      await session.publish(newPublisher)

      //   setMainStreamManager(undefined)
      setPublisher(newPublisher)
      setIsScreenShare(false)
    }
  }

  // 멤버로 발표 후보자 객체 생성
  const candidatesObject = useMemo(() => {
    const tempObject = {}
    members.forEach((member) => {
      tempObject[member] = member
    })
    return tempObject
  }, [members])

  // 발표자 선택 시, 스크린 컨텐츠 형성
  const getScreenContent = async () => {
    const selectedCodeList = codeProblems[codeProblemIdx].codeList
    let myCode = null // 내 코드 객체

    console.log('selectedCodeList', selectedCodeList)
    selectedCodeList.forEach((code) => {
      if (code.memberId === user.id) {
        myCode = code
      }
    })

    console.log('myCode', myCode)

    let screenContent = [] //내 코드 스트링 or Img Url
    if (myCode) {
      screenContent = await fetch(myCode.fileUrl)
        .then((res) => {
          console.log('res!!!!!!!', res)
          console.log('res.text!!!!!!!', res.text())

          return ['code', res.text()]
          return res.text()
        })
        .then((res) => {
          console.log('after then', res)
        })
        .catch((err) => {
          console.log('code', err)
        })
    } else {
      screenContent = ['img', codeProblems[codeProblemIdx].problemImgUrl]
    }

    console.log('screenContent', screenContent)
    return screenContent
  }

  return (
    <>
      {codeProblems ? (
        <Container>
          <FlexBox>
            <RoomInfo
              id={roomInfo.id}
              title={roomInfo.title}
              languageIds={roomInfo.languageIds}
              algoIds={roomInfo.algoIds}
              hostNickname={roomInfo.hostNickname}
              personnel={roomInfo.personnel}
            />
            {[...Array(codeProblems.length).keys()].map((idx) => {
              return (
                <Button
                  key={`${idx}-code-problem`}
                  size="medium"
                  value={idx + 1}
                  disabled={roomInfo.hostId === user.id ? false : true}
                  type={codeProblemIdx === idx ? 'primary' : 'secondary'}
                  onClick={() => changeProblem(idx)}
                />
              )
            })}
            {roomInfo.hostId === user.id && (
              <>
                <ButtonDropdown
                  title="발표자 선택"
                  size="small"
                  type="primary"
                  options={candidatesObject}
                  onClick={(e) => changePresenter(e.target.id.split('-')[0])}
                />
              </>
            )}
          </FlexBox>
          <FlexBox2>
            <StyledDiv>
              {presenter === user.nickname ? (
                <ShareSection screenContent={screenContent} />
              ) : (
                mainStreamManager && (
                  <ScreenVideoComponent streamManager={mainStreamManager} />
                )
              )}
            </StyledDiv>
            <Chat
              chatList={chatList}
              message={message}
              onChangeMsg={(e) => setMessage(e.target.value)}
              sendChat={sendChat}
              user={user}
            />
          </FlexBox2>
        </Container>
      ) : (
        <Loading height="70vh" />
      )}
    </>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 1rem;
  height: 100%;
`

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`

const FlexBox2 = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;
`
const StyledDiv = styled.div`
  flex: 1;
`
