import React from 'react'
import authImage from 'assets/img/auth_image.png'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${authImage});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`

export default function AuthImage() {
  return <Container></Container>
}
