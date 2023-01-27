import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export default function ProblemItem({
  problemName,
  answerRate,
  submitDatetime,
  difficulty,
  onClick,
}) {
  return (
    <ProblemContainer onClick={onClick}>
      <FirstLine>
        <p>{problemName}</p>
        <p className="c">마지막 제출일: {submitDatetime}</p>
      </FirstLine>
      <SecondLine>
        <p className="c gray">정답률: {answerRate}</p>
        <p className="c">{difficulty}</p>
      </SecondLine>
    </ProblemContainer>
  )
}

ProblemItem.propTypes = {
  onClick: PropTypes.func,
  problemName: PropTypes.string,
  answerRate: PropTypes.string,
  sumbmitDatetime: PropTypes.string,
  difficulty: PropTypes.number,
}

ProblemItem.defaultProps = {
  onClick: undefined,
  problemName: '',
  answerRate: '',
  sumbmitDatetime: '',
  difficulty: 0,
}

const ProblemContainer = styled.div`
  padding: 0.7rem 0rem;
  border-bottom: solid 1px gray;
  border-top: solid 1px gray;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  background-color: ${({ theme }) => theme.bgColor};

  &:hover {
    scale: 1.05;
    background-color: ${({ theme }) => theme.bgColor};
  }
`

const FirstLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`

const SecondLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
