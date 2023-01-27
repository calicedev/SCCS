import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FaRegBookmark, FaRegUser } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { GrNotes } from 'react-icons/gr'

const SideNavbar = () => {
  const changeBg = () => {
    // 이부분 어떻게 구현할지 고민해보자!
    console.log('클릭된 카테고리의 배경색상을 바꿔라~~~')
  }
  return (
    <SideNav>
      <NavStyle to="/mypage/calendar">
        <FaRegBookmark />
        스터디 기록
      </NavStyle>
      <NavStyle to="/mypage/solved">
        <GrNotes />
        내가 푼 문제
      </NavStyle>
      <NavStyle to="/mypage/profile">
        <FaRegUser />
        회원 정보
      </NavStyle>
    </SideNav>
    // <Container>
    //   <StyledLink onClick={changeBg} to={'./study'}>
    //     <FaRegBookmark />
    //     <TextSpan>스터디 기록</TextSpan>
    //   </StyledLink>
    //   <br />
    //   <StyledLink onClick={changeBg} to={'./problem'}>
    //     <GrNotes />
    //     <TextSpan>내가 푼 문제</TextSpan>
    //   </StyledLink>
    //   <br />
    //   <StyledLink onClick={changeBg} to={'./profile'}>
    //     <FaRegUser />
    //     <TextSpan>회원 정보</TextSpan>
    //   </StyledLink>
    //   <br />
    // </Container>
  )
}

export default SideNavbar

const SideNav = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  margin: 1.5rem 0rem;
`

const NavStyle = styled(NavLink)`
  color: ${({ theme }) => theme.secondaryColor};
  padding: 1rem 0rem 1rem 3rem;
  font-size: 1.2rem;
  font-weight: 400;

  & > svg {
    margin-right: 1rem;
  }

  &.active {
    color: white;
    font-weight: 600;
    background-color:${({ theme }) => theme.primaryColor};
`
