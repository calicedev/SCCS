import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import styled from 'styled-components'
import { useOutletContext } from 'react-router-dom'

import Button from 'components/common/Button'
import RoomInfo from 'components/study/RoomInfo'
import Chat from 'components/study/Chat'

export default function WaitingPage() {
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
  } = useOutletContext()
  const navigate = useNavigate()

  const [ready, setReady] = useState(false)
  const [readyList, setReadyList] = useState([])
  const [subscription, setSubscription] = useState(null)
  console.log(roomInfo)
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
        nickname: user.nickname,
        ready: ready,
      }),
    )
  }

  // 웹 소켓 send: 테스트 시작
  const sendStart = () => {
    if (roomInfo.hostId !== user.id) return
    stomp.send(
      '/pub/studyroom',
      {},
      JSON.stringify({
        status: 'start',
        studyroomId: studyroomId,
        nickname: user.nickname,
        membersNickname: [...readyList, user.nickname],
      }),
    )
  }

  // 웹 소켓 subscribe
  useEffect(() => {
    setSubscription(
      stomp.subscribe('/sub/studyroom/' + studyroomId, (chatDto) => {
        const content = JSON.parse(chatDto.body)
        if (content.status === 'ready') {
          // 준비 되었을 경우
          if (content.ready) {
            setReadyList((readyList) => [...readyList, content.nickname])
            return
          }
          // 준비되지 않았을 경우
          setReadyList((readyList) =>
            readyList.filter((nickname) => nickname !== content.nickname),
          )
          return
        }
        if (content.status === 'start') {
          setMembers(content.membersNickname)
          navigate(`/room/${studyroomId}/test`)
        }
      }),
    )
    return () => {
      subscription && subscription.unsubscribe()
    }
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
            value={ready ? 'Ready 취소' : 'Ready'}
          />
        )}
      </FlexBox>
      <FlexBox2>
        <StyledDiv>
          <h1>안내사항</h1>
          <Hr></Hr>
          <Body>
            <h4>사전 테스트 체험 페이지입니다. 아래 안내사항은 본 테스트를 기준으로 작성되었으니 유의 바랍니다.</h4>
            <br></br>
            <br></br>
            <h3>사전 테스트 체험</h3>
            <h4>방 인원들이 모두 우측 상단의 READY 버튼을 누르면, 방장이 테스트를 시작할 수 있습니다.</h4>
            <br></br>
            <br></br>
            <h4>코딩 테스트 화면에서</h4>
            <h4>테스트 버튼은 작성한 코드에 test case를 적용한 결과를 나타냅니다.</h4>
            <h4>제출 버튼은 작성한 코드를 서버에 제출합니다.</h4>
            <br></br>
            <br></br>
            <h4>테스트를 종료하고 싶을 경우 좌측 하단의 Finish 버튼을 눌러 테스트를 종료할 수 있습니다.</h4>
            <h4>방의 모든 인원드링 테스트를 종료한 경우 남은 시간에 관계없이 스터디 화면으로 넘어갑니다.</h4>
            <h3>테스트 시간                                                      테스트 문항</h3>
            <h4>120분                                                           5문제</h4>
            <h3>사용 언어                                                        문제 유형</h3>
            <h3>{roomInfo.algoIds}</h3>
            <h3>{roomInfo.languageIds}</h3>

          </Body>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.studyBgColor};
`

const Hr = styled.hr`
  border: 0;
  width: 90%;
  align: left;
  height: 2px;
  background: #BD5CCD;
}
`

const Body = styled.div`
  text-align: left;
`