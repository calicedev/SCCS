import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  height: 100vh;
`

const Pane = styled.div`
  flex: 1;
`

export default function AuthPageLayout({ children }) {
  const [Left, Right] = children

  return (
    <Container>
      <Pane>{Left}</Pane>
      <Pane>{Right}</Pane>
    </Container>
  )
}
