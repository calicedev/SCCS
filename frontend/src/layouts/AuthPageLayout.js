import React from 'react'
import styled from 'styled-components'
import Logo from 'components/common/Logo'

const Container = styled.div`
  display: flex;
  justify-content: center;

  position: relative;

  height: 100vh;
`

const Pane = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  padding: 2rem 2rem;
`

const LogoPane = styled.div`
  position: absolute;
  top: 3em;
  left: 2rem;
`

export default function AuthPageLayout({ children }) {
  const [Left, Right] = children

  return (
    <Container>
      <Pane>{Left}</Pane>
      <Pane>{Right}</Pane>
      <LogoPane>
        <Logo />
      </LogoPane>
    </Container>
  )
}
