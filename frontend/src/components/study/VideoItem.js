import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Publisher } from 'openvidu-browser'

export default function VideoItem({ streamManager }) {
  // streamManager로부터 닉네임을 가져오는 함수
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              width="240px"
              height="160px"
            ></PublisherVideo>
          )}
        </Container>
      ) : null}
    </>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;

  overflow: hidden;

  position: relative;

  width: 240px;
  height: 160px;

  border-radius: 0.5rem;
`
const Video = styled.video`
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
`
const StyledP = styled.p`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;

  padding: 0.2rem;

  background-color: #ffffff50;

  font-size: 0.8rem;
  color: ${({ theme }) => theme.grayFontColor};
`
// 얼굴인식 이미지를 띄울 시, 이미지 뒤에서 재생되는 비디오 태그
const PublisherVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100% !important;
  height: auto !important;
`
