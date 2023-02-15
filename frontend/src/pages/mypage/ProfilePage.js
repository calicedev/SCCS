import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from 'components/common/Button'
import ProfileImg from 'components/common/ProfileImg'
import ProfileInput from 'components/mypage/ProfileInput'
import {
  FaChessQueen,
  FaChessRook,
  FaChessKnight,
  FaChessBishop,
  FaChessPawn,
} from 'react-icons/fa'

const gradeIcons = [
  <FaChessQueen />,
  <FaChessRook />,
  <FaChessKnight />,
  <FaChessBishop />,
  <FaChessPawn />,
]

export default function Profile() {
  // 리덕스 -> 사용자 정보 읽어오기
  const user = useSelector((state) => state.user)

  // score을 기반으로 gradeIcons 배열의 인덱스 계산
  const index = useMemo(() => {
    console.log(user.score, '유저스코어다!')
    if (user.score >= 1000000) return 0
    if (user.score >= 30000) return 1
    if (user.score >= 3000) return 2
    if (user.score) return 3
    else return 4
  }, [user])

  // 리액트 훅 관련 함수 정의
  const navigate = useNavigate()

  return (
    <Container>
      <h1>Profile</h1>
      <ProfileContainer>
        <IconWrapper>
          {gradeIcons[index]}
          {user.score}점
        </IconWrapper>
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

const Flexbox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
`
const IconWrapper = styled.div`
  color: ${({ theme }) => theme.secondaryColor};
  font-size: 30px;
`
const IconWrapper2 = styled.div`
  color: ${({ theme }) => theme.secondaryColor};
`
