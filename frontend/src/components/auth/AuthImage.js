import React from 'react'
import styled from 'styled-components'
import authImage from 'assets/img/auth_image.png'

/*
인증 화면에 표시할 이미지 컴포넌트
*/

export default function AuthImage() {
  return <Container></Container>
}

const Container = styled.div`
  width: 100%;
  height: 100%;

  background-image: url(${authImage});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`
