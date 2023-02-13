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
          {streamManager instanceof Publisher && (
            <PublisherVideo
              id={'publisher-video'}
              autoPlay
              muted
              width="280px"
              height="160px"
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
const Video = styled.video`
  width: 280px;
  height: 160px;
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
// 얼굴인식 이미지를 띄울 시, 이미지 뒤에서 재생되는 비디오 태그
const PublisherVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 280px;
  height: 160px;
`
