import React from 'react'
import styled from 'styled-components'

export default function ProblemItem(props) {
  return (
    <ProblemContainer>
      <FirstLine>
        <span>{props.problem.problem_name}</span>{' '}
        <span>마지막 제출일: {props.problem.submit_datetime}</span>
      </FirstLine>
      <SecondLine>
        <span>정답률: {props.problem.answer_rate}</span>{' '}
        <span>
          {props.problem.difficulty === 0
            ? '쉬움'
            : props.problem.difficulty === 1
            ? '보통'
            : '어려움'}
        </span>
      </SecondLine>
    </ProblemContainer>
  )
}

const ProblemContainer = styled.div`
  display: flex-column;
  margin: 0rem 3rem;
  padding: 1rem 0rem;
  border-bottom: solid 1px black;
`

const FirstLine = styled.div`
  display: flex;
  justify-content: space-between;
`

const SecondLine = styled.div`
  display: flex;
  justify-content: space-between;
`
