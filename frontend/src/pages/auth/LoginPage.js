import React, { useState } from 'react'
import Button from 'components/common/Button'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
// import { setCookie } from 'libs/cookies'
import setUserInfo from 'libs/setUserInfo'
import AuthInput from 'components/auth/AuthInput'
import Checkbox from 'components/common/Checkbox'
import axios from 'libs/axios'
import api from 'apis/api'

export default function LoginForm() {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState({
    text: '',
    isValid: '',
  })
  const [isChecked, setIsChecked] = useState(false)

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
        setUserInfo(id)
        // setCookie('access_token', res.data['access_token'])
        // setCookie('refresh_token', res.data['refresh_token'])
      })
      .catch((err) => {
        const checkmsg = { ...message }
        setUserInfo(1)
        checkmsg.text = '아이디 혹은 패스워드를 잘못 입력했습니다'
        checkmsg.isValid = false
        setMessage(checkmsg)
      })
  }

  return (
    <Container>
      <h1>Login</h1>

      <p>If you don't have an account register</p>
      <Link to="/auth/signup" className="pass bold" weight="700">
        Register Here!
      </Link>

      <Form>
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
      </Form>

      <Flexbox>
        <Checkbox
          id="remeberMe"
          label="Remember Me"
          onChange={(e) => setIsChecked(!isChecked)}
        ></Checkbox>
        <div>
          <Link to="/auth/findid">Forgot ID?</Link>
          <Link to="/auth/resetpassword">Forgot Password?</Link>
        </div>
      </Flexbox>

      <Button onClick={login} value="Login" size="medium"></Button>
    </Container>
  )
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0rem 8rem;
`

const Flexbox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1.5rem 0rem;
`

const Form = styled.div`
  margin: 3rem 0rem;
`
