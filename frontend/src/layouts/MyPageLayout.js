import React from 'react'
import styled from 'styled-components'
import mypageBgImg from 'assets/img/mypage_bg_img.png'

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

const Container = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;

  height: 100%;
  min-height: 100vh;

  background-image: url(${mypageBgImg});
  background-size: cover;
`

const FlexBox = styled.div`
  display: flex;
  height: 100%;
`

const UpperPane = styled.div`
  margin-bottom: 2rem;
  z-index: 1;
`

const LeftPane = styled.div`
  width: 25%;
  min-width: 250px;
  max-width: 300px;
  z-index: 1;
`

const LeftPaneBg = styled.div`
  position: absolute;

  width: 25%;
  height: 100%;
  min-width: 250px;
  max-width: 300px;

  background-color: ${({ theme }) => theme.bluishBgColor};
`

const RightPane = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;

  min-height: 80vh;

  margin: 0rem 3rem 3rem 3rem;

  border-radius: 1rem;
  box-shadow: 5px 5px 10px #00000050;

  background-color: ${({ theme }) => theme.bgColor};
`
