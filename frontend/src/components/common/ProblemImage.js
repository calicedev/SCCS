import React, { useState } from 'react'
import styled from 'styled-components'

export default function ProblemImage({ imgUrl }) {
  return (
    <Wrapper>
      <StyledImg src={imgUrl} alt="문제이미지" />
    </Wrapper>
  )
}

// 스크롤바를 안쪽으로 옮기기 위해서 추가한 Wrapper
const Wrapper = styled.div`
  overflow-y: auto;
  width: 100%;
  height: 100%;

  border-radius: 0.5rem;
  overflow: hidden;
`

const StyledImg = styled.img`
  width: 100%;
`
