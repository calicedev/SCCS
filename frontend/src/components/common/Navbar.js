import React from 'react'
import Logo from 'components/common/Logo'
import { NavLink, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import IconButton from 'components/common/IconButton'
import { BsCloudSun, BsCloudMoon } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from 'redux/themeSlice'
import { deleteUserInfo } from 'redux/userSlice'
import checkLogin from 'libs/checkLogin'
import { setExpiration } from 'redux/expSlice'
import axios from 'libs/axios'
import api from 'constants/api'

/*
상단 네비게이션바 컴포넌트
*/

export default function Navbar() {
  const navigate = useNavigate()

  // 리덕스 -> theme정보
  const theme = useSelector((state) => state.theme)
  const isLogin = checkLogin()

  const dispatch = useDispatch()

  const logout = () => {
    navigate('/')
    dispatch(deleteUserInfo())
    dispatch(setExpiration(null))
    const [url, method] = api('logout')
    const config = { url, method }
    axios.request(config)
  }

  return (
    <Nav>
      <Flexbox>
        <Logo></Logo>
      </Flexbox>
      <NavContent>
        <ButtonWrapper>
          <IconButton
            icon={theme === 'light' ? <BsCloudSun /> : <BsCloudMoon />}
            type={theme === 'light' ? 'primary' : 'secondary'}
            size={'medium'}
            onClick={() => {
              dispatch(toggleTheme())
            }}
          />
        </ButtonWrapper>
        <NavStyle to="/">Home</NavStyle>
        {isLogin ? (
          <>
            <NavStyle to="/mypage/study">MyPage</NavStyle>
            <StyledDiv onClick={logout}>Logout</StyledDiv>
          </>
        ) : (
          <>
            <StyledDiv onClick={() => navigate('/auth/login')}>Login</StyledDiv>
            <StyledDiv2 onClick={() => navigate('/auth/signup')}>
              Signup
            </StyledDiv2>
          </>
        )}
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
  align-items: center;

  min-width: 400px;
`

const ButtonWrapper = styled.div`
  margin: 0rem 2rem 0rem 0rem;
`

const NavStyle = styled(NavLink)`
  margin: 1rem 0rem;
  padding: 0rem 2rem 0rem 0rem;

  font-size: 1.7rem;
  font-weight: 500;
  color: ${({ theme }) => theme.secondaryFontColor};

  &.active {
    color: ${({ theme }) => theme.primaryFontColor};
    font-weight: 600;
  }
`
const StyledDiv = styled.div`
  margin: 1rem 0rem;
  padding: 0rem 1rem 0rem 2rem;

  border-left: 2px solid ${({ theme }) => theme.secondaryFontColor};

  font-size: 1.7rem;
  font-weight: 500;
  color: ${({ theme }) => theme.secondaryFontColor};

  cursor: pointer;
`

const StyledDiv2 = styled.div`
  margin: 1rem 0rem;
  padding: 0rem 1rem 0rem 1rem;

  font-size: 1.7rem;
  font-weight: 500;
  color: ${({ theme }) => theme.secondaryFontColor};

  cursor: pointer;
`
