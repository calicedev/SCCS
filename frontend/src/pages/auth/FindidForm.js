import React from 'react'
import styled from 'styled-components'
import Button from 'components/atoms/Button'
import InputBox from 'components/atoms/InputBox'
import Check from 'components/atoms/Check'
import emailLogo from 'assets\img\email.png'

export default function FindidForm() {
  return (
    <Signup>
      <div img={img}>로그인 하러 가기</div>
      <H1>Find Id</H1>

      <Description>
        Enter your name and Email to find your ID
      </Description>
      <InputBox label="Name" placeHolder="이름을 입력하세요."></InputBox>
      <InputBox
        label="Email"
        placeHolder="Email을 입력하세요."
        logo={emailLogo}
      ></InputBox>
      <Container>
        <Check></Check>
        <div>
          <ForgotSpan></ForgotSpan>
          <ForgotSpan></ForgotSpan>
        </div>
      </Container>
      <Button size="medium">Find</Button>
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
