import React, { useMemo } from 'react'
import styled from 'styled-components'
import ProfileInput from 'components/atoms/ProfileInput'
import Button from 'components/atoms/Button'
import ProfileImg from 'components/atoms/ProfileImg'
import { useNavigate } from 'react-router-dom'
import Typo from 'styles/Typo'
import { useSelector } from 'react-redux'

export default function Profile() {
  // 리덕스
  const user = useSelector((state) => state.user)
  // 리액트 훅
  const navigate = useNavigate()

  const joinDate = useMemo(() => {
    return user.joinDatetime.slice(0, 10)
  }, [user])

  return (
    <ProfileContent>
      <Typo className="h1">Profile</Typo>
      <ProfileContainer>
        <ProfileImg />
        가입일: {joinDate}
      </ProfileContainer>
      <InputContainer>
        <ProfileInput type="id" value={user.id}></ProfileInput>
        <Flexbox>
          <ProfileInput type="name" value={user.name}></ProfileInput>
          <ProfileInput type="nickname" value={user.nickname}></ProfileInput>
        </Flexbox>
        <ProfileInput type="email" value={user.email}></ProfileInput>
      </InputContainer>
      <Button
        value="Edit"
        onClick={() => {
          navigate('/mypage/profile/edit')
        }}
      ></Button>
    </ProfileContent>
  )
}

const ProfileContent = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  width: 100%;
`

const ProfileContainer = styled.div`
  position: absolute;
  top: 2rem;
  right: 0rem;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 0rem;
`

const Flexbox = styled.div`
  display: flex;
  justify-content: space-between;
`
