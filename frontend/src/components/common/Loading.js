import React from 'react'
import styled from 'styled-components'
import loadingGif from 'assets/loading.gif'

export default function Loading() {
  return <Container>Loading</Container>
}

const Container = styled.div`
  width: 100%;
  height: 100%;

  background-image: url(${loadingGif});
  background-position: center;
  background-size: contain;
`
