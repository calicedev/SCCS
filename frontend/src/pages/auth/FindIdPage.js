import React, { useState } from 'react'
import styled from 'styled-components'
import Button from 'components/common/Button'
import AuthInput from 'components/auth/AuthInput'
import IconButton from 'components/common/IconButton'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import axios from 'libs/axios'
import api from 'constants/api'

export default function FindIdForm() {
  // 리액트 훅 기반 함수 정의
  const navigate = useNavigate()

  // useState
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState({
    text: '',
    isValid: false,
  })

  // 아아디 찾기 서버 요청
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
      .catch(() => {
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
        handleClick={() => {
          navigate('/auth/login')
        }}
      />
      <h1>Find ID</h1>
      <p>Enter your name and email to find your ID</p>
      <Form>
        <AuthInput
          type="id"
          value={name}
          handleChange={(e) => setName(e.target.value)}
        ></AuthInput>
        <AuthInput
          type="email"
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
        ></AuthInput>
        <p color={message.isValid ? 'pass' : 'error'} value={message.text} />
      </Form>

      <ButtonContainer>
        <Button handleClick={findId} value="Find" size="medium"></Button>
      </ButtonContainer>
    </Flexbox>
  )
}

const Flexbox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  height: 100%;
  padding: 0rem 8rem;
`
const Form = styled.div`
  margin: 3rem 0rem;
`
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`
