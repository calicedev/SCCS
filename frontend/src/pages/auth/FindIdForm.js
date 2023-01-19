import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Button from 'components/atoms/Button'
import InputBox from 'components/atoms/InputBox'
import Goback from 'components/atoms/Goback'
import emailLogo from 'assets/img/email_logo.png'
import { useNavigate } from 'react-router-dom'

export default function FindIdForm() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState({
    text: '',
    isValid: false,
  })

  const data = [
    {
      name: '손민혁',
      email: 'react1@naver.com',
    },
    {
      name: '발민혁',
      email: 'react2@naver.com',
    },
    {
      name: '민혁',
      email: 'react3@naver.com',
    },
  ]

  const findId = () => {
    if ((data[0].name === name) & (data[0].email === email)) {
      // const data = '아이디 찾기 성공'
      console.log('성공')
      const copy = { ...message }
      copy.text = '유효성검사 성공~~~'
      copy.isValid = true
      setMessage(copy)
      // console.log(message)
      return
    }
    // const data = '아이디 찾기 실패'
    console.log('실패')
    const copy = { ...message }
    copy.text = '유효성검사 실패~~~'
    copy.isValid = false
    setMessage(copy)
    // console.log(message)
    return
  }

  return (
    <FindId>
      <Goback alt="뒤로가기" />
      <H1>Find ID</H1>
      <Description>Enter your name and email to find your ID</Description>
      <InputBox
        type="id"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></InputBox>
      <InputBox
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></InputBox>
      <Message isValid={message.isValid}>{message.text}</Message>
      <Button onClick={findId} value="Find" size="medium"></Button>
    </FindId>
  )
}

const FindId = styled.div`
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
