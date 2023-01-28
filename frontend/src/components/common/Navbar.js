import React from 'react'
import Logo from 'components/common/Logo'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import IconButton from 'components/common/IconButton'
import { BsCloudSun, BsCloudMoon } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from 'redux/themeSlice'

/*
상단 네비게이션바 컴포넌트
*/

export default function Navbar() {
  // 리덕스 -> theme정보
  const theme = useSelector((state) => state.theme)
  const dispatch = useDispatch()

  return (
    <Nav>
      <Flexbox>
        <Logo></Logo>
        <IconButton
          icon={theme === 'light' ? <BsCloudSun /> : <BsCloudMoon />}
          type={theme === 'light' ? 'primary' : 'secondary'}
          size={'middle'}
          onClick={() => {
            dispatch(toggleTheme())
          }}
        />
      </Flexbox>
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
const Flexbox = styled.div`
  display: flex;
  align-items: center;
`

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;

  min-width: 400px;
`

const NavStyle = styled(NavLink)`
  padding: 1rem;

  font-size: 1.5rem;
  font-weight: 400;
  color: ${({ theme }) => theme.secondaryColor};

  &.active {
    color: ${({ theme }) => theme.primaryColor};
    font-weight: 600;
  }
`
