import React, { useState } from 'react'
import styled from 'styled-components'
import Button from 'components/atoms/Button'
import InputBox from 'components/atoms/AuthInput'
import Goback from 'components/atoms/Goback'

export default function ResetPasswordForm() {
  const [id, setId] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState({
    text: '',
    isValid: false,
  })

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
      console.log('성공')
      const copy = { ...message }
      copy.text = `${email}으로 임시 비밀번호를 전송했습니다.`
      copy.isValid = true
      setMessage(copy)
      // console.log(message)
      return
    }
    // const data = '아이디 찾기 실패'
    console.log('실패')
    const copy = { ...message }
    copy.text = '존재하지 않는 회원임 ㅋㅋㅋㅋㅋㅋㅋ'
    copy.isValid = false
    setMessage(copy)
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
        type="id"
        value={id}
        onChange={(e) => {
          setId(e.target.value)
        }}
      ></InputBox>
      <InputBox
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
        }}
        result={message}
      ></InputBox>
      <Message isValid={message.isValid}>{message.text}</Message>
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
const Message = styled.div`
  color: ${(props) =>
    props.isValid ? props.theme.blueColor : props.theme.redColor};
  margin-bottom: 1rem;
`
