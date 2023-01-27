import styled from 'styled-components'
import { FaRegBookmark, FaRegUser } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { GrNotes } from 'react-icons/gr'

const SideNavbar = () => {
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
