import React, { useState } from 'react'
import styled from 'styled-components'
import ProfileInput from 'components/atoms/ProfileInput'
import Button from 'components/atoms/Button'
import ProfileImg from 'components/atoms/ProfileImg'
import { useNavigate } from 'react-router-dom'


export default function Profile() {

  const navigate = useNavigate()
  return(
    
    <ProfileContent>
      <Header>Profile</Header>  
      <EditBtn>
        <Button value='비밀번호' ></Button>
      </EditBtn>
      <Saad>
        <Adj>
          <ProfileImg></ProfileImg>
        </Adj>
      </Saad>
      <ProfileInput
          type="name"

      ></ProfileInput>

      <Container>
        <ProfileInput
            type="id"

        ></ProfileInput >
        <ProfileInput
          type="nickname"
          
        ></ProfileInput>
      </Container>

      <ProfileInput
        type="email"

      ></ProfileInput>
      <Button value="Edit" onClick={() => {
            navigate('/mypage/ProfileEdit')
          }}></Button>
    </ProfileContent>

  )
  
}

const Header = styled.h1`
  font-size: 5rem;
`

const ProfileContent = styled.div`
  display: flex;
  position: absolute;
  border-radius: 10px;
  flex-direction: column;
  min-height: 100%;
  width: 70%;
`
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 55%;
`

const Saad = styled.div`
  display: flex;
  positipn: absolute;
  justify-content: right;
`

const Adj = styled.div`
  
  
`


const EditBtn = styled.div`
  display: flex;
  max-width: 10rem;
  visibility: hidden;
`
