import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FaRegBookmark, FaRegUser } from 'react-icons/fa'
import { GrNotes } from 'react-icons/gr'

const SideNavbar = () => {
  const changeBg = () => {
    // 이부분 어떻게 구현할지 고민해보자!
    console.log('클릭된 카테고리의 배경색상을 바꿔라~~~')
  }

  return (
    <Container>
      <StyledLink onClick={changeBg} to={'./studyhistory'}>
        <FaRegBookmark />
        <TextSpan>스터디 기록</TextSpan>
      </StyledLink>
      <br />
      <StyledLink onClick={changeBg} to={'./problemhistory'}>
        <GrNotes />
        <TextSpan>내가 푼 문제</TextSpan>
      </StyledLink>
      <br />
      <StyledLink onClick={changeBg} to={'./userinfo'}>
        <FaRegUser />
        <TextSpan>회원 정보</TextSpan>
      </StyledLink>
      <br />
    </Container>
  )
}

export default SideNavbar

const Container = styled.div`
  margin-top: 5rem;
  margin-left: 3rem;
`

const StyledLink = styled(Link)`
  font-size: 2rem;
  display: flex;
  align-items: center;
`

const TextSpan = styled.span`
  margin-left: 1rem;
`
