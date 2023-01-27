import React, { useState } from 'react'
import styled from 'styled-components'
import Button from 'components/atoms/Button'
import AuthInput from 'components/atoms/AuthInput'
import IconButton from 'components/atoms/IconButton'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import Typo, { TypoCss } from 'styles/Typo'
import axios from 'libs/axios'
import api from 'apis/api'

export default function FindIdForm() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState({
    text: '',
    isValid: false,
  })

  const findId = () => {
    if (!name || !email) {
      const newMsg = { ...message }
      newMsg.text = '이름과 이메일을 모두 입력해주세요'
      newMsg.isValid = false
      setMessage(newMsg)
      return
    }
    const data = {
      name,
      email,
    }
    const [url, method] = api('findId')
    const config = { method, data }
    axios(url, config)
      .then((res) => {
        const id = res.data.id
        const newMsg = { ...message }
        newMsg.text = `회원님의 아이디는 ${id}입니다.`
        newMsg.isValid = true
        setMessage(newMsg)
      })
      .catch((err) => {
        const newMsg = { ...message }
        newMsg.text = '해당 정보의 회원이 존재하지 않습니다.'
        newMsg.isValid = false
        setMessage(newMsg)
      })
  }

  return (
    <Flexbox>
      <IconButton
        icon={<RiArrowGoBackFill />}
        size={'small'}
        text={'로그인으로'}
        onClick={() => {
          navigate('/auth/login')
        }}
      />
      <Typo className="h1">Find ID</Typo>
      <Typo>Enter your name and email to find your ID</Typo>
      <Form>
        <AuthInput
          type="id"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></AuthInput>
        <AuthInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></AuthInput>
        <Typo color={message.isValid ? 'pass' : 'error'} value={message.text} />
      </Form>
      <Button onClick={findId} value="Find" size="medium"></Button>
    </Flexbox>
  )
}

const Flexbox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0rem 8rem;
`
const Form = styled.div`
  margin: 3rem 0rem;
`
