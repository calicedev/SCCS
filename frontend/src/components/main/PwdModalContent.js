import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'libs/axios'
import api from 'constants/api'
import checkReg from 'libs/regExp'
import Button from 'components/common/Button'

export default function PwdModalContent({ id }) {
  // 리액트 훅 관련 함수 정의
  const navigate = useNavigate()
  // useState
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState({
    text: '',
    isValid: '',
  })

  const submitPassword = () => {
    const [isValid, msg] = checkReg('roomPassword', password)
    if (!isValid) {
      const newMsg = { ...message }
      newMsg.text = msg
      newMsg.isValid = false
      setMessage(newMsg)
      return
    }
    const data = {
      id,
      password,
    }
    const [url, method] = api('checkRoomPassword')
    const config = { url, method, data }
    axios(config)
      .then((res) => {
        console.log(res)
        navigate(`/room/${id}/waiting`)
      })
      .catch((err) => {
        const newMsg = { ...message }
        newMsg.text = '비밀번호가 틀렸습니다.'
        newMsg.isValid = false
        setMessage(newMsg)
        return
      })
  }

  return (
    <Container>
      <h3 className="bold">비밀번호</h3>
      <Input
        type="number"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></Input>
      <Button value="제출" onClick={submitPassword}></Button>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Input = styled.input`
width: 100%;
height: 1.7rem;

margin-bottom: 1rem;

box-shadow: 5px 5px 10px #00000050;
border-radius: 0.5rem;
color black;
`
