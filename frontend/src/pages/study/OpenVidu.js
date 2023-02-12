import { OpenVidu, VideoInsertMode } from 'openvidu-browser'
import axiosOriginal from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import VideoComponent from '../../components/study/VideoComponent'
import styled from 'styled-components'
import Button from 'components/common/Button'
import * as faceapi from 'face-api.js'
import presentImg from 'assets/img/webRTC_present_image.png'
import absentImg from 'assets/img/webRTC_absent_image.png'
import Toolbar from 'components/study/ToolBar'

// const APPLICATION_SERVER_URL = 'https://i8a301.p.ssafy.io/'
const APPLICATION_SERVER_URL = 'http://localhost:5000/'

export default function WaitingPage() {
  const [mySessionId, setMySessionId] = useState('Room1')
  // nickname으로 변경
  const [myUserName, setMyUserName] = useState(
    'user' + Math.floor(Math.random() * 100),
  )
  const [session, setSession] = useState(undefined)
  const [mainStreamManager, setMainStreamManager] = useState(undefined)
  const [publisher, setPublisher] = useState(undefined)
  const [subscribers, setSubscribers] = useState([])
  const [currentVideoDevice, setCurrentVideoDevice] = useState(undefined)
  const OV = useRef(null)

  const [isVideo, setIsVideo] = useState(true)
  const [isMicOn, setIsMicOn] = useState(true)
  const [isScreen, setIsScreen] = useState(false)
  const [isCameraOn, setIsCameraOn] = useState(true)

  // componentDidMount
  useEffect(() => {
    window.addEventListener('beforeunload', onbeforeunload)
    // componentWillUnmount
    return () => window.removeEventListener('beforeunload', onbeforeunload)
  }, [])

  const onbeforeunload = () => {
    leaveSession()
  }

  const handleChangeSessionId = (e) => {
    setMySessionId(e.target.value)
  }

  const handleChangeUserName = (e) => {
    setMyUserName(e.target.value)
  }

  const handleMainVideoStream = (stream) => {
    if (mainStreamManager === stream) return
    setMainStreamManager(stream)
  }

  const deleteSubscriber = (streamManager) => {
    // 진짜 이유는 모르겠는데 newSubscribers = [...subscribers] 로 불러오면 안됨!!! 모두 처리해준 다음에 마지막 대입 전에 전개
    const newSubscribers = subscribers
    let index = newSubscribers.indexOf(streamManager, 0)
    if (index > -1) {
      newSubscribers.splice(index, 1)
      setSubscribers([...newSubscribers])
    }
  }

  const joinSession = () => {
    // --- 1) Get an OpenVidu object ---

    OV.current = new OpenVidu()

    // --- 2) Init a session ---

    setSession(OV.current.initSession())
  }

  // joinSession 이 후, Session의 변화를 감지하여 실행
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
      console.log('token', token)
      // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
      // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
      session
        .connect(token, { clientData: myUserName })
        .then(async () => {
          // --- 5) Get your own camera stream ---

          // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
          // element: we will manage it on our own) and with the desired properties
          const publisher = await OV.current.initPublisherAsync(undefined, {
            audioSource: undefined, // The source of audio. If undefined default microphone
            videoSource: undefined, // The source of video. If undefined default webcam
            publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
            publishVideo: true, // Whether you want to start publishing with your video enabled or not
            resolution: '640x480', // The resolution of your video
            frameRate: 30, // The frame rate of your video
            insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
            mirror: false, // Whether to mirror your local video or not
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
          setMainStreamManager(publisher)
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
  }, [session])

  const leaveSession = () => {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
    if (session) {
      session.disconnect()
    }

    // Empty all properties...
    OV.current = null
    setSession(undefined)
    setSubscribers([])
    setMySessionId('')
    setMyUserName('')
    setMainStreamManager(undefined)
    setPublisher(undefined)
  }

  const switchCamera = async () => {
    try {
      const devices = await OV.current.getDevices()
      // videoDevice 배열 추출
      const videoDevices = devices.filter(
        (device) => device.kind === 'videoinput',
      )

      if (videoDevices && videoDevices.length > 1) {
        // 현재 사용 중인 Device를 제외한 newVideoDevice 추출
        const newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== currentVideoDevice.deviceId,
        )

        // 다른 videoDevice로 바꿀 수 있다면, 사용가능한 첫번째 디바이스로 자동 바꿈
        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          const newPublisher = OV.current.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          })

          //newPublisher.once("accessAllowed", () => {
          await session.unpublish(mainStreamManager)

          await session.publish(newPublisher)
          setCurrentVideoDevice(newVideoDevice[0])
          setMainStreamManager(newPublisher)
          setPublisher(newPublisher)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  const toggleVideo = () => {
    isVideo.current = !isVideo.current
    // const newPublisher = publisher
    publisher.publishVideo(isVideo.current) // true to enable the video track, false to disable it
    // setPublisher({ ...newPublisher })
  }

  const toggleMic = () => {
    publisher.publishAudio(!isMicOn) // true to unmute the audio track, false to mute it
    setIsMicOn(!isMicOn)
  }

  const screenShare = async () => {
    isScreen.current = !isScreen.current
    if (!isScreen.current) {
      const devices = await OV.current.getDevices()
      // videoDevice 배열 추출
      const videoDevices = devices.filter(
        (device) => device.kind === 'videoinput',
      )
      const newPublisher = OV.current.initPublisher(undefined, {
        videoSource: videoDevices[0].deviceId,
        publishAudio: true,
        publishVideo: true,
        mirror: false,
      })

      await session.unpublish(mainStreamManager)
      await session.publish(newPublisher)

      setMainStreamManager(newPublisher)
      setPublisher(newPublisher)
      return
    }
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'green'
    ctx.fillRect(10, 10, 100, 100)
    const track = canvas.captureStream(10).getVideoTracks()[0]
    publisher.replaceTrack(track)
  }

  const toggleCamera = async () => {
    console.log(isCameraOn)
    if (!isCameraOn) {
      const video = document.getElementById('publisher-video')
      video.srcObject = undefined
      const devices = await OV.current.getDevices()
      // videoDevice 배열 추출
      const videoDevices = devices.filter(
        (device) => device.kind === 'videoinput',
      )
      const newPublisher = OV.current.initPublisher(undefined, {
        videoSource: videoDevices[0].deviceId,
        publishAudio: true,
        publishVideo: true,
        mirror: false,
      })

      await session.unpublish(mainStreamManager)
      await session.publish(newPublisher)

      setMainStreamManager(newPublisher)
      setPublisher(newPublisher)
      setIsCameraOn(!isCameraOn)
      return
    }

    const MODEL_URL = process.env.PUBLIC_URL + '/models'
    const video = document.getElementById('publisher-video')

    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      // faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      // faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      // faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ]).then(startVideo)

    function startVideo() {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          console.log('start video')
          video.srcObject = stream
        })
        .catch((err) => {
          console.log('error')
          console.log(err)
        })
    }

    video.addEventListener('play', () => {
      console.log('play')
      const canvas = faceapi.createCanvasFromMedia(video)
      const track = canvas.captureStream(10).getVideoTracks()[0]
      publisher.replaceTrack(track)

      const displaySize = { width: video.width, height: video.height }
      faceapi.matchDimensions(canvas, displaySize)

      // 이미지 선언
      const img = document.createElement('img')
      img.style.objectFit = 'contain'
      img.width = 30
      img.height = 20

      setInterval(async () => {
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
    const sessionId = await createSession(mySessionId)
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

  // <Div id="div">
  //   <video id="video" width="720" height="560" autoPlay muted></video>
  // </Div>
  return (
    <Container>
      <canvas></canvas>
      {session === undefined ? (
        <div id="join">
          <div>
            <label>Participant: </label>
            <input
              className="form-control"
              type="text"
              id="userName"
              value={myUserName}
              onChange={handleChangeUserName}
              required
            />
          </div>
          <div>
            <label> Session: </label>
            <input
              className="form-control"
              type="text"
              id="sessionId"
              value={mySessionId}
              onChange={handleChangeSessionId}
              required
            />
          </div>
          <Button onClick={joinSession} value="Join Session" />
        </div>
      ) : null}

      {session !== undefined ? (
        <div id="session">
          <div id="session-header">
            <h1 id="session-title">{mySessionId}</h1>
            <Button
              className="btn btn-large btn-danger"
              id="buttonLeaveSession"
              onClick={leaveSession}
              value="Leave session"
            />
            <Button
              className="btn btn-large btn-success"
              id="buttonSwitchCamera"
              onClick={toggleVideo}
              value="toggle Camera"
            />
            <Button
              className="btn btn-large btn-success"
              id="buttonSwitchCamera"
              onClick={toggleMic}
              value="toggle audio"
            />
            <Button
              className="btn btn-large btn-success"
              id="buttonSwitchCamera"
              onClick={screenShare}
              value="screen share"
            />
            <Button
              className="btn btn-large btn-success"
              id="buttonSwitchCamera"
              onClick={toggleCamera}
              value="face ai"
            />
          </div>

          {/* {mainStreamManager !== undefined ? (
            <div id="main-video" className="col-md-6">
              <VideoComponent streamManager={mainStreamManager} />
            </div>
          ) : null} */}
          <VideoContainer>
            {publisher && (
              <div
                className="stream-container"
                onClick={() => handleMainVideoStream(publisher)}
              >
                <VideoComponent streamManager={publisher} />
              </div>
            )}
            {subscribers.map((sub, i) => (
              <div
                key={`${sub.id}-${i}`}
                className="stream-container"
                onClick={() => handleMainVideoStream(sub)}
              >
                <VideoComponent streamManager={sub} />
              </div>
            ))}
          </VideoContainer>
          <Toolbar
            toggleCamera={toggleCamera}
            toggleMic={toggleMic}
            isCameraOn={isCameraOn}
            isMicOn={isMicOn}
            leaveSession={leaveSession}
          />
        </div>
      ) : null}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  jusitfy-content: center;
  align-items: center;
`

const VideoContainer = styled.div`
  display: flex;
  justify-content: center;
`
