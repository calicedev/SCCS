import React from 'react'
import styled from 'styled-components'
import { setExpiration } from 'redux/expSlice'
import { toggleTheme } from 'redux/themeSlice'
import { deleteUserInfo } from 'redux/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { BsCloudSun, BsCloudMoon } from 'react-icons/bs'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import api from 'constants/api'
import axios from 'libs/axios'
import checkLogin from 'libs/checkLogin'
import Logo from 'components/common/Logo'
import IconButton from 'components/common/IconButton'

/*
상단 네비게이션바 컴포넌트
*/

export default function Navbar() {
  // 리액트 훅 관련 함수 정의
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  console.log('navbar', location)

  const theme = useSelector((state) => state.theme) // 리덕스 -> theme정보
  const isLogin = checkLogin() // 로그인 여부 판단

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
