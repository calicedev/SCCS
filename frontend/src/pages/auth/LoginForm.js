import React, { useState } from 'react'
import Button from 'components/atoms/Button'
import styled from 'styled-components'
import { useNavigate, Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useSelector, useDispatch } from 'react-redux'
import AuthInput from 'components/atoms/AuthInput'
import Checkbox from 'components/atoms/Checkbox'
import Typo, { TypoCss } from 'styles/Typo'
import axios from 'libs/axios'
import api from 'apis/api'

export default function LoginForm() {
  const navigate = useNavigate()
  const [cookie, setCookie] = useCookies(['id'])

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
        console.log(res)
        setCookie('refresh_token', res.data['refresh_token'])
        setCookie('access_token', res.data['access_token'])
      })
      // .then(() => {
      //   userSlice()
      //   dispatch(setUserinfo())
      // })

      .catch((err) => {
        const checkmsg = { ...message }
        checkmsg.text = '아이디 혹은 패스워드를 잘못 입력했습니다'
        checkmsg.isValid = false
        setMessage(checkmsg)
      })
  }

  return (
    <Container>
      <h1>Login</h1>

      <p>If you don't have an account register</p>
      <TypoLink to="/auth/signup" className="pass" weight="500">
        Register Here!
      </TypoLink>

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
          label="Remember Me"
          value={isChecked}
          onChange={(e) => setIsChecked(e.target.value)}
        ></Checkbox>
        <div>
          <TypoLink to="/auth/findid">Forgot ID?</TypoLink>
          <TypoLink to="/auth/resetpassword">Forgot Password?</TypoLink>
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

const TypoLink = styled(Link)`
  ${TypoCss}
`
