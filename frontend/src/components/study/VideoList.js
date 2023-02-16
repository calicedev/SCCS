import React from 'react'
import styled from 'styled-components'
import VideoItem from 'components/study/VideoItem'

export default function VideoList({ publisher, subscribers, readyList }) {
  return (
    <Container>
      {publisher && (
        <div className="stream-container">
          <VideoItem streamManager={publisher} readyList={readyList} />
        </div>
      )}
      {subscribers.map((sub, i) => (
        <div key={`${sub.id}-${i}`} className="stream-container">
          <VideoItem streamManager={sub} readyList={readyList} />
        </div>
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 5px;
`
