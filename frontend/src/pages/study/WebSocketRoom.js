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
import Study from './Study'

export default function WebSocketRoom() {
  const navigate = useNavigate()
  // 해당 페이지에 들어오자마자 axios 요청 보내서 방 정보를 얻어와서 화면에 뿌려주기

  const { studyroomId } = useParams()

  const [roomInfo, setRoomInfo] = useState(undefined)
  const [personnel, setPersonnel] = useState({ current: 0 })

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
  const [membersNickname, setMembersNickname] = useState([])

  // Study 페이지 state
  const [study, setStudy] = useState(false)
  const [readyForStudyArray, setReadyForStudyArray] = useState([])
  // 코테 페이지에서 axios로 가져온 정보를 study 페이지로 내려주기 위해 선언하는 state
  const [dataForStudy, setDataForStudy] = useState([])
  // 발표자 선정
  const [presenter, setPresenter] = useState('방장') // roomInfo.hostNickname

  const justMounted = useRef(true)

  // console.log(readyForStudyArray)
  // 새로고침시에 유저 수 그대로 유지하기
  window.addEventListener('beforeunload', (event) => {
    // 명세에 따라 preventDefault는 호출해야하며, 기본 동작을 방지합니다.
    event.preventDefault()
    disconnect(stomp)
  })

  // 브라우저창 닫을 시에 현재 인원 수 -1 (disconnect())
  window.addEventListener('unload', (event) => {
    // 명세에 따라 preventDefault는 호출해야하며, 기본 동작을 방지합니다.
    event.preventDefault()
    disconnect(stomp)
  })

  // 브라우저에서 뒤로가기 누를 시 (대기방) 인원수 -1 기능
  // 코테방, 스터디 방에서 뒤로가기 누를 시에는 메인페이지로 가지지만 인원수 count가 안됨. 추후 수정해보자 (2.10 민혁)
  // 그러기 위해서는 코테/스터디 페이지에서는 아예 뒤로가기 기능을 막아야할듯? (찾아보자)
  // 일단 뒤로가기 누르면 어느 페이지에서든 카운트 -1 되게 설정 (2.11 민혁)
  window.onpopstate = (event) => {
    // if (waitingRoom) {
    disconnect(stomp)
    // }
  }

  // 채팅방 관련 정보 axios 요청
  useEffect(() => {
    const [url, method] = api('enterRoom', { studyroomId })
    const config = { url, method }
    axios
      .request(config)
      .then((res) => {
        setPersonnel(res.data.personnel)
        setRoomInfo(res.data)
      })
      .catch((err) => {
        console.log('무슨에러일까?', err)
        alert('대기방 정보를 불러오지 못했습니다.')
        navigate('/')
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
            // personnel.current = personnel.current + 1
          }
          // 나가기
          if (content.status === 'exit') {
            setExitMsg(content)
            // console.log('content!!', content)
            setPersonnel(content.personnel)
            // console.log(exitMsg.message)
            // stomp.unsubscribe(chatDto.body.nickname)
            console.log('방장 닉네임', roomInfo.hostNickname)
            console.log('웹소켓 닉네임', content.nickname)
            if (content.nickname === roomInfo.hostNickname) {
              navigate('/')
            }
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
            console.log('콜백함수 내부에서 출력하는 채팅 기록', chatList)
            // 채팅 정보가 서버로부터 오면 배열에 저장
            // chatNickname.push(content.nickname)
            setChatNickname((chatNickname) => [
              ...chatNickname,
              content.nickname,
            ])
            // chatList.push(content.message)
            setChatList((chatList) => [...chatList, content.message])
          }
          if (content.status === 'start') {
            // 멤버 정보가 오면 배열에 저장
            setMembersNickname(content.membersNickname)
            setWaitingRoom(false)
            setCodingTest(true)
          }
          if (content.status === 'study') {
            // 시험 종료 버튼 전부 누르면 스터디 페이지로 이동

            // useState의 setReadyForStudyArray은 비동기적으로 처리되므로 그냥 push를 해주면 동기적으로 처리되는 것 같음
            // push를 했을 때 실제로 readyForStudyArray가 setState하는 것처럼 바뀜.
            // console.log 찍어봐도 같음.
            readyForStudyArray.push(content.nickname)
            console.log(
              '바깥 state : ',
              readyForStudyArray,
              'stomp 내부 : ',
              content.readyForStudyArray,
            )
            console.log(
              '현재인원:',
              content.personnel,
              '배열길이 state:',
              readyForStudyArray.length,
              '배열길이 stomp 내부:',
              content.readyForStudyArray.length,
            )
            if (content.personnel === content.readyForStudyArray.length) {
              setCodingTest(false)
              setStudy(true)
            }
          }
          // 발표자 선정
          if (content.status === 'present') {
            setPresenter(presenter)
          }
        },
      )
    })
  }

  // useEffect(() => {
  //   if (!connected) return
  //   stomp.subscribe('/sub/studyroom/' + studyroomId, function (chatDto) {
  //     // console.log(chatDto.body)
  //     var content = JSON.parse(chatDto.body)
  //     // 입장
  //     if (content.status === 'chat') {
  //       console.log('콜백함수 밖에서 출력하는 채팅 기록', chatList)
  //     }
  //   })
  // }, [connected, chatList])

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
    stomp.send(
      '/pub/studyroom',
      {},
      JSON.stringify({
        studyroomId: studyroomId,
        nickname: nickname,
        status: 'start',
        membersNickname: [...readyArray, nickname],
      }),
    )
  }

  const startStudy = () => {
    stomp.send(
      '/pub/studyroom',
      {},
      JSON.stringify({
        studyroomId: studyroomId,
        nickname: nickname,
        status: 'study',
        personnel: personnel,
        readyForStudyArray: [...readyForStudyArray, nickname],
      }),
    )
  }

  // 발표자 변경 (study 페이지)
  const changePresenter = (presenterNickname) => {
    setPresenter(presenterNickname)
    stomp.send(
      '/pub/studyroom',
      {},
      JSON.stringify({
        studyroomId: studyroomId,
        nickname: nickname,
        status: 'present',
        presenter: presenterNickname,
      }),
    )
  }
  return (
    <>
      {connected && (
        <>
          {/* <div>{exitMsg.message}</div>
          <div>{enterMsg.message}</div>
          <div>{readyMsg.message}</div> */}

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

          {codingTest ? (
            <CodingTest
              studyroomId={studyroomId}
              membersNickname={membersNickname}
              roomInfo={roomInfo}
              personnel={personnel}
              startStudy={startStudy}
              id={id}
              nickname={nickname}
              dataForStudy={dataForStudy}
              setDataForStudy={setDataForStudy}
            />
          ) : null}
          {study ? (
            <Study
              roomInfo={roomInfo}
              studyroomId={studyroomId}
              personnel={personnel}
              dataForStudy={dataForStudy}
              readyForStudyArray={readyForStudyArray}
              presenter={presenter}
              setPresenter={setPresenter}
              id={id}
              changePresenter={changePresenter}
            />
          ) : null}
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

const TopNavBar = styled.div`
  background: grey;
`
