import React, { useState } from 'react'
import styled from 'styled-components'
import ProfileInput from 'components/atoms/ProfileInput'
import Button from 'components/atoms/Button'
import ProfileImg from 'components/atoms/ProfileImg'
import { useNavigate } from 'react-router-dom'
import Typo from 'styles/Typo'

export default function Profile() {
  const navigate = useNavigate()
  return (
    <ProfileContent>
      <Typo className="h1">Profile</Typo>
      <Saad>
        <ProfileImg></ProfileImg>
      </Saad>

      <ProfileInput type="name"></ProfileInput>
      <Flexbox>
        <ProfileInput type="id"></ProfileInput>
        <ProfileInput type="nickname"></ProfileInput>
      </Flexbox>
      <ProfileInput type="email"></ProfileInput>

      <Button
        value="Edit"
        onClick={() => {
          navigate('/mypage/ProfileEdit')
        }}
      ></Button>
    </ProfileContent>
  )
}

const ProfileContent = styled.div`
  display: flex;
  position: absolute;
  border-radius: 10px;
  flex-direction: column;
  min-height: 100%;
  width: 70%;
`
const Flexbox = styled.div`
  display: flex;
  justify-content: space-between;
`

const Saad = styled.div`
  display: flex;
  positipn: absolute;
  justify-content: right;
`
