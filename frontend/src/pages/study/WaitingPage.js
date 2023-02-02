import { OpenVidu } from 'openvidu-browser'
import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import VideoComponent from '../../components/study/VideoComponent'
import styled from 'styled-components'
import Button from 'components/common/Button'
import ProfileInput from 'components/mypage/ProfileInput'

const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000/'

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
    let newSubscribers = [...subscribers]
    let index = subscribers.indexOf(streamManager, 0)
    if (index > -1) {
      newSubscribers.splice(index, 1)
      setSubscribers(newSubscribers)
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

    let mySession = session

    // --- 3) Specify the actions when events take place in the session ---

    // On every new Stream received...
    mySession.on('streamCreated', (event) => {
      // Subscribe to the Stream to receive it. Second parameter is undefined
      // so OpenVidu doesn't create an HTML video by its own
      const subscriber = mySession.subscribe(event.stream, undefined)
      let newSubscribers = [...subscribers]
      newSubscribers.push(subscriber)

      // Update the state with the new subscribers
      setSubscribers(newSubscribers)
    })

    // On every Stream destroyed...
    mySession.on('streamDestroyed', (event) => {
      // Remove the stream from 'subscribers' array
      deleteSubscriber(event.stream.streamManager)
    })

    // On every asynchronous exception...
    mySession.on('exception', (exception) => {
      console.warn(exception)
    })

    // --- 4) Connect to the session with a valid user token ---

    // Get a token from the OpenVidu deployment
    getToken().then((token) => {
      // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
      // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
      mySession
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

          mySession.publish(publisher)

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
    const mySession = session

    if (mySession) {
      mySession.disconnect()
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
    const response = await axios.post(
      APPLICATION_SERVER_URL + 'api/sessions',
      { customSessionId: sessionId },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    )
    return response.data // The sessionId
  }

  const createToken = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections',
      {},
      {
        headers: { 'Content-Type': 'application/json' },
      },
    )
    return response.data // The token
  }

  return (
    <Container>
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
              onClick={switchCamera}
              value="Switch Camera"
            />
          </div>

          {/* {mainStreamManager !== undefined ? (
            <div id="main-video" className="col-md-6">
              <VideoComponent streamManager={mainStreamManager} />
            </div>
          ) : null} */}
          <VideoContainer>
            {publisher !== undefined ? (
              <div
                className="stream-container"
                onClick={() => handleMainVideoStream(publisher)}
              >
                <VideoComponent streamManager={publisher} />
              </div>
            ) : null}
            {subscribers.map((sub, i) => (
              <div
                key={sub.id + i}
                className="stream-container"
                onClick={() => handleMainVideoStream(sub)}
              >
                <VideoComponent streamManager={sub} />
              </div>
            ))}
          </VideoContainer>
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
