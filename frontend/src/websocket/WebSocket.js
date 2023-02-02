import React from 'react'
import { useEffect, useState } from 'react'

import sockjs from 'sockjs-client'
import stompjs from 'stompjs'

export default function WebSocket() {
  const [msg, setMsg] = useState({})
  const [studyroomId, setstudyroomId] = useState(777)

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
          console.log('hi', content)
          setMsg(content)
        },
      )

      // Ready (pub)
      // stompClient.send(
      //   '/pub/study/ready',
      //   {},
      //   JSON.stringify({
      //     studyroomId: studyroomId,
      //     nickname: 'REACT KING',
      //   }),
      // )
    })
  })

  return (
    <>
      <h1>WebSocket</h1>
      <div>{msg.message}</div>
    </>
  )
}
