import React, { useState } from 'react'
import styled from 'styled-components'
import Button from 'components/atoms/Button'
import AuthInput from 'components/atoms/AuthInput'
import { useNavigate } from 'react-router-dom'
import IconButton from 'components/atoms/IconButton'
import { RiArrowGoBackFill } from 'react-icons/ri'
import axios from 'libs/axios'
import api from 'apis/api'
import Typography from 'components/atoms/Typography'

export default function ResetPasswordForm() {
  const navigate = useNavigate()
  const [id, setId] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState({
    text: '',
    isValid: false,
  })

  const resetPassword = () => {
    // console.log(data[0].id, data[0].email)
    // console.log({ id }, { email })

    if (!id || !email) {
      const newMsg = { ...message }
      newMsg.text = '아이디와 이메일을 모두 입력해주세요'
      newMsg.isValid = false
      setMessage(newMsg)
      return
    }
    const data = {
      id,
      email,
    }
    const [url, method] = api('resetPassword')
    const config = { method, data }
    axios(url, config)
      .then((res) => {
        const newMsg = { ...message }
        newMsg.text = `입력하신 이메일로 임시 비밀번호가 발급되었습니다.`
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
      <Typography type="h1" value="Password Reset" />
      <Typography
        type="h3"
        value="If you enter your ID and email, a temporary password will be
        issued"
      />
      <AuthInput
        type="id"
        value={id}
        onChange={(e) => {
          setId(e.target.value)
        }}
      ></AuthInput>
      <AuthInput
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
        }}
        result={message}
      ></AuthInput>
      <Typography
        color={message.isValid ? 'pass' : 'error'}
        value={message.text}
      />
      <Button onClick={resetPassword} value="Submit" size="medium"></Button>
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
