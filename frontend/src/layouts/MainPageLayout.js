import React from 'react'
import styled from 'styled-components'
import mypageBgImg from 'assets/img/mypage_bg_img.png'

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  height: 100%;

  background-image: url(${mypageBgImg});
  background-size: cover;
`

const UpperPane = styled.div`
  margin-bottom: 2rem;
`

const MiddlePane = styled.div`
  padding: 0rem 2rem;
  margin-bottom: 2rem;
`
const LowerPane = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  height: 90%;

  margin: 0rem 3rem;
  padding: 2rem 3rem;

  border-radius: 1rem;
  box-shadow: 5px 5px 10px #00000050;

  background-color: ${({ theme }) => theme.bgColor};
`

export default function MainPageLayout({ children }) {
  const [Up, Middle, Down] = children

  return (
    <Container>
      <UpperPane>{Up}</UpperPane>
      <MiddlePane>{Middle}</MiddlePane>
      <LowerPane>{Down}</LowerPane>
    </Container>
  )
}
