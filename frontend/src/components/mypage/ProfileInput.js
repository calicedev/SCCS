import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const typeObj = {
  name: {
    type: 'text',
    label: 'Name',
    placeholder: '이름을 입력해주세요',
  },
  nickname: {
    type: 'text',
    label: 'Nickname',
    placeholder: '닉네임을 입력해주세요',
  },
  id: {
    type: 'text',
    label: 'ID',
    placeholder: '아이디를 입력해주세요',
  },
  email: {
    type: 'email',
    label: 'Email',
    placeholder: '이메일을 입력해주세요',
  },
  password: {
    type: 'password',
    label: 'Password',
    placeholder: '기존 비밀번호를 입력해주세요',
  },
  newPassword: {
    type: 'password',
    label: 'New Password',
    placeholder: '새로운 비밀번호를 입력해주세요',
  },
  confirmPassword: {
    type: 'password',
    label: 'Confirm Password',
    placeholder: '새로운 비밀번호를 재확인해주세요',
  },
}

export default function ProfileInput({
  type,
  value,
  onChange,
  disabled,
  message,
}) {
  return (
    <Wrapper>
      <Label htmlFor={type} className="h1">
        {typeObj[type].label}
      </Label>
      <Input
        id={type}
        type={typeObj[type].type}
        placeholder={typeObj[type].placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      <p className={`c ${message.isValid ? 'pass' : 'error'}`}>
        {message.text}
      </p>
    </Wrapper>
  )
}

ProfileInput.propTypes = {
  type: PropTypes.oneOf([
    'name',
    'nickname',
    'id',
    'email',
    'password',
    'newPassword',
    'confirmPassword',
  ]),
  value: PropTypes.string,
  onChange: PropTypes.func,
  message: PropTypes.object,
  disabled: PropTypes.bool,
}

ProfileInput.defaultProps = {
  type: 'id',
  value: '',
  onChange: undefined,
  message: { text: '', isValid: false },
  disabled: false,
}

const Wrapper = styled.div``

const Input = styled.input`
  font-size: 1.3rem;
  padding: 0.2rem 0.5rem;
  border: 1px solid;
  border-radius: 5px;
  background-color: ${({ disabled }) => (disabled ? '#EEEEEE' : 'white')};
`

const Label = styled.label`
  display: block;
  font-size: 1.2rem;
  margin-top: 1rem;
`
