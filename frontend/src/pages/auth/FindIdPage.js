import React, { useState } from 'react'
import styled from 'styled-components'
import Button from 'components/common/Button'
import AuthInput from 'components/auth/AuthInput'
import IconButton from 'components/common/IconButton'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import axios from 'libs/axios'
import api from 'constants/api'

export default function FindIdForm() {
  // 리액트 훅 기반 함수 정의
  const navigate = useNavigate()

  // useState
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState({
    text: '',
    isValid: false,
  })

  // 아아디 찾기 서버 요청
  const findId = () => {
    // 이름과 이메일 입력 여부 확인
    if (!name || !email) {
      const newMsg = { ...message }
      newMsg.text = '이름과 이메일을 모두 입력해주세요'
      newMsg.isValid = false
      setMessage(newMsg)
      return
    }
    const data = {
      name,
      email,
    }
    const [url, method] = api('findId')
    const config = { method, data }
    axios(url, config)
      .then((res) => {
        const id = res.data
        const newMsg = { ...message }
        newMsg.text = `회원님의 아이디는 ${id}입니다.`
        newMsg.isValid = true
        setMessage(newMsg)
      })
      .catch(() => {
        const newMsg = { ...message }
        newMsg.text = '해당 정보의 회원이 존재하지 않습니다.'
        newMsg.isValid = false
        setMessage(newMsg)
      })
  }

  return (
    <Container>
      <IconButton
        icon={<RiArrowGoBackFill />}
        size={'small'}
        text={'로그인으로'}
        onClick={() => {
          navigate('/auth/login')
        }}
      />
      <h1>Find ID</h1>
      <p>Enter your name and email to find your ID</p>
      <Form>
        <AuthInput
          type="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></AuthInput>
        <AuthInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></AuthInput>
        <p className={message.isValid ? 'pass' : 'error'}>{message.text}</p>
      </Form>

      <ButtonContainer>
        <Button onClick={findId} value="Find" size="medium"></Button>
      </ButtonContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 90%;
  height: 100%;

  @media screen and (min-width: 1024px) {
    width: 60%;
  }
`
const Form = styled.div`
  margin: 3rem 0rem;
`
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`
