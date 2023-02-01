import React from 'react'
import { useEffect, useState } from 'react'

import sockjs from 'sockjs-client'
import stompjs from 'stompjs'

export default function WebSocket() {
  const [msg, setMsg] = useState({})

  useEffect(() => {
    console.log('useEffect 일단 들어왔다~~~')
    var sock = new sockjs('http://70.12.246.176:8080/stomp-game') // 수정필요해보임
    let stomp = stompjs.over(sock)

    stomp.connect({}, () => {
      stomp.send(
        '/pub/game/message',
        {},
        JSON.stringify({
          roomId: 1,
          sender: 'REACT KING',
          type: 'ENTER',
        }),
      )
      stomp.subscribe('/sub/game/room', function (chatDto) {
        // console.log(chatDto.body)
        var content = JSON.parse(chatDto.body)
        console.log('hi', content)
        setMsg(content)
      })
    })
  })

  return (
    <>
      <h1>WebSocket</h1>
      <div>{msg.message}</div>
    </>
  )
}
