import React, { useState } from 'react'
import styled from 'styled-components'
import Button from 'components/atoms/Button'
import AuthInput from 'components/atoms/AuthInput'
import Checkbox from 'components/atoms/Checkbox'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'libs/axios'
import api from 'apis/api'
import Typography from 'components/atoms/Typography'
import { useAuthInput } from 'hooks/useAuthInput'
import { useCookies } from 'react-cookie';


export default function LoginForm() {
  const navigate = useNavigate()
  const [cookie, setCookie] = useCookies(['id'])

  const [id, setId] = useAuthInput('id', '')
  const [password, setPassword] = useAuthInput('password', '')
  const [message, setMessage] = useState({
    text: '',
    isValid: '',
    
  })
  const [isChecked, setIsChecked] = useState(false)


  const login = () => {
    if (!(id && password)) {
      const checkmsg = { ...message }
      checkmsg.text = '아이디와 패스워드를 입력해주세요'
      checkmsg.isValid = false
      setMessage(checkmsg)
      return
    }
    const data = {
      id,
      password,
    }
    const url = api('login')
    axios
      .post(url, data)
      .then((res) => {
        console.log(res)
        setCookie('refresh_token', res.data['refresh_token'])
        setCookie('access_token', res.data['access_token'])
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
      <Typography type='h1' value='Login'></Typography>

      <Typography type='h3' value="If you don't have an account register">
      </Typography>
      <Link to="/auth/signup">
        <Typography type='h3' value='Register here!' color='pass'></Typography>
      </Link>
      <AuthInput
        type="id"
        value={id}
        onChange={(e) => setId(e.target.value)}
      ></AuthInput>
      <AuthInput
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></AuthInput>

      <Typography type='c' value={message.text} color={message.isValid? 'pass' : 'error'} />

      <Container>
        <Checkbox label='Remember Me' value={isChecked} onChange={(e) => setIsChecked(e.target.value)}></Checkbox>
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
