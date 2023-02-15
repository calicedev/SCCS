import React, { useEffect, useState, useMemo } from 'react'
import styled from 'styled-components'
import { useOutletContext } from 'react-router-dom'
import { useWindowHeight } from 'hooks/useWindowHeight'
import api from 'constants/api'
import axios from 'libs/axios'
import Code from 'components/study/Code'
import Chat from 'components/study/Chat'
import Modal from 'components/common/Modal'
import Button from 'components/common/Button'
import Loading from 'components/common/Loading'
import RoomInfo from 'components/study/RoomInfo'
import ShareSection from 'components/study/ShareSection'
import ButtonDropdown from 'components/common/ButtonDropdown'
import ScreenVideoComponent from 'components/study/ScreenVideoComponent'

export default function StudyPage() {
  const {
    user,
    studyroomId,
    roomInfo,
    stomp,
    problems,
    message,
    setMessage,
    chatList,
    sendChat,
    OV,
    session,
    publisher,
    setPublisher,
    subscribers,
    setIsVideos,
    isVideos,
  } = useOutletContext()

  const windowHeight = useWindowHeight() // window의 innerHeight를 반환하는 커스텀 훅

  // useState
  const [subscription, setSubscription] = useState(null)

  const [codeProblems, setCodeProblems] = useState(null)
  const [codeProblemIdx, setCodeProblemIdx] = useState(0)

  const [presenter, setPresenter] = useState(null)
  const [mainStreamManager, setMainStreamManager] = useState(undefined)
  const [isScreenShare, setIsScreenShare] = useState(false)

  const [showModal, setShowModal] = useState(false)

  const [code, setCode] = useState('')
  const [codeLanguageId, setCodeLanguageId] = useState(1)
  const [myCode, setMyCode] = useState('')
  const [myCodeLanguageId, setMyCodeLanguageId] = useState(1)

  // 마운트 시, 코딩테스트 결과 요청
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchMyData() // myCode 업데이트
    changeScreen() // presenter, isScreenShare, isVideos 업데이트
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presenter])

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
          subscribers.forEach((sub) => {
            const getNicknameTag = JSON.parse(
              sub.stream.connection.data,
            ).clientData
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //openvidu MainStreamer 변경
  const handleMainVideoStream = (stream) => {
    if (mainStreamManager === stream) return
    setMainStreamManager(stream)
  }

  // 선택한 nickname의 불러와서 code, languageId 업데이트
  const fetchData = async (nickname) => {
    let idx = 0
    codeProblems[codeProblemIdx].codeList.forEach((code, index) => {
      if (code.memberNickname === nickname) {
        idx = index
        setCodeLanguageId(code.languageId)
      }
    })
    fetch(codeProblems[codeProblemIdx].codeList[idx].fileUrl)
      .then((res) => {
        return res.text()
      })
      .then((code) => {
        setCode(code)
      })
  }

  // 선택한 코드를 불러와서 myCode 업데이트
  const fetchMyData = async (e) => {
    let idx = 0
    codeProblems[codeProblemIdx].codeList.forEach((code, index) => {
      if (code.memberNickname === user.nickname) {
        idx = index
        setMyCodeLanguageId(code.languageId)
      }
    })
    fetch(codeProblems[codeProblemIdx].codeList[idx].fileUrl)
      .then((res) => {
        return res.text()
      })
      .then((code) => {
        setMyCode(code)
      })
  }

  // 내가 발표자인지 여부에 따라, publisher, isScreenShare, isVideos업데이트
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
          displaySurface: 'window',
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
      setIsVideos(false)
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
      setIsVideos(true)
    }
  }

  // 제출한 코드 목록을 바탕으로 발표후보 객체 형성
  // {nickname: nickname}
  const candidatesObject = useMemo(() => {
    if (!codeProblems) return {}
    const tempObject = {}
    codeProblems[codeProblemIdx].codeList.forEach((code) => {
      if (code.result === true) {
        tempObject[
          code.memberNickname
        ] = `${code.memberNickname} : ${code.runtime}` // pass 시에는0 runtime을 띄움
      } else {
        tempObject[code.memberNickname] = `${code.memberNickname} : fail` // fail 시에는 그냥 fail을 띄움
      }
    })
    return tempObject
  }, [codeProblems, codeProblemIdx])

  return (
    <>
      {showModal && (
        <Modal
          close={() => setShowModal(false)}
          content={
            <img
              src={codeProblems[codeProblemIdx].problemImgUrl}
              alt="문제 이미지"
              width="500px"
            ></img>
          }
        />
      )}
      {codeProblems ? (
        <Container>
          <FlexBox>
            <ButtonWrapper>
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
                    size="small"
                    value={idx + 1}
                    type={codeProblemIdx === idx ? 'primary' : 'secondary'}
                    onClick={() => changeProblem(idx)}
                  />
                )
              })}
              <Button
                size="small"
                value="문제 보기"
                type="primary"
                onClick={() => setShowModal(true)}
              />
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
            </ButtonWrapper>
            <ButtonDropdown
              title="다른 사람 코드"
              size="small"
              type="primary"
              options={candidatesObject}
              onClick={(e) => fetchData(e.target.id.split('-')[0])}
            />
          </FlexBox>
          <FlexBox2 height={isVideos ? windowHeight - 280 : windowHeight - 120}>
            {presenter === user.nickname ? (
              <ShareSection code={myCode} languageId={myCodeLanguageId} />
            ) : (
              <>
                {mainStreamManager && (
                  <StyledDiv>
                    <ScreenVideoComponent streamManager={mainStreamManager} />
                  </StyledDiv>
                )}
                <ColumnBox flexDirection={mainStreamManager ? 'column' : 'row'}>
                  <Code languageId={codeLanguageId} value={code} />
                  <Chat
                    chatList={chatList}
                    message={message}
                    onChangeMsg={(e) => setMessage(e.target.value)}
                    sendChat={sendChat}
                    user={user}
                  />
                </ColumnBox>
              </>
            )}
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

  width: 100vw;
  padding: 1rem;
`

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`

const FlexBox2 = styled.div`
  display: flex;
  gap: 5px;
  height: ${({ height }) => height}px;
`

const ColumnBox = styled.div`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection};
  gap: 5px;
  width: 100%;
`
const StyledDiv = styled.div`
  flex: 1;
`

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`
