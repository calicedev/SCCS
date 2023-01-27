import React from 'react'
import Logo from 'components/common/Logo'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export default function Navbar() {
  return (
    <Nav>
      <Logo></Logo>
      <NavContent>
        <NavStyle to="/main">Home</NavStyle>
        <NavStyle to="/mypage/calendar">Calender</NavStyle>
        <NavStyle to="/mypage/solved">Solved</NavStyle>
        <NavStyle to="/mypage/profile">Profile</NavStyle>
        <NavStyle to="/auth/login">Logout</NavStyle>
      </NavContent>
    </Nav>
  )
}
const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 1.5rem 0rem;
  padding: 0rem 2rem;
`

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 400px;
`

const NavStyle = styled(NavLink)`
  color: ${({ theme }) => theme.secondaryColor};
  padding: 1rem;
  font-size: 1.5rem;
  font-weight: 400;

  &.active {
    color: ${({ theme }) => theme.primaryColor};
    font-weight: 600;
  }
`
