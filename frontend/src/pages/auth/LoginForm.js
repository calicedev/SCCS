import React, { useState } from 'react'
import styled from 'styled-components'
import Button from 'components/atoms/Button'
import AuthInput from 'components/atoms/AuthInput'
import Check from 'components/atoms/Checkbox'
import { useNavigate } from 'react-router-dom'
import axios from 'libs/axios'
import api from 'apis/api'

import { useAuthInput } from 'hooks/useAuthInput'

export default function LoginForm() {
  const navigate = useNavigate()

  const [id, setId, idMsg] = useAuthInput('id', '')
  const [password, setPassword, passwordMsg] = useAuthInput('password', '')

  const [message, setMessage] = useState({
    text: '',
    isValid: '',
  })
  const login = () => {
    if (!id || !password) {
      const newMsg = { ...message }
      newMsg.text = '아이디와 패스워드를 모두 입력해주세요'
      newMsg.isValid = false
      setMessage(newMsg)
      return
    }
    const data = {
      id,
      password,
    }
    const [url, method] = api('login')
    const config = { method, data }
    axios(url, config)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        const checkmsg = { ...message }
        checkmsg.text = '아이디 혹은 패스워드를 잘못 입력했습니다'
        checkmsg.isValid = false
        setMessage(checkmsg)
      })
  }

  return (
    <Login>
      <H1>Login</H1>

      <Description>
        If you don't have an account register
        <br /> You can{' '}
        <span
          onClick={() => {
            navigate('/auth/signup')
          }}
        >
          Register here!
        </span>
      </Description>
      <AuthInput
        type="id"
        value={id}
        onChange={(e) => setId(e.target.value)}
        message={idMsg}
      ></AuthInput>
      <AuthInput
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        message={passwordMsg}
      ></AuthInput>

      <Message isValid={message.isValid}>{message.text}</Message>
      <Container>
        <Check></Check>
        <div>
          <ForgotSpan
            onClick={() => {
              navigate(`/auth/findid`)
            }}
          >
            Forgot ID?
          </ForgotSpan>
          <ForgotSpan
            onClick={() => {
              navigate(`/auth/resetpassword`)
            }}
          >
            Forgot Password?
          </ForgotSpan>
        </div>
      </Container>

      <Button onClick={login} value="Login" size="medium"></Button>
    </Login>
  )
}

const Login = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0rem 8rem;
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1.5rem 0rem;
`

const ForgotSpan = styled.span`
  margin: 0.8rem 0.4rem;
  cursor: pointer;
`

const H1 = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.indigoColor};
`

const Description = styled.div`
  margin: 1rem 0rem 2rem;
  font-size: 1.2rem;

  > span {
    font-weight: 500;
    color: ${({ theme }) => theme.blueColor};
    cursor: pointer;
  }
`

const Message = styled.div`
  color: ${(props) =>
    props.isValid ? props.theme.blueColor : props.theme.redColor};
  margin-bottom: 1rem;
`
