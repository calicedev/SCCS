import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { RiArrowGoBackFill } from 'react-icons/ri'
import api from 'constants/api'
import axios from 'libs/axios'
import Button from 'components/common/Button'
import AuthInput from 'components/auth/AuthInput'
import IconButton from 'components/common/IconButton'

export default function ResetPasswordForm() {
  // 리액트 훅 관련 함수 정의
  const navigate = useNavigate()

  // useState
  const [id, setId] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState({
    text: '',
    isValid: false,
  })

  // 비밀번호 초기화 api 요청
  const resetPassword = () => {
    // 아이디와 메일 입력 여부 확인
    if (!id || !email) {
      const newMsg = { ...message }
      newMsg.text = '아이디와 이메일을 모두 입력해주세요'
      newMsg.isValid = false
      setMessage(newMsg)
      return
    }
    const data = {
      id,
      email,
    }
    const [url, method] = api('resetPassword')
    const config = { method, data }
    axios(url, config)
      .then((res) => {
        const newMsg = { ...message }
        newMsg.text = `입력하신 이메일로 임시 비밀번호가 발급되었습니다.`
        newMsg.isValid = true
        setMessage(newMsg)
      })
      .catch((err) => {
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
      <h1>Password Reset</h1>
      <p>
        If you enter your ID and email,
        <br /> a temporary password will be issued
      </p>
      <Form>
        <AuthInput
          type="id"
          value={id}
          onChange={(e) => {
            setId(e.target.value)
          }}
        ></AuthInput>
        <AuthInput
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              resetPassword()
            }
          }}
          result={message}
        ></AuthInput>
        <p className={message.isValid ? 'pass' : 'error'}>{message.text}</p>
      </Form>

      <ButtonContainer>
        <Button onClick={resetPassword} value="Submit" size="medium"></Button>
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
