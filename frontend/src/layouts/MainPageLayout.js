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
  width: 300px;
`
const LowerPane = styled.div`
  display: flex;
  justify-content: center;

  height: 90%;

  margin: 0rem 3rem;

  border-radius: 1rem;
  box-shadow: 5px 5px 10px #00000050;

  background-color: ${({ theme }) => theme.bgColor};
`

export default function MyPageLayout({ children }) {
  const [Up, Down] = children

  return (
    <Container>
      <UpperPane>{Up}</UpperPane>
      <MiddlePane></MiddlePane>
      <LowerPane>{Down}</LowerPane>
    </Container>
  )
}
