import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import axios from 'libs/axios'
import api from 'constants/api'

import styled from 'styled-components'

import sockjs from 'sockjs-client'
import stompjs from 'stompjs'

import WaitingRoom from './WaitingRoom'
import CodingTest from './CodingTest'

export default function WebSocketRoom() {
  const navigate = useNavigate()
  // 해당 페이지에 들어오자마자 axios 요청 보내서 방 정보를 얻어와서 화면에 뿌려주기

  const { studyroomId } = useParams()

  const [roomInfo, setRoomInfo] = useState(undefined)
  const [personnel, setPersonnel] = useState(0)

  const nickname = useSelector((state) => state.user.nickname)
  const id = useSelector((state) => state.user.id)

  const [stomp, setStomp] = useState(undefined)
  const [connected, setConnected] = useState(false)

  const [enterMsg, setEnterMsg] = useState('')
  const [exitMsg, setExitMsg] = useState('')
  const [readyMsg, setReadyMsg] = useState('')

  // 채팅 기능 관련 state
  const [chat, setChat] = useState('')
  const [chatList, setChatList] = useState([])
  const [chatNickname, setChatNickname] = useState([])

  // ready 관련 state
  const [readyOrNot, setReadyOrNot] = useState(false)
  const [readyArray, setReadyArray] = useState([])

  // waitingroom 출력 여부 state
  const [waitingRoom, setWaitingRoom] = useState(true)

  // CodingTest 페이지 state
  const [codingTest, setCodingTest] = useState(false) // CodingTest 페이지 노출 여부
  const [codingTestData, setCodingTestData] = useState({})

  const justMounted = useRef(true)

  // 새로고침시에 유저 수 그대로 유지하기
  window.addEventListener('beforeunload', (event) => {
    // 명세에 따라 preventDefault는 호출해야하며, 기본 동작을 방지합니다.
    event.preventDefault()
    disconnect(stomp)
  })

  // 브라우저창 닫을 시에 현재 인원 수 -1 (disconnect())o9
  window.addEventListener('unload', (event) => {
    // 명세에 따라 preventDefault는 호출해야하며, 기본 동작을 방지합니다.
    event.preventDefault()
    disconnect(stomp)
  })

  // 채팅방 관련 정보 axios 요청
  useEffect(() => {
    const [url, method] = api('enterRoom', { studyroomId })
    const config = { url, method }
    axios
      .request(config)
      .then((res) => {
        console.log('axios 요청에 대한 응답', res.data)
        setPersonnel(res.data.personnel)
        setRoomInfo(res.data)
      })
      .catch((err) => {
        alert('대기방 정보를 불러오지 못했습니다.')
      })
  }, [])

  // 똑똑하게 useEffect 쓰는법
  useEffect(() => {
    if (!roomInfo) return
    connect()
  }, [roomInfo])

  const disconnect = function () {
    if (stomp) {
      stomp.send(
        '/pub/studyroom',
        {},
        JSON.stringify({
          studyroomId: studyroomId,
          nickname: nickname,
          status: 'exit',
        }),
      )
      stomp.disconnect()
      setConnected(false)
    }
  }

  // 웹소켓 통신 열기 hello
  const connect = function () {
    var sock = new sockjs('https://sccs.kr/sccs')
    const stompClient = stompjs.over(sock)
    setStomp(stompClient)
    stompClient.connect({}, function (chatDto) {
      setConnected(true)

      stompClient.send(
        '/pub/studyroom',
        {},
        JSON.stringify({
          studyroomId: studyroomId,
          nickname: nickname,
          status: 'enter',
        }),
      )
      console.log('입장 에베베베베베~')

      // ************************ 여기서부터는 sub입니다******************************

      stompClient.subscribe(
        '/sub/studyroom/' + studyroomId,
        function (chatDto) {
          // console.log(chatDto.body)
          var content = JSON.parse(chatDto.body)
          // 입장
          if (content.status === 'enter') {
            setEnterMsg(content)
            setPersonnel(content.personnel)
          }
          // 나가기
          if (content.status === 'exit') {
            setExitMsg(content)
            // console.log('content!!', content)
            setPersonnel(content.personnel)
            // console.log(exitMsg.message)
            // stomp.unsubscribe(chatDto.body.nickname)
          }
          if (content.status === 'ready') {
            // console.log('ready!!!!!!!!!!!!!!', content.message)
            console.log(id)
            console.log(roomInfo.hostId)
            setReadyMsg(content.message)
            // 이 로직에서 자신이 방장인데도 방장이 아닌 곳으로 향함
            // 나중에 방장인 if문으로 향해도 빈배열만 나옴... 대체 왜?
            // 로컬에서 새로고침해서 인원수가 늘어나면 그제서야 배열에 닉네임이 추가된 걸 볼 수 있음.. 돌겠다 ㄹㅇ
            if (id === roomInfo.hostId) {
              if (content.ready) {
                // console.log('변경 전', readyArray)

                setReadyArray((readyArray) => [...readyArray, content.nickname])
                setTimeout(() => {
                  // console.log('변경 후', readyArray)
                })
              } else {
                const newArray = readyArray.filter((nickname) => {
                  return nickname !== content.nickname
                })
                setReadyArray(newArray)
                // console.log('레디취소 누름', readyArray)
              }
            } else {
              console.log('난 방장이 아님!!')
            }
          }
          if (content.status === 'chat') {
            // 채팅 정보가 서버로부터 오면 배열에 저장
            setChatNickname((chatNickname) => [
              ...chatNickname,
              content.nickname,
            ])
            setChatList((chatList) => [...chatList, content.message])
          }
        },
      )
    })
  }

  const ready = () => {
    setReadyOrNot(!readyOrNot)
  }

  // isReady 변경시에만 실행
  useEffect(() => {
    // useRef는 재랜더링될 때에도 바뀌지 않음
    if (justMounted.current) {
      justMounted.current = false
      return
    }
    console.log('버튼 누른 직후', readyOrNot)
    stomp.send(
      '/pub/studyroom',
      {},
      JSON.stringify({
        studyroomId: studyroomId,
        nickname: nickname,
        ready: readyOrNot,
        status: 'ready',
      }),
    )
  }, [readyOrNot])

  // 서버에 메시지 요청 보낼 함수
  const sendMsg = (chat) => {
    stomp.send(
      '/pub/studyroom',
      {},
      JSON.stringify({
        studyroomId: studyroomId,
        nickname: nickname,
        status: 'chat',
        message: chat,
      }),
    )
    setChat('')
  }

  // input에 담을 메시지
  const changeMsg = (e) => {
    setChat(e.target.value)
    // console.log(chat)
  }

  const submitMsg = (e) => {
    e.preventDefault()
    sendMsg(chat)
  }

  const startCodingTest = () => {
    const data = {
      id: 28,
      memberIds: ['calice', 'def', 'dsd'],
    }
    const [url, method] = api('codingTest')
    const config = { url, method, data }
    axios(config)
      .then((res) => {
        console.log(res.data)
        setCodingTestData(res.data)
        setWaitingRoom(false)
        setCodingTest(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      {connected && (
        <>
          <h1>여기는 전체 웹소켓</h1>
          <div>{exitMsg.message}</div>
          <div>{enterMsg.message}</div>
          <div>{readyMsg.message}</div>

          <H />
          {waitingRoom ? (
            <WaitingRoom
              // 기본정보
              studyroomId={studyroomId}
              roomInfo={roomInfo}
              personnel={personnel}
              nickname={nickname}
              id={id}
              // exit 기능
              disconnect={disconnect}
              // 채팅 기능
              submitMsg={submitMsg}
              changeMsg={changeMsg}
              chat={chat}
              chatList={chatList}
              chatNickname={chatNickname}
              // 레디 기능
              ready={ready}
              readyOrNot={readyOrNot}
              readyArray={readyArray}
              // 시작 기능
              startCodingTest={startCodingTest}
            />
          ) : null}

          {codingTest ? <CodingTest codingTestData={codingTestData} /> : null}
        </>
      )}
      {connected || (
        <div>
          <h1>Not connected</h1>
          <Btn
            onClick={function () {
              connect(stomp)
            }}
          >
            Connect
          </Btn>
        </div>
      )}
    </>
  )
}

const Btn = styled.button`
  font-size: 2.5rem;
  color: white;
  background-color: skyblue;
  round: 1;
  border: solid 2px grey;
  border-radius: 12px;
  padding: 5px;
`

const MyInput = styled.textarea`
  width: 35rem;
  height: 7rem;
  border: black 1px solid;
`

const MySubmit = styled.input`
  width: 5rem;
  height: 3rem;
  background-color: pink;
`

const H = styled.hr`
  background: indigo;
  height: 1px;
`
