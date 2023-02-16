import { React, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import getScoreIcon from 'libs/getScoreIcon'
import Button from 'components/common/Button'
import ProfileImg from 'components/common/ProfileImg'
import ProfileInput from 'components/mypage/ProfileInput'
import getUserInfo from 'libs/getUserInfo'

export default function Profile() {
  useEffect(() => {
    getUserInfo('refreshed')
  }, [])

  // 리덕스 -> 사용자 정보 읽어오기
  const user = useSelector((state) => state.user)

  // score을 기반으로 gradeIcons 배열의 인덱스 계산
  const [scoreIcon, grade] = getScoreIcon(user.score)

  // 리액트 훅 관련 함수 정의
  const navigate = useNavigate()

  return (
    <Container>
      <h1>Profile</h1>
      <ProfileContainer>
        <ProfileImg src={user.profileImage} />
        <p className="semi-bold">가입일: {user.joinDate}</p>
      </ProfileContainer>
      <IconWrapper>
        {scoreIcon}
        {grade} {user.score}점
      </IconWrapper>
      <InputContainer>
        <ProfileInput type="id" value={user.id} disabled={true}></ProfileInput>
        <FlexBox>
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
        </FlexBox>
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

  width: 100%;
  max-width: 700px;

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

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
`
const IconWrapper = styled.div`
  font-size: 2rem;
  color: ${({ theme }) => theme.secondaryColor};
`
