import React, { useEffect, useState, useMemo } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { useWindowHeight } from 'hooks/useWindowHeight'
import { setReduxMembers } from 'redux/roomSlice'
import Chat from 'components/study/Chat'
import Button from 'components/common/Button'
import RoomInfo from 'components/study/RoomInfo'
import Announcement from 'components/study/Announcement'

export default function WaitingPage() {
  // props
  const {
    user,
    studyroomId,
    roomInfo,
    stomp,
    setMemberObject,
    message,
    setMessage,
    chatList,
    sendChat,
    isVideos,
    readyNicknameObject,
    setReadyNicknameObject,
  } = useOutletContext()

  // 리액트 훅 관련 함수 선언
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const windowHeight = useWindowHeight() // window의 innerHeight를 반환하는 커스텀 훅

  // useState
  const [ready, setReady] = useState(false)
  const [readyObject, setReadyObject] = useState({})
  const [subscription, setSubscription] = useState(null)

  const readyList = useMemo(() => {
    return Object.keys(readyObject)
  }, [readyObject])

  // Ready Button을 토글하는 함수
  const toggleReady = () => {
    const newReady = !ready
    setReady(newReady)
    sendReady(newReady)
  }

  // 웹 소켓 send: 테스트 준비
  const sendReady = (ready) => {
    stomp.send(
      '/pub/studyroom',
      {},
      JSON.stringify({
        status: 'ready',
        studyroomId: studyroomId,
        id: user.id,
        nickname: user.nickname,
        ready: ready,
      }),
    )
  }

  // 웹 소켓 send: 테스트 시작
  const sendStart = () => {
    if (roomInfo.hostId !== user.id) return
    readyObject[user.id] = true
    const memberIds = Object.keys(readyObject)
    stomp.send(
      '/pub/studyroom',
      {},
      JSON.stringify({
        status: 'start',
        studyroomId: studyroomId,
        id: user.id,
        nickname: user.nickname,
        memberIds: memberIds,
      }),
    )
  }

  // 웹 소켓 subscribe 함수
  useEffect(() => {
    setSubscription(
      stomp.subscribe('/sub/studyroom/' + studyroomId, (chatDto) => {
        const content = JSON.parse(chatDto.body)
        if (content.status === 'ready') {
          // 준비 되었을 경우
          if (content.ready) {
            setReadyObject((readyObject) => {
              const newReadyObject = { ...readyObject }
              newReadyObject[content.id] = true
              return newReadyObject
            })
            if (roomInfo.hostId !== user.id) return
            setReadyNicknameObject((readyNicknameObject) => {
              const newReadyNicknameObject = { ...readyNicknameObject }
              newReadyNicknameObject[content.nickname] = true
              return newReadyNicknameObject
            })
            return
          }
          // 준비되지 않았을 경우
          setReadyObject((readyObject) => {
            const newReadyObject = { ...readyObject }
            delete newReadyObject[content.id]
            return newReadyObject
          })
          if (roomInfo.hostId !== user.id) return
          setReadyNicknameObject((readyNicknameObject) => {
            const newReadyNicknameObject = { ...readyNicknameObject }
            delete newReadyNicknameObject[content.nickname]
            return newReadyNicknameObject
          })
          return
        }
        if (content.status === 'start') {
          const memberObject = {}
          content.memberIds.forEach((memberId) => {
            memberObject[memberId] = true
          })
          setMemberObject(memberObject)
          dispatch(setReduxMembers(memberObject))
          setReadyNicknameObject({})
          navigate(`/room/${studyroomId}/test`)
        }
      }),
    )
    return () => {
      subscription && subscription.unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
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
        {roomInfo.hostId === user.id ? (
          <Button
            onClick={sendStart}
            type="primary"
            size="small"
            value={
              roomInfo.personnel === readyList.length + 1
                ? '테스트 시작'
                : '준비 안됨'
            }
            disabled={
              roomInfo.personnel === readyList.length + 1 ? false : true
            }
          />
        ) : (
          <Button
            onClick={toggleReady}
            type="primary"
            size="small"
            value={ready ? 'Ready 취소' : 'Ready'}
          />
        )}
      </FlexBox>
      <FlexBox2 height={isVideos ? windowHeight - 280 : windowHeight - 120}>
        <Announcement
          languageIds={roomInfo.languageIds}
          algoIds={roomInfo.algoIds}
        ></Announcement>
        <Chat
          chatList={chatList}
          message={message}
          onChangeMsg={(e) => setMessage(e.target.value)}
          sendChat={sendChat}
          nickname={user.nickname}
          offset={isVideos ? 1000 : 500}
        />
      </FlexBox2>
    </Container>
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
  display: flex;
  justify-content: space-between;
  max-height: ${({ height }) => height}px;
  gap: 10px;
  height: 100%;
`
