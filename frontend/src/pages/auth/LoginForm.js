import React from 'react'
import styled from 'styled-components'
import Button from 'components/atoms/Button'
import InputBox from 'components/atoms/InputBox'
import Check from 'components/atoms/Check'
import { useNavigate } from 'react-router-dom'
import axios from 'libs/axios'
import api from 'apis/api'

import { useAuthInput } from 'hooks/useAuthInput'

export default function LoginForm() {
  const navigate = useNavigate()

  const [id, setId, idMsg] = useAuthInput('id', '')
  const [password, setPassword, passwordMsg] = useAuthInput('password', '')

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
        type="id"
        value={id}
        onChange={(e) => setId(e.target.value)}
        message={idMsg}
      ></InputBox>
      <InputBox
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        message={passwordMsg}
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
