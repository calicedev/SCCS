import React from 'react'
import styled from 'styled-components'

const typeObj = {
  name: {
    type: 'text',
    label: 'Name',
    placeholder: '이름을 입력하세요',
  },
  nickname: {
    type: 'text',
    label: 'Nickname',
    placeholder: '닉네임을 입력하세요',
  },
  id: {
    type: 'text',
    label: 'Id',
    placeholder: '아이디를 입력하세요',
  },
  email: {
    type: 'email',
    label: 'Email',
    placeholder: '이메일을 입력하세요',
  },
  password: {
    type: 'password',
    label: 'Password',
    placeholder: '비밀번호를 입력하세요',
  },
  newpassword: {
    type: 'password',
    label: 'Password',
    placeholder: '비밀번호를 입력하세요',
  },
  confirmPassword: {
    type: 'password',
    label: 'Confirm Password',
    placeholder: '비밀번호를 확인하세요',
  },
}

const InputBox = ({ type, value, onChange, message }) => {
  return (
    <div>
      {/* <Label>{typeObj[type].label}</Label>
      <FlexBox>
        
        <Input
          type={typeObj[type].type}
          placeholder={typeObj[type].placeholder}
          value={value}
          onChange={onChange}
        />
      </FlexBox>
      <Message isValid={message.isValid}>{message.text}</Message> */}
    </div>
  )
}



export default function ProfileInput() {
  return (
    <div>ProfileInput</div>
  )
}
