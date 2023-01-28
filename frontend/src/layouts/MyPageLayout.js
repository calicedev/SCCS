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

const FlexBox = styled.div`
  display: flex;
  height: 100%;
`

const UpperPane = styled.div`
  z-index: 1;
  margin-bottom: 2rem;
`

const LeftPane = styled.div`
  z-index: 1;
  width: 300px;
`

const LeftPaneBg = styled.div`
  position: absolute;

  width: 300px;
  height: 100%;

  background-color: ${({ theme }) => theme.secondaryColor};
  opacity: 0.2;
`

const RightPane = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;

  height: 90%;

  margin: 0rem 3rem;

  border-radius: 1rem;
  box-shadow: 5px 5px 10px #00000050;

  background-color: ${({ theme }) => theme.bgColor};
`

export default function MyPageLayout({ children }) {
  const [Up, Left, Right] = children

  return (
    <Container>
      <UpperPane>{Up}</UpperPane>
      <FlexBox>
        <LeftPane>{Left}</LeftPane>
        <RightPane>{Right}</RightPane>
      </FlexBox>
      <LeftPaneBg />
    </Container>
  )
}
