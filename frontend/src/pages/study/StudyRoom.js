import React, { useEffect, useState, useRef, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate, Outlet, useLocation } from 'react-router-dom'
import stompjs from 'stompjs'
import axiosOriginal from 'axios'
import sockjs from 'sockjs-client'
import styled from 'styled-components'
import * as faceapi from 'face-api.js'
import { OpenVidu } from 'openvidu-browser'
import { toggleTheme } from 'redux/themeSlice'
import {
  setReduxRoomInfo,
  setReduxMainStreamManager,
  setReduxMembers,
  setReduxFinishedObject,
  deleteRoom,
} from 'redux/roomSlice'
import api from 'constants/api'
import axios from 'libs/axios'
import ToolBar from 'components/study/ToolBar'
import Loading from 'components/common/Loading'
import VideoList from 'components/study/VideoList'
import absentImg from 'assets/img/webRTC_absent_image.png'
import presentImg from 'assets/img/webRTC_present_image.png'

//Openvidu AppServer
// const APPLICATION_SERVER_URL = 'http://localhost:5000/'
const APPLICATION_SERVER_URL = 'https://sccs.kr/'

export default function StudyRoom() {
  // 리덕스 -> 기존 방 정보 읽어오기
  const room = useSelector((state) => state.room)

  // 리액트 훅 관련 함수 정의
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  // 리덕스
  const theme = useSelector((state) => state.theme)
  const user = useSelector((state) => state.user)

  // 기본정보
  const { studyroomId } = useParams()
  const [roomInfo, setRoomInfo] = useState(room)
  const [problems, setProblems] = useState(room.problems)
  const [memberObject, setMemberObject] = useState(
    room.members ? room.members : {},
  )

  const memberList = useMemo(() => {
    return Object.keys(memberObject)
  }, [memberObject])

  // 웹소켓 useState
  const [stomp, setStomp] = useState(null)
  const [connected, setConnected] = useState(false)

  // 채팅 useState
  const [message, setMessage] = useState('')
  const [chatList, setChatList] = useState([])

  // 레디 상태를 비디오에 표시하기 위한 리스트
  const [readyNicknameObject, setReadyNicknameObject] = useState({})

  const readyNicknameList = useMemo(() => {
    return Object.keys(readyNicknameObject)
  }, [readyNicknameObject])

  // Opnvidu useState
  const [session, setSession] = useState(undefined)
  const [mainStreamManager, setMainStreamManager] = useState(undefined)
  const [publisher, setPublisher] = useState(undefined)
  const [subscribers, setSubscribers] = useState([])
  const [currentVideoDevice, setCurrentVideoDevice] = useState(undefined)

  const [isMicOn, setIsMicOn] = useState(false)
  const [isVideos, setIsVideos] = useState(true)
  const [isCameraOn, setIsCameraOn] = useState(true)
  const [isScreenShare, setIsScreenShare] = useState(room.isScreenShare)

  const checkHostExit = useRef(null)
  const OV = useRef(null) // OV객체를 저장
  const faceInterval = useRef(null) // face-api 동작 시, setInterval 객체를 저장

  // finished를 막힘없이 받기 위해서
  const [finishedObject, setFinishedObject] = useState(
    room.finishedObject ? room.finishedObject : {},
  )

  const finishedList = useMemo(() => {
    return Object.keys(finishedObject)
  }, [finishedObject])

  // 스터디룸 정보 axios 요청
  useEffect(() => {
    if (JSON.stringify(roomInfo) === '{}') {
      const [url, method] = api('enterRoom', { studyroomId })
      const config = { url, method }
      axios
        .request(config)
        .then((res) => {
          const roomInfo = res.data
          setRoomInfo(roomInfo)
          dispatch(setReduxRoomInfo(roomInfo))
        })
        .catch((err) => {
          if (err.response.status === 400) {
            alert(err.response.status.data.message) // 이미 문제를 풀고 있는 방입니다. 대기방이 꽉 찼습니다.
          }
          if (err.response.status === 404) {
            alert('방 정보를 불러올 수 없습니다.')
          }
          exit()
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // mount시에 소켓통신과 webRTC 연결, unmount 시 소켓통신과 webRTC 연결 해제
  useEffect(() => {
    joinSession()
    connect()
    return () => {
      disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 새로고침 시
  window.addEventListener('beforeunload', (event) => {
    // 명세에 따라 preventDefault는 호출해야하며, 기본 동작을 방지합니다.
    event.preventDefault()
    disconnect()
  })

  // 브라우저창 닫을 시
  window.addEventListener('unload', (event) => {
    // 명세에 따라 preventDefault는 호출해야하며, 기본 동작을 방지합니다.
    event.preventDefault()
    exit()
  })

  // 뒤로가기 막기
  useEffect(() => {
    const handlePopstate = (event) => {
      event.preventDefault()
    }

    window.history.pushState(null, null, location.href)
    window.addEventListener('popstate', handlePopstate)

    return () => {
      window.removeEventListener('popstate', handlePopstate)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // webSocket과 openvidu session을 끊는 함수
  const disconnect = () => {
    // 1. 웹소켓 통신 끊기
    if (stomp) {
      sendDisconnect()
      stomp.disconnect()
    }
    // 2. openvidu 세션 끊기
    if (session) {
      session.disconnect()
    }
    // 3. face-interval 비디오 초기화
    const video = document.getElementById('publisher-video')
    if (video) {
      video.srcObject = undefined
    }
    if (faceInterval.current) {
      clearInterval(faceInterval.current)
      faceInterval.current = null
    }
    // 4. 관련 변수 모두 초기화
    setConnected(false)
    OV.current = null
    setSession(undefined)
    setSubscribers([])
    setPublisher(undefined)
  }

  // webSocket과 openvidu session을 끊고 exit
  const exit = () => {
    // 1. 웹소켓 통신 끊기
    if (stomp) {
      sendExit()
      stomp.disconnect()
    }
    // 2. openvidu 세션 끊기
    if (session) {
      session.disconnect()
    }
    // 3. face-interval 비디오 초기화
    const video = document.getElementById('publisher-video')
    if (video) {
      video.srcObject = undefined
    }
    if (faceInterval.current) {
      clearInterval(faceInterval.current)
      faceInterval.current = null
    }
    // 4. 관련 변수 모두 초기화
    setConnected(false)
    OV.current = null
    setSession(undefined)
    setSubscribers([])
    setPublisher(undefined)
    dispatch(deleteRoom())
    setMainStreamManager(undefined)
    dispatch(setReduxMainStreamManager(undefined))
    navigate('/')
  }

  // 소켓 통신 열고, subscribe
  const connect = () => {
    const sock = new sockjs('https://sccs.kr/sccs')
    const stomp = stompjs.over(sock)
    setStomp(stomp)
    stomp.connect({}, () => {
      setConnected(true)
      stomp.subscribe('/sub/studyroom/' + studyroomId, (chatDto) => {
        const content = JSON.parse(chatDto.body)
        if (content.status === 'enter') {
          setRoomInfo((roomInfo) => {
            const newRoomInfo = { ...roomInfo }
            newRoomInfo.personnel = content.personnel
            return newRoomInfo
          })
          return
        }
        if (content.status === 'exit') {
          checkHostExit.current(content.id)
          setRoomInfo((roomInfo) => {
            const newRoomInfo = { ...roomInfo }
            newRoomInfo.personnel = content.personnel
            return newRoomInfo
          })
          if (!memberObject) return
          // 테스트가 시작되고 인원이 나갔을 때, members 업데이트
          setMemberObject((memberObject) => {
            const newMemberObject = { ...memberObject }
            delete newMemberObject[content.id]
            dispatch(setReduxMembers(newMemberObject))
            return newMemberObject
          })
          return
        }
        if (content.status === 'chat') {
          const { nickname, score, profileImage, message } = content
          setChatList((chatList) => [
            { nickname, score, profileImage, message },
            ...chatList,
          ])
          return
        }
        if (content.status === 'study') {
          setFinishedObject((finishedObject) => {
            const newFinishedObject = { ...finishedObject }
            newFinishedObject[content.nickname] = true
            dispatch(setReduxFinishedObject(newFinishedObject))
            return newFinishedObject
          })
          return
        }
      })
      stomp.send(
        '/pub/studyroom',
        {},
        JSON.stringify({
          status: 'enter',
          studyroomId: studyroomId,
          id: user.id,
          nickname: user.nickname,
        }),
      )
    })
  }

  // 웹 소켓 send: 방 연결이 끊겼을 때
  const sendDisconnect = () => {
    stomp.send(
      '/pub/studyroom',
      {},
      JSON.stringify({
        status: 'disconnect',
        studyroomId: studyroomId,
        id: user.id,
        nickname: user.nickname,
      }),
    )
  }

  // 웹 소켓 send: 방 나가기
  const sendExit = () => {
    stomp.send(
      '/pub/studyroom',
      {},
      JSON.stringify({
        status: 'exit',
        studyroomId: studyroomId,
        id: user.id,
        nickname: user.nickname,
      }),
    )
  }

  // 웹 소켓 send: 채팅 전송
  const sendChat = () => {
    if (!message.trim()) return
    stomp.send(
      '/pub/studyroom',
      {},
      JSON.stringify({
        status: 'chat',
        studyroomId: studyroomId,
        id: user.id,
        nickname: user.nickname,
        score: user.score,
        profileImage: user.profileImage,
        message: message,
      }),
    )
    setMessage('')
  }

  checkHostExit.current = (id) => {
    if (id === roomInfo.hostId) {
      alert('방장이 방을 나갔습니다ㅜㅜ')
      exit()
    }
  }

  // openvidu subscriber삭제하는 함수
  const deleteSubscriber = (streamManager) => {
    // 진짜 이유는 모르겠는데 newSubscribers = [...subscribers] 로 불러오면 안됨!!! 모두 처리해준 다음에 마지막 대입 전에 전개
    const newSubscribers = subscribers
    let index = newSubscribers.indexOf(streamManager, 0)
    if (index > -1) {
      newSubscribers.splice(index, 1)
      setSubscribers([...newSubscribers])
    }
  }

  // OpenVidu Session에 Join하는 함수
  const joinSession = () => {
    // --- 1) Get an OpenVidu object ---
    OV.current = new OpenVidu()

    // --- 2) Init a session ---
    setSession(OV.current.initSession())
  }

  // join한 session이 업데이트 됨에 따라 OpenVidu 비디오를 스트리밍을 시작하는 함수
  useEffect(() => {
    if (!session) return

    // --- 3) Specify the actions when events take place in the session ---

    // On every new Stream received...
    session.on('streamCreated', (event) => {
      // Subscribe to the Stream to receive it. Second parameter is undefined
      // so OpenVidu doesn't create an HTML video by its own
      // 진짜 이유는 모르겠는데 newSubscribers = [...subscribers] 로 불러오면 안됨!!! 모두 처리해준 다음에 마지막 대입 전에 전개
      const subscriber = session.subscribe(event.stream, undefined)
      const newSubscribers = subscribers
      newSubscribers.push(subscriber)

      // Update the state with the new subscribers
      setSubscribers([...newSubscribers])
    })

    // On every Stream destroyed...
    session.on('streamDestroyed', (event) => {
      // Remove the stream from 'subscribers' array
      deleteSubscriber(event.stream.streamManager)
    })

    // On every asynchronous exception...
    session.on('exception', (exception) => {
      console.warn(exception)
    })

    // --- 4) Connect to the session with a valid user token ---

    // Get a token from the OpenVidu deployment
    getToken().then((token) => {
      // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
      // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
      session
        .connect(token, { clientData: user.nickname })
        .then(async () => {
          // --- 5) Get your own camera stream ---

          // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
          // element: we will manage it on our own) and with the desired properties
          const publisher = await OV.current.initPublisherAsync(undefined, {
            audioSource: undefined, // The source of audio. If undefined default microphone
            videoSource: undefined, // The source of video. If undefined default webcam
            publishAudio: false, // Whether you want to start publishing with your audio unmuted or not
            publishVideo: true, // Whether you want to start publishing with your video enabled or not
            resolution: '640x480', // The resolution of your video
            frameRate: 30, // The frame rate of your video
            insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
            mirror: true, // Whether to mirror your local video or not
          })
          // --- 6) Publish your stream ---

          session.publish(publisher)

          // Obtain the current video device in use
          const devices = await OV.current.getDevices()
          const videoDevices = devices.filter(
            (device) => device.kind === 'videoinput',
          )
          const currentVideoDeviceId = publisher.stream
            .getMediaStream()
            .getVideoTracks()[0]
            .getSettings().deviceId
          const currentVideoDevice = videoDevices.find(
            (device) => device.deviceId === currentVideoDeviceId,
          )

          // Set the main video in the page to display our webcam and store our Publisher
          setCurrentVideoDevice(currentVideoDevice)
          // setMainStreamManager(publisher)
          setPublisher(publisher)
        })
        .catch((error) => {
          console.log(
            'There was an error connecting to the session:',
            error.code,
            error.message,
          )
        })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  // 카메라 상태를 토글하는 함수(화면 <-> 얼굴인식)
  const toggleCamera = async () => {
    // 1. 카메라가 꺼진 상태였을 경우, 원래 화면으로 새로 publish
    if (!isCameraOn) {
      const video = document.getElementById('publisher-video')
      video.srcObject = undefined
      // 1-1. 기존의 face-api setInterval를 삭제
      if (faceInterval.current) {
        clearInterval(faceInterval.current)
        faceInterval.current = null
      }
      // 1-2. default video device로 stream 생성ㅎ
      const devices = await OV.current.getDevices()
      const videoDevices = devices.filter(
        (device) => device.kind === 'videoinput',
      )
      const newPublisher = OV.current.initPublisher(undefined, {
        videoSource: videoDevices[0].deviceId,
        publishAudio: isMicOn,
        publishVideo: true,
        mirror: true,
      })
      await session.unpublish(publisher)
      await session.publish(newPublisher)

      setPublisher(newPublisher)
      setIsCameraOn(!isCameraOn)
      return
    }

    // 2. 카메라가 켜진 상태였을 경우, 얼굴인식 화면으로 changeTrack
    const MODEL_URL = process.env.PUBLIC_URL + '/models'
    const video = document.getElementById('publisher-video')

    // 2-1. 필요 모델 로드
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      // faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      // faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      // faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ]).then(startVideo)

    // 2-2. 얼굴 인식을 할 비디오 생성
    function startVideo() {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          video.srcObject = stream
        })
        .catch((err) => {
          console.log(err)
        })
    }

    video.addEventListener('play', () => {
      // 2-3. 얼굴인식 결과를 그릴 canvas 생성하고 track 변경
      const canvas = faceapi.createCanvasFromMedia(video)
      const track = canvas.captureStream(10).getVideoTracks()[0]
      publisher.replaceTrack(track)

      const displaySize = { width: video.width, height: video.height }
      faceapi.matchDimensions(canvas, displaySize)

      // 이미지 선언
      const img = new Image(canvas.width, canvas.height)

      // 얼굴인식 setInterval 이벤트 리스너 추가
      faceInterval.current = setInterval(async () => {
        const detections = await faceapi.detectSingleFace(
          video,
          new faceapi.TinyFaceDetectorOptions(),
        )
        // .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        // .withFaceLandmarks()
        // .withFaceExpressions()
        // const resizedDetections = faceapi.resizeResults(detections, displaySize)
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        if (detections) {
          img.src = presentImg
          ctx.drawImage(img, 0, 0)
        } else {
          img.src = absentImg
          ctx.drawImage(img, 0, 0)
        }
        // faceapi.draw.drawDetections(canvas, resizedDetections)
        // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
        // faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
      }, 100)

      setIsCameraOn(!isCameraOn)
    })
  }

  // 마이크 상태를 토글하는 함수
  const toggleMic = () => {
    publisher.publishAudio(!isMicOn) // true to unmute the audio track, false to mute it
    setIsMicOn(!isMicOn)
  }

  /**
   * --------------------------------------------
   * GETTING A TOKEN FROM YOUR APPLICATION SERVER
   * --------------------------------------------
   * The methods below request the creation of a Session and a Token to
   * your application server. This keeps your OpenVidu deployment secure.
   *
   * In this sample code, there is no user control at all. Anybody could
   * access your application server endpoints! In a real production
   * environment, your application server must identify the user to allow
   * access to the endpoints.
   *
   * Visit https://docs.openvidu.io/en/stable/application-server to learn
   * more about the integration of OpenVidu in your application server.
   */
  const getToken = async () => {
    const sessionId = await createSession(studyroomId) // 스터디룸의 pk값과 동일하게
    return await createToken(sessionId)
  }

  const createSession = async (sessionId) => {
    // console.log('Join Session', APPLICATION_SERVER_URL)
    const response = await axiosOriginal.post(
      APPLICATION_SERVER_URL + 'openvidu/sessions',
      { customSessionId: sessionId },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    )
    return response.data // The sessionId
  }

  const createToken = async (sessionId) => {
    const response = await axiosOriginal.post(
      APPLICATION_SERVER_URL +
        'openvidu/sessions/' +
        sessionId +
        '/connections',
      {},
      {
        headers: { 'Content-Type': 'application/json' },
      },
    )
    return response.data // The token
  }

  return (
    <Container>
      {connected ? (
        <>
          <Outlet
            context={{
              user,
              studyroomId,
              roomInfo,
              stomp,
              connected,
              memberObject,
              setMemberObject,
              memberList,
              problems,
              setProblems,
              message,
              setMessage,
              chatList,
              sendChat,
              OV,
              session,
              publisher,
              setPublisher,
              subscribers,
              isVideos,
              setIsVideos,
              isScreenShare,
              setIsScreenShare,
              isMicOn,
              setIsMicOn,
              mainStreamManager,
              setMainStreamManager,
              readyNicknameObject,
              setReadyNicknameObject,
              finishedObject,
              setFinishedObject,
              finishedList,
            }}
          />

          {isVideos &&
            location.pathname.slice(-4) !== 'test' &&
            !isScreenShare && (
              <VideoList
                publisher={publisher}
                subscribers={subscribers}
                readyList={readyNicknameList}
              />
            )}
        </>
      ) : (
        <Loading height="90vh" />
      )}
      <ToolBar
        toggleCamera={toggleCamera}
        toggleMic={toggleMic}
        isCameraOn={isCameraOn}
        isMicOn={isMicOn}
        exit={exit}
        theme={theme}
        toggleTheme={() => dispatch(toggleTheme())}
        isVideosOn={isVideos}
        toggleVideos={() => setIsVideos(!isVideos)}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  overflow: hidden;

  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.studyBaseBgColor};

  transition: all 0.3s ease-in-out;
`
