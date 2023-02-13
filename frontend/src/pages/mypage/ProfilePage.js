import React from 'react'
import styled from 'styled-components'
import ProfileInput from 'components/mypage/ProfileInput'
import Button from 'components/common/Button'
import ProfileImg from 'components/common/ProfileImg'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// import useUser from 'hooks/useUser'
import { useSelector } from 'react-redux'

import {
  GiChessQueen,
  GiChessBishop,
  GiChessKnight,
  GiChessPawn,
} from 'react-icons/gi'

export default function Profile() {
  // 리덕스 -> 사용자 정보 읽어오기
  // const user = useUser()
  const user = useSelector((state) => state.user)
  // 현재 등급 표시를 위한 배열 state
  const [grade, setGrade] = useState([])

  // 등급 로직
  // console.log(user.score)
  useEffect(() => {
    if (100000 <= user.score) {
      // console.log('queen')
      setGrade(['queen', false, false, false])
    } else if (30000 <= user.score) {
      // console.log('bishop')
      setGrade([false, 'bishop', false, false])
    } else if (3000 <= user.score) {
      // console.log('knight')
      setGrade([false, false, 'knight', false])
    } else {
      // console.log('pawn')
      setGrade([false, false, false, 'pawn'])
    }
  }, [])

  // 리액트 훅 관련 함수 정의
  const navigate = useNavigate()

  return (
    <Container>
      <h1>Profile</h1>
      <ProfileContainer>
        {/* 등급 아이콘 표시 */}
        {grade[0] ? (
          <GiChessQueen style={{ width: '100px', height: '50px' }} />
        ) : null}
        {grade[1] ? (
          <GiChessBishop style={{ width: '100px', height: '50px' }} />
        ) : null}
        {grade[2] ? (
          <GiChessKnight style={{ width: '100px', height: '50px' }} />
        ) : null}
        {grade[3] ? (
          <GiChessPawn style={{ width: '100px', height: '50px' }} />
        ) : null}
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
