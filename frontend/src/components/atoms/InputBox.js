import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import userLogo from 'assets/img/user_logo.png'
import passwordLogo from 'assets/img/password_logo.png'
import emailLogo from 'assets/img/email_logo.png'

const InputBox = ({ type, value, onChange, message, isValid }) => {
  const typeObj = {
    id: {
      label: 'Id',
      logo: userLogo,
      placeholder: '아이디를 입력하세요',
    },
    password: {
      label: 'Password',
      logo: passwordLogo,
      placeholder: '비밀번호를 입력하세요',
    },
    confirmPassword: {
      label: 'Confirm Password',
      logo: passwordLogo,
      placeholder: '비밀번호를 확인하세요',
    },
    name: {
      label: 'Name',
      logo: userLogo,
      placeholder: '이름을 입력하세요',
    },
    nickname: {
      label: 'Nickname',
      logo: userLogo,
      placeholder: '닉네임을 입력하세요',
    },
    email: {
      label: 'Email',
      logo: emailLogo,
      placeholder: '이메일을 입력하세요',
    },
  }

  return (
    <div>
      <Label>{typeObj[type].label}</Label>
      <ImgWrapper>
        <Img src={typeObj[type].logo} alt="로그인 이미지" />
        {/* src={'/public_assets/logo512.png'} */}
        <Input
          placeholder={typeObj[type].placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </ImgWrapper>
      <Message>{message}</Message>
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
  onChange: PropTypes.func,
  result: PropTypes.string,
}

InputBox.defaultProps = {
  type: 'id',
  onChange: undefined,
  result: '',
}

const ImgWrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid gray;
  padding: 0.4rem 0rem;
  margin-bottom: 2rem;
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
`

const Message = styled.div`
  color: ${(props) =>
    props.isValid ? props.theme.blueColor : props.theme.redColor};
`

export default InputBox
