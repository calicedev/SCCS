import React from 'react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import sockjs from 'sockjs-client'
import stompjs from 'stompjs'
import { useSelector } from 'react-redux'

export default function WebSocket() {
  // 리덕스 -> 유저 id 읽기
  const user = useSelector((state) => state.user.nick)

  const studyroomId = 888
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

  const nickname = '제발 되게 해주세요 제발'

  const connect = function () {
    var sock = new sockjs('http://70.12.246.176:8200/sccs')
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

  // useEffect(() => {
  //   stomp.connect({}, () => {
  //     // 입장 (pub)
  //     stomp.send(
  //       '/pub/studyroom',
  //       {},
  //       JSON.stringify({
  //         studyroomId: studyroomId,
  //         nickname: nickname,
  //         status: 'enter',
  //       }),
  //     )

  //     // ************************ 여기서부터는 sub입니다******************************

  //     stomp.subscribe('/sub/studyroom/' + studyroomId, function (chatDto) {
  //       // console.log(chatDto.body)
  //       var content = JSON.parse(chatDto.body)
  //       // 입장
  //       if (content.status === 'enter') {
  //         setEnterMsg(content)
  //       }
  //       // 나가기
  //       if (content.status === 'exit') {
  //         setExitMsg(content)
  //         console.log(exitMsg.message)
  //         // stomp.unsubscribe(chatDto.body.nickname)
  //       }
  //       if (content.status === 'ready') {
  //         setReadyMsg(content)
  //         setIsReady(true)
  //       }
  //       if (content.status === 'chat') {
  //         // 채팅 정보가 서버러부터 오면 배열에 저장
  //         setChatNickname((chatNickname) => [...chatNickname, content.nickname])
  //         setChatList((chatList) => [...chatList, content.message])
  //       }
  //     })
  //   })
  //   // return stomp.disconnect()
  // }, [])

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
  if (connected) {
    return (
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
    )
  } else {
    return (
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
    )
  }
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
