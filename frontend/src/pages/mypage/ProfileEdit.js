import React, { useState } from 'react'
import styled from 'styled-components'
import ProfileInput from 'components/atoms/ProfileInput'
import Button from 'components/atoms/Button'
import ProfileImgInput from 'components/atoms/ProfileImgInput'
import { useNavigate } from 'react-router-dom'
import { useAuthInput } from 'hooks/useAuthInput'
import { useSelector } from 'react-redux'

export default function ProfileEdit() {
  // 리덕스
  const user = useSelector((state) => state.user)
  // 리액트 훅
  const navigate = useNavigate()

  const [nickname, setNickname, nicknameMsg] = useAuthInput(
    'nickname',
    user.nickname,
    true,
    true,
  )
  const [email, setEmail, emailMsg] = useAuthInput(
    'email',
    user.email,
    true,
    false,
  )
  const [img, setImg] = useState(user.profileImage)

  return (
    <ProfileContent>
      <h1>Edit Profile</h1>

      <EditBtns>
        <Button value="기본정보" type="primary"></Button>
        <Button
          value="비밀번호"
          type="secondary"
          onClick={() => {
            navigate('/mypage/profile/editpassword')
          }}
        ></Button>
      </EditBtns>

      <ProfileContainer>
        <ProfileImgInput
          imgUrl={img}
          onChange={(e) => setImg(e.target.files)}
          onDelete={() => setImg([])}
        ></ProfileImgInput>
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
            message={nicknameMsg}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          ></ProfileInput>
        </Flexbox>
        <ProfileInput
          type="email"
          value={email}
          message={emailMsg}
          onChange={(e) => setEmail(e.target.value)}
        ></ProfileInput>
      </InputContainer>

      <Button
        value="Cancel"
        onClick={() => {
          navigate('/mypage/Profile')
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
`

const EditBtns = styled.div`
  display: flex;
  justify-content: start;
`
