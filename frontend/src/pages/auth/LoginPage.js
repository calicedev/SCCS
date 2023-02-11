import React, { useState } from 'react'
import Button from 'components/common/Button'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import getUserInfo from 'libs/getUserInfo'
import { setExpiration } from 'redux/expSlice'
import { useDispatch } from 'react-redux'
import AuthInput from 'components/auth/AuthInput'
import Checkbox from 'components/common/Checkbox'
import axios from 'libs/axios'
import api from 'constants/api'

export default function LoginForm() {
  // 라액트 훅 관련 함수 정의
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // useState
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState({
    text: '',
    isValid: '',
  })
  const [isChecked, setIsChecked] = useState(false)

  // 로그인 서버 요청
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
    const config = { url, method, data }
    axios(config)
      .then((res) => {
        dispatch(setExpiration(res.data.expiration))
        getUserInfo(id)
        navigate('/')
      })
      .catch((err) => {
        const checkmsg = { ...message }
        checkmsg.text = '아이디 혹은 패스워드를 잘못 입력했습니다'
        checkmsg.isValid = false
        setMessage(checkmsg)
        setPassword('')
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
        <p className={`c ${message.isValid ? 'pass' : 'error'}`}>
          {message.text}
        </p>
      </Form>

      <Flexbox>
        <Checkbox
          id="remeberMe"
          label="Remember Me"
          onChange={(e) => setIsChecked(!isChecked)}
        ></Checkbox>
        <LinkWrapper>
          <Link to="/auth/findid">Forgot ID?</Link>
          <Link to="/auth/resetpassword">Forgot Password?</Link>
        </LinkWrapper>
      </Flexbox>

      <ButtonContainer>
        <Button onClick={login} value="Login" size="medium"></Button>
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

const Flexbox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 1.5rem 0rem;
`
const LinkWrapper = styled.div`
  display: flex;
  gap: 10px;
`

const Form = styled.div`
  margin: 3rem 0rem 1rem;
`
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`
