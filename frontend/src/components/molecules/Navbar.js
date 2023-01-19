import React from 'react'
import Logo from 'components/atoms/Logo'
import {  NavLink  } from 'react-router-dom'
import styled from 'styled-components'


export default function Navbar() {
  
  let activeStyle = {
    textDecoration: "underline",
  };

  let activeClassName = "underline";


  return (
    <Nav>
      <Logo></Logo>
      <NavContent>
        <NavStyle
            to="home"
          >
            Home
          </NavStyle>
          <NavStyle
            to="calender"

          >
            Calender
          </NavStyle>
          <NavStyle
            to="solved"

          >
            Solved
          </NavStyle>
          <NavStyle
            to="profile"

          >
            Profile
          </NavStyle>
          <NavStyle
            to="logout"

          >
            Logout
          </NavStyle>
      </NavContent>
    </Nav>

  )
}
const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1.5rem 0rem;
  align-items: center;
  padding:  0 2rem;
`

const Letter = styled.div`
  display: flex;
  align-items : center;
`

const NavContent= styled.div`
  display: flex;
  justify-content: space-between;
  width: 40%;
  min-width: 400px;
`

const NavStyle = styled(NavLink)` 
  color: blue;
  padding: 20px;
  font-size: 20px;
  font-weight: 400;
  margin: 5px;
  outline: invert;
  
  &:hover {
    color: aquamarine;
  }
`