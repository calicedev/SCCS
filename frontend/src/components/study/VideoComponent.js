import React, { useEffect, useRef } from 'react'
import { Publisher } from 'openvidu-browser'

// import OpenViduVideoComponent from './OvVideo'
import styled from 'styled-components'

export default function VideoComponent({ streamManager }) {
  // Gets the nickName of the user
  const getNicknameTag = JSON.parse(
    streamManager.stream.connection.data,
  ).clientData

  const videoRef = useRef()

  // componentDidUpdate
  useEffect(() => {
    if (streamManager && !!videoRef) {
      streamManager.addVideoElement(videoRef.current)
    }
  })

  // componentDidMount
  useEffect(() => {
    if (streamManager && !!videoRef) {
      streamManager.addVideoElement(videoRef.current)
    }
  }, [])

  return (
    <>
      {streamManager !== undefined ? (
        <Container>
          <Video autoPlay={true} ref={videoRef} />
          <div>
            <p>{getNicknameTag}</p>
          </div>
          {streamManager instanceof Publisher && (
            <PublisherVideo
              id={'publisher-video'}
              autoPlay
              muted
              width="300px"
              height="200px"
            ></PublisherVideo>
          )}
        </Container>
      ) : null}
    </>
  )
}

const Container = styled.div`
  position: relative;
`
const PublisherVideo = styled.video`
  position: absolute;

  top: 0;
  left: 0;
  z-index: -1;
`

const Video = styled.video`
  width: 300px;
  height: 200px;
  cursor: pointer;
`
