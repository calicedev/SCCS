import React, { useState } from 'react'
import styled from 'styled-components'
import ProfileInput from 'components/atoms/ProfileInput'
import Button from 'components/atoms/Button'
import ProfileImg from 'components/atoms/ProfileImg'
import { useNavigate } from 'react-router-dom'
import { useAuthInput } from 'hooks/useAuthInput'

export default function ProfileEdit() {

  const [nickname, setNickname] = useAuthInput('nickname', '')
  const [email, setEmail] = useAuthInput('email', '')


  const navigate = useNavigate()
  return(
    
    <ProfileContent>
      <Header>Edit Profile</Header>
      <EditBtn>
        <Button value='기본정보' ></Button>
        <Button value='비밀번호' onClick={() => {
            navigate('/mypage/PasswordEdit')
          }}></Button>
      </EditBtn>
      <Saad>
        <ProfileImg></ProfileImg>
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
          value={nickname}
          disabled = {false}
          onChange={(e) => setNickname(e.target.value)}
        ></ProfileInput>
      </Container>

      <ProfileInput
        type="email"
        value={email}
        disabled = {false}
        onChange={(e) => setEmail(e.target.value)}
      ></ProfileInput>
      <Button value="Edit" onClick={() => {
            navigate('/mypage/Profile')
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
  positipn: fixed;
  justify-content: right;
`

const EditBtn = styled.div`
  display: flex;
  max-width: 10rem;
`
