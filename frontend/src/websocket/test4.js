import logo from './logo.svg'
import './App.css'
import { useEffect, useState } from 'react'
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'

function App() {
  let [connected, setConnected] = useState(false)
  let [stomp, setStomp] = useState()

  let [username, setUsername] = useState('')
  let [text, setText] = useState('')

  let [messages, setMessages] = useState([])

  let connect = function () {
    var socket = new SockJS('http://localhost:5000/chat')
    let stompClient = Stomp.over(socket)
    setStomp(stompClient)
    stompClient.connect({}, function (frame) {
      setConnected(true)
      stompClient.subscribe('/topic/messages', function (messageOutput) {
        console.log(messageOutput)
        setMessages((old) => {
          let copy = [...old]
          copy.push(JSON.parse(messageOutput.body))
          return copy
        })
      })
    })
  }

  let disconnect = function () {
    if (stomp) {
      stomp.disconnect()
      setConnected(false)
    }
  }

  useEffect(function () {
    connect()

    return function () {
      disconnect()
    }
  }, [])

  if (connected) {
    return (
      <div className="App">
        <h1>Connected</h1>
        <button
          onClick={function () {
            disconnect(stomp)
          }}
        >
          Disconnect
        </button>

        <input
          value={username}
          onChange={function (event) {
            setUsername(event.target.value)
          }}
        ></input>
        <input
          value={text}
          onChange={function (event) {
            setText(event.target.value)
          }}
        ></input>

        <button
          onClick={function () {
            stomp.send(
              '/app/chat',
              {},
              JSON.stringify({ from: username, text: text }),
            )
          }}
        >
          Send
        </button>

        <div>
          {messages.map(function (message, idx) {
            return (
              <div key={idx}>
                {message.from} : {message.text}
              </div>
            )
          })}
        </div>
      </div>
    )
  } else {
    return (
      <div className="App">
        <h1>Not connected</h1>
        <button
          onClick={function () {
            connect(stomp)
          }}
        >
          Connect
        </button>
      </div>
    )
  }
}

export default App
