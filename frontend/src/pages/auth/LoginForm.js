import React from 'react'
import styled from 'styled-components'
import Button from 'components/atoms/Button'
import InputBox from 'components/atoms/InputBox'
import passwordLogo from 'assets/img/password_logo.png'

export default function LoginForm() {
  const LoginForm = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0rem 8rem;
  `
  return (
    <LoginForm>
      <h1>Login</h1>
      <InputBox label="ID" placeHolder="ID를 입력하세요."></InputBox>
      <InputBox
        label="Password"
        placeHolder="비밀번호를 입력하세요."
        logo={passwordLogo}
      ></InputBox>
      <Button></Button>
    </LoginForm>
  )
}
