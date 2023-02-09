import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

/*
인증화면에서 사용할 입력 컴포넌트

type: 타입에 따라서 input의 type, label 텍스트, placeholder 할당
value: input 태그에 할당할 state
onChange: input 태그에 입력 시 실행할 함수
disabled: input 태그의 활성화 여부, 기본 false
message: message가 있을 시, isValid 여부에 따라 적절한 색깔로 문구를 보여줌
*/

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
      <Label htmlFor={type} className="semi-bold">
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
  width: 17rem;

  padding: 0.5rem 0.5rem;

  border: 1px solid;
  border-radius: 5px;

  background-color: ${({ disabled }) => (disabled ? '#EEEEEE' : 'white')};

  color: #000000;
  font-size: 1.2rem;
`

const Label = styled.label`
  display: block;

  margin-top: 1rem;

  font-size: 1.3rem;
`
