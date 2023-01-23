import React from 'react'
import styled from 'styled-components'

/*
  text와 isValid 값을 받아서
  isValid가 true일 경우 text를 파란색으로, false일 경우 text를 빨간색으로 렌더링 
*/
const Message = ({ text, isValid }) => {
  return <MessageDiv isValid={isValid}>{text}</MessageDiv>
}

const MessageDiv = styled.div`
  color: ${({ isValid, theme }) =>
    isValid ? theme.blueColor : theme.redColor};
  margin-bottom: 1rem;
`
export default Message
