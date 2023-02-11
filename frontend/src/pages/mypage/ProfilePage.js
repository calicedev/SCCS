import React from 'react'
import styled from 'styled-components'
import ProfileInput from 'components/mypage/ProfileInput'
import Button from 'components/common/Button'
import ProfileImg from 'components/common/ProfileImg'
import { useNavigate } from 'react-router-dom'
import useUser from 'hooks/useUser'
// import { useSelector } from 'react-redux'

export default function Profile() {
  // 리덕스 -> 사용자 정보 읽어오기
  const user = useUser()

  // 리액트 훅 관련 함수 정의
  const navigate = useNavigate()

  return (
    <Container>
      <h1>Profile</h1>
      <ProfileContainer>
        <ProfileImg imgUrl={user.profileImage} />
        <p className="semi-bold">가입일: {user.joinDate}</p>
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

      <ButtonWrapper>
        <Button
          value="Edit"
          onClick={() => {
            navigate('/mypage/profile/edit')
          }}
        ></Button>
      </ButtonWrapper>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;

  max-width: 700px;
  width: 100%;

  padding: 2rem;
`

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
  top: 3.5rem;
  right: 2rem;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin: 2rem 0rem;
`

const Flexbox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
`
