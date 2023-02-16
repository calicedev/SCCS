import { React, useEffect } from 'react'
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
import getScoreIcon from 'libs/getScoreIcon'
import Logo from 'components/common/Logo'
import IconButton from 'components/common/IconButton'
// import getUserInfo from 'libs/getUserInfo'

/*
상단 네비게이션바 컴포넌트
*/

export default function Navbar() {
  // 리액트 훅 관련 함수 정의
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const pathname = useLocation().pathname

  const theme = useSelector((state) => state.theme) // 리덕스 -> theme정보

  // 로컬에서 구동 시, 중복 요청으로 undefined 자동 할당
  // useEffect(() => {
  //   getUserInfo()
  // }, [])

  const user = useSelector((state) => state.user)

  const isLogin = checkLogin() // 로그인 여부 판단

  const logout = () => {
    navigate('/')
    dispatch(deleteUserInfo())
    dispatch(setExpiration(null))
    const [url, method] = api('logout')
    const config = { url, method }
    axios(config)
      .then((res) => {})
      .catch((err) => {
        alert('로그아웃 실패')
      })
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
        <NavStyle to="/about">About</NavStyle>
        {isLogin && user ? (
          <>
            <NavStyle2
              to="/mypage/study"
              className={`${
                pathname.substring(0, 7) === '/mypage' ? 'active' : null
              }`}
            >
              <IconWrapper>{getScoreIcon(user.score)[0]}</IconWrapper>
              {user.id}
            </NavStyle2>
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

  width: 100%;

  margin: 1.5rem 0rem;
  padding: 0rem 2rem;

  font-family: 'bigjohn';
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
const NavStyle2 = styled(NavLink)`
  display: flex;
  align-items: center;

  margin: 1rem 1.5rem 1rem 0rem;
  padding: 0rem 0.5rem 0rem 0rem;

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
const IconWrapper = styled.div`
  font-size: 25px;
  margin-top: 5px;
  padding: 0px;
`
