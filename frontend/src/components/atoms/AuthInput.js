import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { BiUser } from 'react-icons/bi'
import { RiLockPasswordLine } from 'react-icons/ri'
import { MdOutlineEmail } from 'react-icons/md'
import Typography from 'components/atoms/Typography'

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

const AuthInput = ({ type, value, onChange, message }) => {
  return (
    <Wrapper>
      <Label>{typeObj[type].label}</Label>
      <FlexBox>
        {typeObj[type].logo}
        <Input
          type={typeObj[type].type}
          placeholder={typeObj[type].placeholder}
          value={value}
          onChange={onChange}
        />
      </FlexBox>
      <Typography
        color={message.isValid ? 'pass' : 'error'}
        vlaue={message.text}
      />
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
  margin-bottom: 1rem;
`

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid gray;
  padding: 0.4rem 0rem;
  & > svg {
    width: 1.5rem;
    height: 1.5rem;
    filter: opacity(60%);
    margin-right: 0.8rem;
  }
`

const Input = styled.input`
  font-size: 1.5rem;
  padding: 0.2rem 0.1rem;
  box-sizing: boder-box;
`
const Label = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.fontColor};
  margin-top: 1rem;
`

export default AuthInput
