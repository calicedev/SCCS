import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Button from 'components/atoms/Button'
import InputBox from 'components/atoms/InputBox'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthInput } from 'hooks/useAuthInput'
import { useConfirmPwd } from 'hooks/useConfirmPwd'
import axios from 'libs/axios'
import api from 'apis/api'

export default function SignupForm() {
  // useAuthInput(타입, 초깃값, 정규식검사, 서버검사)
  const [id, setId, idMsg] = useAuthInput('id', '', true, true)
  const [name, setName, nameMsg] = useAuthInput('name', '', true, false)
  const [nickname, setNickname, nicknameMsg] = useAuthInput(
    'nickname',
    '',
    true,
    true,
  )
  const [email, setEmail, emailMsg] = useAuthInput('email', '', true, false)
  const [password, setPassword, passwordMsg] = useAuthInput(
    'password',
    '',
    true,
    false,
  )
  const [confirmPwd, setConfirmPwd, confirmPwdMsg] = useConfirmPwd('', password)

  const navigate = useNavigate()

  // 회원가입 서버 요청
  const signup = () => {
    if (
      idMsg.isValid &&
      nameMsg.isValid &&
      nicknameMsg.isValid &&
      emailMsg.isValid &&
      passwordMsg.isValid &&
      confirmPwdMsg.isValid
    ) {
      const data = {
        id,
        name,
        nickname,
        email,
        password,
      }
      axios
        .get(api('signup', data))
        .then((res) => {
          navigate('/main')
        })
        .catch((err) => {
          console.log(err)
        })
      return
    }
    alert('입력 양식을 모두 채워주세요')
  }

  return (
    <Signup>
      <H1>SigupForm</H1>

      <Description>
        If you don't have an account register
        <br /> You can <Link to="/login">Login here!</Link>
      </Description>
      <InputBox
        type="id"
        value={id}
        onChange={setId}
        message={idMsg}
      ></InputBox>
      <InputBox
        type="name"
        value={name}
        onChange={setName}
        message={nameMsg}
      ></InputBox>
      <InputBox
        type="nickname"
        value={nickname}
        onChange={setNickname}
        message={nicknameMsg}
      ></InputBox>
      <InputBox
        type="email"
        value={email}
        onChange={setEmail}
        message={emailMsg}
      ></InputBox>
      <InputBox
        type="password"
        value={password}
        onChange={setPassword}
        message={passwordMsg}
      ></InputBox>
      <InputBox
        type="confirmPassword"
        value={confirmPwd}
        onChange={setConfirmPwd}
        message={confirmPwdMsg}
      ></InputBox>
      <Button size="medium" onClick={signup} value="회원가입"></Button>
    </Signup>
  )
}

const Signup = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0rem 8rem;
`

const H1 = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.indigoColor};
`

const Description = styled.div`
  margin: 1rem 0rem 2rem;
  font-size: 1.2rem;

  > a {
    font-weight: 500;
    color: ${({ theme }) => theme.blueColor};
  }
`
