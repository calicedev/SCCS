import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import gobackLogo from 'assets/img/goback_logo.png'
import { useNavigate } from 'react-router-dom'

const Goback = () => {
  const navigate = useNavigate()
  return (
    <Container>
      <ClickContainer
        onClick={() => {
          navigate('/auth/login')
        }}
      >
        <GobackLogo src={gobackLogo}></GobackLogo>
        <span>로그인 하러가기</span>
      </ClickContainer>
    </Container>
  )
}

const GobackLogo = styled.img`
  width: 4rem;
  height: 4rem;
`

const ClickContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
`
const Container = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
`

export default Goback
