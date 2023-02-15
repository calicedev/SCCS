import React from 'react'
import styled from 'styled-components'

export default function StudyPageLayout({ children, isVideos }) {
  const [Header, Body] = children

  return (
    <Container>
      <UpperPane>{Header}</UpperPane>
      <LowerPane>{Body}</LowerPane>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  height: 100%;

  padding: 1rem;
`

const UpperPane = styled.div`
  display: flex;
  justify-content: space-between;
`

const LowerPane = styled.div`
  display: flex;
  gap: 5px;
  height: 100%;
`
