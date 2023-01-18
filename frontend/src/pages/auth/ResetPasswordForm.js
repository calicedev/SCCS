import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Button from 'components/atoms/Button'
import InputBox from 'components/atoms/InputBox'
import Goback from 'components/atoms/Goback'
import emailLogo from 'assets/img/email_logo.png'
import { useNavigate } from 'react-router-dom'
import checkValidation from 'libs/validation'

export default function ResetPasswordForm() {
  const navigate = useNavigate()
  const [id, setId] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const onChangeId = (e) => {
    setId(e.target.value)
  }
  const onChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const data = [
    {
      id: '손민혁',
      email: 'react1@naver.com',
    },
    {
      id: '발민혁',
      email: 'react2@naver.com',
    },
    {
      id: '민혁',
      email: 'react3@naver.com',
    },
  ]

  const resetPassword = () => {
    // console.log(data[0].id, data[0].email)
    // console.log({ id }, { email })

    if ((data[0].id === id) & (data[0].email === email)) {
      // const data = '아이디 찾기 성공'
      console.log('성공')
      setMessage(`${email}으로 임시 비밀번호를 전송했습니다.`)
      // console.log(message)
      return
    }
    // const data = '아이디 찾기 실패'
    console.log('실패')
    setMessage('존재하지 않는 회원입니다.')
    // console.log(message)
    return
  }
  return (
    <ResetPassword>
      <Goback alt="뒤로가기" />
      <H1>Password Reset</H1>
      <Description>
        If you enter your ID and email, <br />a temporary password will be
        issued
      </Description>
      <InputBox
        value={id}
        onChange={onChangeId}
        label="ID"
        placeHolder="아이디를 입력하세요."
      ></InputBox>
      <InputBox
        value={email}
        onChange={onChangeEmail}
        label="Email"
        placeHolder="이메일 주소를 입력하세요."
        logo={emailLogo}
        result={message}
      ></InputBox>
      <Button onClick={resetPassword} value="Submit" size="medium"></Button>
    </ResetPassword>
  )
}

const ResetPassword = styled.div`
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
  opacity: 70%;
`
