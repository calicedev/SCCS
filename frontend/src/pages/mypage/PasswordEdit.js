import React, { useState } from 'react'
import styled from 'styled-components'
import ProfileInput from 'components/atoms/ProfileInput'
import Button from 'components/atoms/Button'
import ProfileImg from 'components/atoms/ProfileImg'
import { useNavigate } from 'react-router-dom'
import { useAuthInput } from 'hooks/useAuthInput'

export default function PasswordEdit() {
  const [password,setPassword] = useAuthInput('password', '')
  const [newpassword,setNewPassword] = useAuthInput('newpassword', '')
  const [confirmpassword,setConfirmPassword] = useAuthInput('confirmpassword', '')

  const navigate = useNavigate()
  return(
    
    <ProfileContent>
      <Header>Edit Profile</Header>
      <EditBtn>
        <Button value='기본정보' onClick={() => {
            navigate('/mypage/ProfileEdit')
          }}></Button>
        <Button value='비밀번호' ></Button>
      </EditBtn>
      <Saad>
        <ProfileImg></ProfileImg>
      </Saad>
      <ProfileInput
          type="password"
          value={password}
          disabled = {false}
          onChange={(e) => setPassword(e.target.value)}
      ></ProfileInput>
      <ProfileInput
          type="newpassword"
          value={newpassword}
          disabled = {false}
          onChange={(e) => setNewPassword(e.target.value)}
      ></ProfileInput>
      <ProfileInput
          type="confirmpassword"
          value={confirmpassword}
          disabled = {false}
          onChange={(e) => setConfirmPassword(e.target.value)}
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

const Saad = styled.div`
  display: flex;
  positipn: absolute;
  justify-content: right;
`

const EditBtn = styled.div`
  display: flex;
  max-width: 10rem;
`
