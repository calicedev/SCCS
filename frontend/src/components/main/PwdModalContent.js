import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import api from 'constants/api'
import axios from 'libs/axios'
import checkReg from 'libs/regExp'
import Button from 'components/common/Button'

/*
방 비밀번호를 체크하는 모달의 컨텐츠 컴포넌트

id: 방의 pk
*/

export default function PwdModalContent({ id }) {
  // 리액트 훅 관련 함수 정의
  const navigate = useNavigate()

  // useState
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState({
    text: '',
    isValid: '',
  })

  // 방 비밀번호 체크 api 요청
  const submitPassword = () => {
    // 4자리 숫자 형식 정규식 검토
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
      <StyledInput
        type="password"
        value={password}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            submitPassword()
          }
        }}
        onChange={(e) => setPassword(e.target.value)}
      ></StyledInput>
      <p className={`c ${message.isValid ? 'pass' : 'error'}`}>
        {message.text}
      </p>
      <Button type="secondary" value="입장" onClick={submitPassword}></Button>
    </Container>
  )
}

PwdModalContent.propTypes = {
  id: PropTypes.number.isRequired,
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 0rem 1rem;
`

const StyledInput = styled.input`
width: 100%;

margin: 1rem 0rem 2rem;
padding: 0.5rem 0rem;

border-radius: 0.5rem;
box-shadow: 5px 5px 10px #00000050;

color black;
font-size: 1.2rem;
font-weight: bold;
text-align: center;
`
