import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import ProfileInput from 'components/atoms/ProfileInput'
import Button from 'components/atoms/Button'
import ProfileImg from 'components/atoms/ProfileImg'
import { useNavigate } from 'react-router-dom'
import { useAuthInput } from 'hooks/useAuthInput'
import { useSelector } from 'react-redux'

export default function PasswordEdit() {
  // 리덕스
  const user = useSelector((state) => state.user)

  const [password, setPassword] = useAuthInput('password', '')
  const [newpassword, setNewPassword] = useAuthInput('newpassword', '')
  const [confirmpassword, setConfirmPassword] = useAuthInput(
    'confirmpassword',
    '',
  )

  const joinDate = useMemo(() => {
    return user.joinDatetime.slice(0, 10)
  }, [user])

  const navigate = useNavigate()
  return (
    <ProfileContent>
      <h1>Edit Profile</h1>

      <EditBtns>
        <Button
          value="기본정보"
          type="secondary"
          onClick={() => {
            navigate('/mypage/profile/edit')
          }}
        ></Button>
        <Button value="비밀번호"></Button>
      </EditBtns>

      <ProfileContainer>
        <ProfileImg />
        가입일: {joinDate}
      </ProfileContainer>

      <ProfileInput
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></ProfileInput>
      <ProfileInput
        type="newpassword"
        value={newpassword}
        onChange={(e) => setNewPassword(e.target.value)}
      ></ProfileInput>
      <ProfileInput
        type="confirmpassword"
        value={confirmpassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      ></ProfileInput>

      <Button
        value="Edit"
        onClick={() => {
          navigate('/mypage/Profile')
        }}
      ></Button>
    </ProfileContent>
  )
}

const ProfileContainer = styled.div`
  position: absolute;
  top: 2rem;
  right: 0rem;
`

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
`

const EditBtns = styled.div`
  display: flex;
  justify-content: start;
`
