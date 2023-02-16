import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

/*
CalendarPage에서 날짜박스에 안에 넣을 StudyList 컴포넌트
스터디 타이틀만 표시되다가, 마우스 호버 시에 스터디에서 푼 문제 타이틀도 함께 표시


다음과 같은 구조를 받는다.
studies: [ 
  {
    id: 1,
    title: '스터디 타이틀',
    problems: [
      id: 1,
      title: '문제타이틀'
    ]
  }
]
*/

export default function StudyList({ studies }) {
  const [showOptions, setShowOptions] = useState(false)
  const navigate = useNavigate()

  const onMouseEnter = () => {
    setShowOptions(true)
  }

  const onMouseLeave = () => {
    setShowOptions(false)
  }

  return (
    <Wrapper onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {studies.map((study) => (
        <Study
          key={study.id}
          onClick={() => navigate(`/mypage/study/${study.id}`)}
        >
          <p>{study.studyroomTitle}</p>
          {study.problems?.map((problem) => (
            <Option key={problem.problemId} hidden={!showOptions}>
              <p>&nbsp;&nbsp;{problem.problemName}</p>
            </Option>
          ))}
        </Study>
      ))}
    </Wrapper>
  )
}

StudyList.propTypes = {
  studies: PropTypes.array,
}

StudyList.defaultProps = {
  studies: [],
}

const Wrapper = styled.div`
  width: 100%;
`

const Study = styled.div`
  margin-bottom: 0.5rem;
  cursor: pointer;

  & > p {
    font-size: 1.1rem;
    font-weight: 600;
  }
`

// 호버 시 위에서 아래로 내려오는 듯한 애니메이션
const Option = styled.div`
  animation: 0.5s ease-in-out forwards dropdown;

  & > p {
    font-size: 0.9rem;
  }

  @keyframes dropdown {
    0% {
      opacity: 0;
      transform: translate3d(0, -100%, 0);
    }
    100% {
      opacity: 1;
      transform: translateZ(0);
    }
  }
`
/* @keyframes duration | easing-function | delay |
iteration-count | direction | fill-mode | play-state | name */
