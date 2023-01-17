import React from 'react'
import styled from 'styled-components'
import Button from 'components/atoms/Button'
import InputBox from 'components/atoms/InputBox'
import Check from 'components/atoms/Check'
import passwordLogo from 'assets/img/password_logo.png'

export default function SignupForm() {
  return (
    <Signup>
      <H1>SigupForm</H1>

      <Description>
        If you don't have an account register
        <br /> You can <span>Register here!</span>
      </Description>
      <InputBox label="ID" placeHolder="ID를 입력하세요."></InputBox>
      <InputBox
        label="Password"
        placeHolder="비밀번호를 입력하세요."
        logo={passwordLogo}
      ></InputBox>
      <Container>
        <Check></Check>
        <div>
          <ForgotSpan>Forgot ID?</ForgotSpan>
          <ForgotSpan>Forgot Password?</ForgotSpan>
        </div>
      </Container>
      <Button size="medium"></Button>
    </Signup>
  )
}

const Signup = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0rem 8rem;
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1.5rem 0rem;
`

const ForgotSpan = styled.span`
  margin: 0.8rem 0.4rem;
`

const H1 = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.indigoColor};
`

const Description = styled.div`
  margin: 1rem 0rem 2rem;
  font-size: 1.2rem;

  > span {
    font-weight: 500;
    color: ${({ theme }) => theme.blueColor};
  }
`
