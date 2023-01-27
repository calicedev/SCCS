import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { BiUser } from 'react-icons/bi'
import { RiLockPasswordLine } from 'react-icons/ri'
import { MdOutlineEmail } from 'react-icons/md'

const typeObj = {
  id: {
    type: 'text',
    label: 'Id',
    logo: <BiUser />,
    placeholder: '아이디를 입력하세요',
  },
  password: {
    type: 'password',
    label: 'Password',
    logo: <RiLockPasswordLine />,
    placeholder: '비밀번호를 입력하세요',
  },
  confirmPassword: {
    type: 'password',
    label: 'Confirm Password',
    logo: <RiLockPasswordLine />,
    placeholder: '비밀번호를 확인하세요',
  },
  name: {
    type: 'text',
    label: 'Name',
    logo: <BiUser />,
    placeholder: '이름을 입력하세요',
  },
  nickname: {
    type: 'text',
    label: 'Nickname',
    logo: <BiUser />,
    placeholder: '닉네임을 입력하세요',
  },
  email: {
    type: 'email',
    label: 'Email',
    logo: <MdOutlineEmail />,
    placeholder: '이메일을 입력하세요',
  },
}

export default function AuthInput({ type, value, onChange, message }) {
  return (
    <Wrapper>
      <Label htmlFor={type}>{typeObj[type].label}</Label>
      <FlexBox>
        {typeObj[type].logo}
        <Input
          id={type}
          type={typeObj[type].type}
          placeholder={typeObj[type].placeholder}
          value={value}
          onChange={onChange}
        />
      </FlexBox>
      <p className={`c ${message.isValid ? 'pass' : 'error'}`}>
        {message.text}
      </p>
    </Wrapper>
  )
}

AuthInput.propTypes = {
  type: PropTypes.oneOf([
    'id',
    'password',
    'confirmPassword',
    'name',
    'nickname',
    'email',
  ]),
  value: PropTypes.string,
  onChange: PropTypes.func,
  message: PropTypes.object,
}

AuthInput.defaultProps = {
  type: 'id',
  value: '',
  onChange: undefined,
  message: { text: '', isValid: false },
}

const Wrapper = styled.div`
  margin-bottom: 0.8rem;
`
const FlexBox = styled.div`
  border-bottom: 1px solid gray;
  padding: 0.3rem 0rem;
`
const Label = styled.label`
  font-size: 1rem;
  color: ${({ theme }) => theme.fontColor};
  margin-top: 1rem;
`
const Input = styled.input`
  padding-left: 0.5rem;
`
