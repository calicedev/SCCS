import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { BiUser } from 'react-icons/bi'
import { RiLockPasswordLine } from 'react-icons/ri'
import { MdOutlineEmail } from 'react-icons/md'

/*
인증화면에서 사용할 입력 컴포넌트

type: 타입에 따라서 input의 type, label 텍스트, logo, placeholder 할당
value: input 태그에 할당할 state
message: message가 있을 시, isValid 여부에 따라 적절한 색깔로 문구를 보여줌
        {
          message: String,
          isValid: Boolean,
        }
onChange: onChange시 실행되는 함수
onKeyUp: onKeyUp시 실행되는 함수
*/

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

export default function AuthInput({ type, value, message, onChange, onKeyUp }) {
  return (
    <Container>
      <Label htmlFor={type}>{typeObj[type].label}</Label>
      <FlexBox>
        {typeObj[type].logo}
        <StyledInput
          id={`${type}-authinput`}
          type={typeObj[type].type}
          placeholder={typeObj[type].placeholder}
          value={value}
          onChange={onChange}
          onKeyUp={onKeyUp}
        />
      </FlexBox>
      <p className={`c ${message.isValid ? 'pass' : 'error'}`}>
        {message.text}
      </p>
    </Container>
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
  message: PropTypes.object,
  onChange: PropTypes.func,
  onKeyUp: PropTypes.func,
}

AuthInput.defaultProps = {
  type: 'id',
  value: '',
  message: { text: '', isValid: false },
  onChange: undefined,
  onKeyUp: undefined,
}

const Container = styled.div`
  margin-bottom: 0.8rem;
`
const FlexBox = styled.div`
  margin: 0.2rem 0rem;
  padding: 0.3rem 0rem;
  border-bottom: 1px solid gray;
  white-space: nowrap;
`
const Label = styled.label`
  margin-top: 1rem;

  color: ${({ theme }) => theme.fontColor};
  font-size: 1rem;
`
const StyledInput = styled.input`
  width: 90%;
  padding-left: 0.5rem;
  background-color: #00000000;
`
