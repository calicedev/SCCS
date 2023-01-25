import React from 'react'
import LogoImg from 'assets/img/Logo.png'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'




export default function Logo() {
  const navigate = useNavigate()  

  return(
    
      <div onClick={() => {navigate('/auth/login')}}>
        <Img src={LogoImg} alt="로그인 이미지"/>
      </div>
    
  )
}

const Img = styled.img`
  width: 8rem;
  height: 4rem;
`