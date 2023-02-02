import React from 'react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import sockjs from 'sockjs-client'
import stompjs from 'stompjs'

export default function WebSocket() {
  const [msg, setMsg] = useState({})
  const [studyroomId, setstudyroomId] = useState(777)
  const [ready, setReady] = useState(false)
  const [readyMsg, setReadyMsg] = useState({})

  useEffect(() => {
    console.log('useEffect 일단 들어왔다~~~')
    var sock = new sockjs('http://70.12.246.176:8080/sccs') // 수정필요해보임
    let stompClient = stompjs.over(sock)

    stompClient.connect({}, () => {
      // 입장 (pub)
      stompClient.send(
        '/pub/study/enter',
        {},
        JSON.stringify({
          studyroomId: studyroomId,
          nickname: 'REACT KING',
        }),
      )

      // 입장 (sub)
      stompClient.subscribe(
        '/sub/studyroom/' + studyroomId,
        function (chatDto) {
          // console.log(chatDto.body)
          var content = JSON.parse(chatDto.body)
          console.log('입장 sub 데이터!!!', content)
          setMsg(content)
        },
      )

      // // Ready(pub)
      // stompClient.send(
      //   '/pub/study/ready',
      //   {},
      //   JSON.stringify({
      //     studyroomId: studyroomId,
      //     nickname: 'REACT KING',
      //     ready: ready,
      //   }),
      // )

      // // READY (sub)
      // stompClient.subscribe(
      //   '/sub/studyroom/ready/' + studyroomId,
      //   function (chatDto) {
      //     var content = JSON.parse(chatDto.body)
      //     setReadyMsg(content)
      //   },
      // )
    })
  })

  return (
    <>
      <h1>WebSocket</h1>
      {ready || (
        <ReadyBtn
          onClick={() => {
            setReady(!ready)
          }}
        >
          READY
        </ReadyBtn>
      )}

      {ready && (
        <ReadyBtn
          onClick={() => {
            setReady(!ready)
          }}
        >
          CANCEL
        </ReadyBtn>
      )}

      <div>{msg.message}</div>
      {/* <div>{readyMsg.message}</div> */}
    </>
  )
}

const ReadyBtn = styled.button`
  font-size: 3rem;
  color: blue;
`
