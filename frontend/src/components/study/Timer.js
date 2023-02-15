import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import useInterval from 'hooks/useInterval'

/*
스터디 페이지에서 studyBgColor 배경색에 Timer를 띄우는 컴포넌트

sec: 타이머 시간(초)
onZero: 타이머 완료 시 동작 할 함수
*/

export default function Timer({ sec, onZero }) {
  const [timer, setTimer] = useState(sec) // 남은 시간 표시

  useInterval(() => setTimer((timer) => timer - 1), 1000)

  useEffect(() => {
    if (timer <= 0) {
      onZero()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer])

  return (
    <StyledDiv>
      {parseInt(timer / (60 * 60))}:{parseInt((timer / 60) % 60)}:
      {parseInt(timer % 60)}
    </StyledDiv>
  )
}

Timer.propTypes = {
  sec: PropTypes.number.isRequired,
  onZero: PropTypes.func,
}

Timer.defaultProps = {
  onZero: undefined,
}

const StyledDiv = styled.div`
  display: flex;
  align-items: center;

  overflow: hidden;

  padding: 0.2rem 0.5rem;

  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.studyBgColor};

  font-size: 0.9rem;
  font-weight: bold;
  white-space: nowrap;
`
