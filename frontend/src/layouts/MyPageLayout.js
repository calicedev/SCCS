import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const FlexBox = styled.div`
  display: flex;
`

const UpperPane = styled.div`
  margin-bottom: 2rem;
`

const LeftPane = styled.div`
  min-width: 300px;
`

const RightPane = styled.div`
  flex-grow: 1;
`

export default function MyPageLayout({ children }) {
  const [Up, Left, Right] = children

  return (
    <Container>
      <UpperPane>{Up}</UpperPane>
      <FlexBox>
        <LeftPane>{Left}</LeftPane>
        <RightPane>{Right}</RightPane>
      </FlexBox>
    </Container>
  )
}
