import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import userLogo from 'assets/img/user_logo.png'
import passwordLogo from 'assets/img/password_logo.png'
import emailLogo from 'assets/img/email_logo.png'

const typeObj = {
  id: {
    type: 'text',
    label: 'Id',
    logo: userLogo,
    placeholder: '아이디를 입력하세요',
  },
  password: {
    type: 'password',
    label: 'Password',
    logo: passwordLogo,
    placeholder: '비밀번호를 입력하세요',
  },
  confirmPassword: {
    type: 'password',
    label: 'Confirm Password',
    logo: passwordLogo,
    placeholder: '비밀번호를 확인하세요',
  },
  name: {
    type: 'text',
    label: 'Name',
    logo: userLogo,
    placeholder: '이름을 입력하세요',
  },
  nickname: {
    type: 'text',
    label: 'Nickname',
    logo: userLogo,
    placeholder: '닉네임을 입력하세요',
  },
  email: {
    type: 'email',
    label: 'Email',
    logo: emailLogo,
    placeholder: '이메일을 입력하세요',
  },
}

const InputBox = ({ type, value, onChange, message }) => {
  return (
    <div>
      <Label>{typeObj[type].label}</Label>
      <FlexBox>
        <Img src={typeObj[type].logo} alt="로그인 이미지" />
        {/* src={'/public_assets/logo512.png'} */}
        <Input
          type={typeObj[type].type}
          placeholder={typeObj[type].placeholder}
          value={value}
          onChange={onChange}
        />
      </FlexBox>
      <Message isValid={message.isValid}>{message.text}</Message>
    </div>
  )
}

InputBox.propTypes = {
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

InputBox.defaultProps = {
  type: 'id',
  value: '',
  onChange: undefined,
  message: { text: '', isValid: false },
}

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid gray;
  padding: 0.4rem 0rem;
`

const Img = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  filter: opacity(60%);
  margin-right: 0.8rem;
`

const Input = styled.input`
  font-size: 1.5rem;
  padding: 0.2rem 0.1rem;
  box-sizing: boder-box;
`
const Label = styled.div`
  font-size: 1.5rem;
  color: gray;
  margin-top: 1rem;
`

const Message = styled.div`
  color: ${(props) =>
    props.isValid ? props.theme.blueColor : props.theme.redColor};
  margin-bottom: 1rem;
`

export default InputBox
