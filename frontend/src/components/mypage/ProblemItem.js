import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

/*
내가 푼 문제 목록페이지에서 표시할 문제 아이템 컴포넌트

problemName: 문제이름
answerRate: 정답률
submitDatetime: 마지막으로 문제를 푼 날
difficulty: 문제 난이도
onClick: 문제 클릭 시 동작할 함수
*/

export default function ProblemItem({
  problemName,
  answerRate,
  submitDatetime,
  difficulty,
  onClick,
}) {
  return (
    <Container onClick={onClick}>
      <Flexbox>
        <p>{problemName}</p>
        <p className="c">마지막 제출일: {submitDatetime}</p>
      </Flexbox>
      <Flexbox>
        <p className="c">정답률: {answerRate}%</p>
        <p className="c">
          {difficulty === 1 ? '쉬움' : difficulty === 2 ? '보통' : '어려움'}
        </p>
      </Flexbox>
    </Container>
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

const Container = styled.div`
  padding: 0.5rem 0.5rem;

  border-bottom: solid 1px gray;
  border-radius: 1rem;

  background-color: ${({ theme }) => theme.bgColor};

  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    scale: 1.05;
    background-color: #7ab6ec24;
  }
`

const Flexbox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 0.5rem 0.2rem;

  & > .c {
    opacity: 0.7;
  }
`
