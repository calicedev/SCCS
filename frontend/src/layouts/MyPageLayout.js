import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex-column;
`
//
const FlexBox = styled.div`
  display: flex;
`
// 상단 NavBar 어떻게 구성하면 좋을지
// 왼쪽 NavBar:오른쪽 컨텐츠 1:3 비율정도로 맞춰보기
const UpperPane = styled.div`
  margin-bottom: 2rem;
`

const LeftPane = styled.div`
  min-width: 300px;
`

const RightPane = styled.div`
  padding: 0rem 3rem;
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
