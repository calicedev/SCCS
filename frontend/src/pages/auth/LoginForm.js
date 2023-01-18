import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Button from 'components/atoms/Button'
import InputBox from 'components/atoms/InputBox'
import Check from 'components/atoms/Check'
import passwordLogo from 'assets/img/password_logo.png'
import { useNavigate } from 'react-router-dom'
import checkValidation from 'libs/regExp'
import axios from 'libs/axios'
import api from 'apis/api'

export default function LoginForm() {
  const navigate = useNavigate()
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')

  const [messages, setMessages] = useState({
    id: '',
    password: '',
  })

  const onChangeId = (e) => {
    setId(e.target.value)
  }

  useEffect(() => {
    console.log(id)
    if (!checkValidation('id', id)) {
      const newMessage = { ...messages }
      newMessage.id = '유효성 검사를 통과 못함'
      setMessages(newMessage)
      return
    }
    const newMessage = { ...messages }
    newMessage.id = '유효성 검사를 통과함!!'
    setMessages(newMessage)
    return
  }, [id])

  const login = () => {
    const data = {
      id,
      password,
    }

    const url = api('login')

    axios
      .post(url, data)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
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
      <InputBox
        value={id}
        onChange={onChangeId}
        label="ID"
        placeHolder="ID를 입력하세요."
        result={messages.id}
      ></InputBox>
      <InputBox
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        placeHolder="비밀번호를 입력하세요."
        logo={passwordLogo}
        result={messages.password}
      ></InputBox>
      <Container>
        <Check></Check>
        <div>
          <ForgotSpan>Forgot ID?</ForgotSpan>
          <ForgotSpan>Forgot Password?</ForgotSpan>
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
