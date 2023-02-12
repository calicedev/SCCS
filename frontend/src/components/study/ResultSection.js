import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import TestButtons from 'components/study/TestButtons'

/*
Dropbox 우측의 아래 버튼 아이콘 클릭 시, 체크박스 옵션들이 보여지는 컴포넌트

title: 옵션들의 제목
opitions: {key: value}형태의 옵션. vlaue의 값이 Label로 체크박스 옆에 display
onChange: 클릭 시 동작할 함수
*/

export default function TestResult({
  results,
  isFinished,
  finish,
  test,
  submit,
}) {
  return (
    <Container>
      <ResultsWrapper>
        {results.map((result, index) => (
          <p key={result.problemNo}>
            {index + 1}번. {result.result} {result.memory}kb {result.runtime}ms
          </p>
        ))}
      </ResultsWrapper>
      <TestButtons
        isFinished={isFinished}
        finish={finish}
        test={test}
        submit={submit}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  overflow: hidden;

  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.studyBgColor};
`
const ResultsWrapper = styled.div`
  margin: 1rem;
  background-color: ${({ theme }) => theme.deepStudyBgColor};
`

const FlexBox = styled.div`
  display: flex;
  gap: 10px;
`
