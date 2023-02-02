import React from 'react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import sockjs from 'sockjs-client'
import stompjs from 'stompjs'

export default function WebSocket() {
  const studyroomId = 888
  const [enterMsg, setEnterMsg] = useState({})
  const [isReady, setIsReady] = useState(false)
  const [readyMsg, setReadyMsg] = useState({})
  const [exitMsg, setExitMsg] = useState({})

  var sock = new sockjs('http://70.12.246.176:8200/sccs')
  let stompClient = stompjs.over(sock)

  useEffect(() => {
    console.log('useEffect 일단 들어왔다~~~')

    stompClient.connect({}, () => {
      // 입장 (pub)
      stompClient.send(
        '/pub/studyrooom',
        {},
        JSON.stringify({
          studyroomId: studyroomId,
          nickname: 'REACT KING',
          status: 'enter',
        }),
      )

      // ************************ 여기서부터는 sub입니다******************************

      // 입장 (sub)
      stompClient.subscribe(
        '/sub/studyroom/' + studyroomId,
        function (chatDto) {
          // console.log(chatDto.body)
          var content = JSON.parse(chatDto.body)

          // console.log('입장 sub 데이터!!!', content)
          setEnterMsg(content)
        },
      )

      // 나가기
      stompClient.subscribe(
        '/sub/studyroom/exit/' + studyroomId,
        function (chatDto) {
          // console.log(chatDto.body)
          var content = JSON.parse(chatDto.body)
          stompClient.unsubscribe()
          setExitMsg(content)
          console.log(exitMsg.message)
        },
      )

      // READY (sub)
      stompClient.subscribe(
        '/sub/studyroom/ready/' + studyroomId,
        function (chatDto) {
          var content = JSON.parse(chatDto.body)
          setReadyMsg(content)
          setIsReady(true)
        },
      )
    })

    // stompClient.unsubscribe()
  }, [])

  const exit = () => {
    stompClient.send(
      '/pub/studyroom',
      {},
      JSON.stringify({
        studyroomId: studyroomId,
        nickname: 'REACT KING',
        status: 'exit',
      }),
    )
  }

  const ready = () => {
    // Ready(pub)
    stompClient.send(
      '/pub/studyroom',
      {},
      JSON.stringify({
        studyroomId: studyroomId,
        nickname: 'REACT KING',
        status: 'ready',
      }),
    )
  }

  // 연결 끊기
  // stompClient.disconnect()
  // console.log('연결끊김')

  return (
    <>
      <h1>WebSocket</h1>

      <h3>Enter msg</h3>
      <div>{enterMsg.message}</div>

      <Btn onClick={exit}>EXIT</Btn>
      <h3>Exit msg</h3>
      <div>{exitMsg.message}</div>

      <h3>Ready msg</h3>
      <Btn onClick={ready}>READY</Btn>
      <div>{isReady}</div>
      <div>{readyMsg.message}</div>

      {/* <div>{readyMsg.message}</div> */}
    </>
  )
}

const Btn = styled.button`
  font-size: 3rem;
  color: blue;
`
