import React, { useMemo } from 'react'
import styled from 'styled-components'
import ProfileInput from 'components/mypage/ProfileInput'
import Button from 'components/common/Button'
import ProfileImg from 'components/common/ProfileImg'
import { useNavigate } from 'react-router-dom'
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
      <h1>Profile</h1>
      <ProfileContainer>
        <ProfileImg />
        가입일: {joinDate}
      </ProfileContainer>
      <InputContainer>
        <ProfileInput type="id" value={user.id} disabled={true}></ProfileInput>
        <Flexbox>
          <ProfileInput
            type="name"
            value={user.name}
            disabled={true}
          ></ProfileInput>
          <ProfileInput
            type="nickname"
            value={user.nickname}
            disabled={true}
          ></ProfileInput>
        </Flexbox>
        <ProfileInput
          type="email"
          value={user.email}
          disabled={true}
        ></ProfileInput>
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
