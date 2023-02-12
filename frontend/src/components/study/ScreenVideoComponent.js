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
          <StyledP>{getNicknameTag}</StyledP>
        </Container>
      ) : null}
    </>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`
const Video = styled.video`
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
`
const StyledP = styled.p`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;

  border-radius: 0.5rem 0rem 0rem 0rem;

  padding: 0.2rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.grayFontColor};

  background-color: #ffffff50;
`
