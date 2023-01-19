import React from 'react'
import Logo from 'components/atoms/Logo'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'


export default function Navbar() {
  const navigate = useNavigate()
  


  return (
    <Nav>
      <Logo></Logo>
      <div>
        <Letter>
          <span onClick={() => {navigate('/auth/login')}}>
          Home
          </span>
        
          <span onClick={() => {navigate('/auth/signup')}}>
          Calender
          </span>
        
          <span onClick={() => {navigate('/auth/signup')}}>
          Solved
          </span>
        
          <span onClick={() => {navigate('/auth/signup')}}>
          Profile
          </span>

          <span onClick={() => {navigate('/auth/signup')}}>
          Logout
          </span>
        </Letter>
      </div>
    </Nav>

  )
}
const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1.5rem 0rem;
`

const Letter = styled.div`
  display: flex;
  align-items : center;
`
