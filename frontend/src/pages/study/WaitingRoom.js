import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import axios from 'libs/axios'
import api from 'constants/api'

import styled from 'styled-components'

import sockjs from 'sockjs-client'
import stompjs from 'stompjs'

export default function WaitingRoom() {
  // 해당 페이지에 들어오자마자 axios 요청 보내서 방 정보를 얻어와서 화면에 뿌려주기
  const { studyroomId } = useParams()
  const [roomInfo, setRoomInfo] = useState({})

  const nickname = useSelector((state) => state.user.nickname)

  const [stomp, setStomp] = useState(false)
  const [connected, setConnected] = useState(false)
  const [enterMsg, setEnterMsg] = useState({})
  const [isReady, setIsReady] = useState(false)
  const [readyMsg, setReadyMsg] = useState({})
  const [exitMsg, setExitMsg] = useState({})

  // 채팅 기능 관련 state
  const [chat, setChat] = useState('')
  const [chatList, setChatList] = useState([])
  const [chatNickname, setChatNickname] = useState([])

  // 채팅방 관련 정보 axios 요청
  useEffect(() => {
    const [url, method] = api('enterRoom', { studyroomId })
    const config = { url, method }
    axios
      .request(config)
      .then((res) => {
        // console.log(res.data)
        setRoomInfo(res.data)
      })
      .catch((err) => {
        alert('대기방 정보를 불러오지 못했습니다.')
      })
  }, [])

  // 웹소켓 통신 열기
  const connect = function () {
    var sock = new sockjs('http://sccs.kr/sccs')
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

      // ************************ 여기서부터는 sub입니다******************************

      stompClient.subscribe(
        '/sub/studyroom/' + studyroomId,
        function (chatDto) {
          // console.log(chatDto.body)
          var content = JSON.parse(chatDto.body)
          // 입장
          if (content.status === 'enter') {
            setEnterMsg(content)
          }
          // 나가기
          if (content.status === 'exit') {
            setExitMsg(content)
            console.log(exitMsg.message)
            // stomp.unsubscribe(chatDto.body.nickname)
          }
          if (content.status === 'ready') {
            setReadyMsg(content)
            setIsReady(true)
          }
          if (content.status === 'chat') {
            // 채팅 정보가 서버러부터 오면 배열에 저장
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

  const disconnect = function () {
    if (stomp) {
      stomp.disconnect()
      setConnected(false)
    }
  }

  // 똑똑하게 useEffect 쓰는법
  useEffect(function () {
    connect()

    return function () {
      disconnect()
    }
  }, [])

  const exit = () => {
    stomp.disconnect()
    stomp.send(
      '/pub/studyroom',
      {},
      JSON.stringify({
        studyroomId: studyroomId,
        nickname: nickname,
        status: 'exit',
      }),
    )
  }

  const ready = () => {
    stomp.send(
      '/pub/studyroom',
      {},
      JSON.stringify({
        studyroomId: studyroomId,
        nickname: nickname,
        status: 'ready',
      }),
    )
  }

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

  // input에
  const changeMsg = (e) => {
    setChat(e.target.value)
    // console.log(chat)
  }

  const submitMsg = (e) => {
    e.preventDefault()
    sendMsg(chat)
  }

  return (
    <>
      <h1>{studyroomId}번 대기방</h1>
      <h3>방제목 : {roomInfo.title}</h3>
      <h3>방장 : {roomInfo.hostId}</h3>
      <h3>로그인된 유저 : {nickname}</h3>
      {connected && (
        <>
          <h1>WebSocket</h1>
          <h1>Connected</h1>
          <Btn
            onClick={function () {
              disconnect(stomp)
            }}
          >
            Disconnect
          </Btn>

          <div>{enterMsg.message}</div>

          <Btn onClick={exit}>EXIT</Btn>
          <div>{exitMsg.message}</div>

          <Btn onClick={ready}>READY</Btn>
          <div>{isReady}</div>
          <div>{readyMsg.message}</div>

          <H />

          <form onSubmit={submitMsg}>
            <MyInput
              type="text"
              placeholder="좋은 말로 할 때 메시지 입력해라 ㅡ.ㅡ"
              value={chat}
              onChange={changeMsg}
            />
            <br />
            <MySubmit type="submit" value="Send" />
          </form>
          <ul>
            {chatList.map((chat, idx) => {
              return (
                <div key={idx}>
                  {chatNickname[idx]} : {chat}
                </div>
              )
            })}
          </ul>
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
