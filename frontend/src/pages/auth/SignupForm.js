import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Button from 'components/atoms/Button'
import InputBox from 'components/atoms/InputBox'
import checkValidation from 'libs/validation'
import { useNavigate } from 'react-router-dom'
import { useInput } from 'hooks/useInput'
import axios from 'libs/axios'
import api from 'apis/api'

export default function SignupForm() {
  const [id, setId, idMsg] = useInput('id', '')
  const [name, setName, nameMsg] = useInput('name', '')
  const [nickname, setNickname, nicknameMsg] = useInput('nickname', '')
  const [email, setEmail, emailMsg] = useInput('email', '')
  const [password, setPassword, passwordMsg] = useInput('password', '')
  const [confirmPassword, setConfirmPassword, confirmPasswordMsg] = useInput(
    'password',
    '',
  )

  console.log(id)
  const navigate = useNavigate()

  // useEffect(() => {
  //   if (!checkValidation('id', id)) {
  //     const newMessage = { ...messages }
  //     newMessage.id = '영,숫자 조합 6~20자'
  //     setMessages(newMessage)
  //     return
  //   }
  //   axios
  //     .get(api('checkId', { id }))
  //     .then((res) => {
  //       const newMessage = { ...messages }
  //       newMessage.id = '유효한 아이디입니다'
  //       setMessages(newMessage)
  //     })
  //     .catch((err) => {
  //       const newMessage = { ...messages }
  //       newMessage.id = '이미 존재하는 아이디입니다.'
  //       setMessages(newMessage)
  //     })
  // }, [id])

  return (
    <Signup>
      <H1>SigupForm</H1>

      <Description>
        If you don't have an account register
        <br /> You can{' '}
        <span
          onClick={() => {
            navigate('/auth/login')
          }}
        >
          Login here!
        </span>
      </Description>
      <InputBox
        type="id"
        value={id}
        onChange={setId}
        message={idMsg.text}
        isValid={idMsg.isValid}
      ></InputBox>
      <InputBox
        type="name"
        value={name}
        onChange={setName}
        message={nameMsg.text}
        isValid={nameMsg.isValid}
      ></InputBox>
      <InputBox
        type="nickname"
        value={nickname}
        onChange={setNickname}
        message={nicknameMsg.text}
        isValid={nicknameMsg.isValid}
      ></InputBox>
      <InputBox
        type="email"
        value={email}
        onChange={setEmail}
        message={emailMsg.text}
        isValid={emailMsg.isValid}
      ></InputBox>
      <InputBox
        type="password"
        value={password}
        onChange={setPassword}
        message={passwordMsg.text}
        isValid={passwordMsg.isValid}
      ></InputBox>
      <InputBox
        type="confirmPassword"
        value={confirmPassword}
        onChange={setConfirmPassword}
        message={confirmPasswordMsg.text}
        isValid={confirmPasswordMsg.isValid}
      ></InputBox>
      <Button size="medium"></Button>
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

  > span {
    font-weight: 500;
    color: ${({ theme }) => theme.blueColor};
  }
`
