import React from 'react'
import styled from 'styled-components'
import NotFoundGif from 'assets/gif/404_not_found.gif'
import Button from 'components/common/Button'
import { useNavigate } from 'react-router-dom'

// 404 Not Found Component
export default function NotFound() {
  const navigate = useNavigate()
  return (
    <Container>
      <ButtonWrapper>
        <Button
          type="secondary"
          value="홈으로"
          onClick={() => navigate('/')}
        ></Button>
      </ButtonWrapper>
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  background: no-repeat url(${NotFoundGif});
  background-position: center;
  background-size: contain;
`

const ButtonWrapper = styled.div`
  position: absolute;
  top: 75%;
  left: 50%;
  transform: translate(-50%, 0);
`
