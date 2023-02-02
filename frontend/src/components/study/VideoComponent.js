import React, { useEffect, useRef } from 'react'
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
        <div>
          <Video autoPlay={true} ref={videoRef} />
          <div>
            <p>{getNicknameTag}</p>
          </div>
        </div>
      ) : null}
    </>
  )
}

const Video = styled.video`
  width: 300px;
  cursor: pointer;
`
