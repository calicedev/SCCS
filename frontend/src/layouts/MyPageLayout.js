import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  height: 100vh;
`
// 상단 NavBar 어떻게 구성하면 좋을지
// 왼쪽 NavBar:오른쪽 컨텐츠 1:3 비율정도로 맞춰보기
const Pane = styled.div`
  flex: 1;
`

export default function MyPageLayout({ children }) {
  const [Left, Right] = children

  return (
    <Container>
      <Pane>{Left}</Pane>
      <Pane>{Right}</Pane>
    </Container>
  )
}
