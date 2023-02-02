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

  const nickname = '프로틴 러버 박균탁'

  var sock = new sockjs('http://70.12.246.176:8200/sccs')
  let stompClient = stompjs.over(sock)

  useEffect(() => {
    stompClient.connect({}, () => {
      // 입장 (pub)
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

      // 이거 그냥 배팅로얄처럼 if type == ㅇㅇ 이런식으로 더 간결하게 작성해줄 수 있겠다.

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
            // stompClient.unsubscribe(chatDto.body.nickname)
            stompClient.disconnect()
          }
          if (content.status === 'ready') {
            setReadyMsg(content)
            setIsReady(true)
          }
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
        nickname: nickname,
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
        nickname: nickname,
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

      <div>{enterMsg.message}</div>

      <Btn onClick={exit}>EXIT</Btn>
      <div>{exitMsg.message}</div>

      <Btn onClick={ready}>READY</Btn>
      <div>{readyMsg.message}</div>
    </>
  )
}

const Btn = styled.button`
  font-size: 3rem;
  color: blue;
`
