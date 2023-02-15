import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

export default function VideoComponent({ streamManager }) {
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
        </Container>
      ) : null}
    </>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;

  overflow: auto;

  position: relative;

  width: 100%;
  height: 100%;

  border-radius: 0.5rem;
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

  padding: 0.2rem;

  border-radius: 0.5rem 0rem 0rem 0rem;
  background-color: #ffffff80;

  font-size: 0.8rem;
  color: ${({ theme }) => theme.grayFontColor};
`
