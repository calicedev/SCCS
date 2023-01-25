import React from 'react'
import styled from 'styled-components'
import Typography from './Typography'


export default function ProblemItem({problem}) {
  const difficulty = problem.difficulty === 0 ? '쉬움' : problem.difficulty === 1 ? '보통' : '어려움'
  return (
    <ProblemContainer>
      <FirstLine>
        <Typography type='p' value={problem.problem_name}></Typography>{' '}
        <Typography type='c' value={`마지막 제출일: ${problem.submit_datetime}`}></Typography>
      </FirstLine>
      <SecondLine>
        <Typography type='c' color='gray' value={`정답률: ${problem.answer_rate}`}></Typography>{' '}
        <Typography type='c' value={difficulty}></Typography>
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
