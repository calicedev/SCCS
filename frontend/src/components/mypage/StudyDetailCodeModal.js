import React from 'react'
import styled from 'styled-components'

export default function StudyDetailCodeModal({ code }) {
  return (
    <ModalContainer>
      <h4>{code.member_id}의 코드</h4>
      <div>{code.code}</div>
    </ModalContainer>
  )
}

const ModalContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #61dafb;
  text-align: left;
`
