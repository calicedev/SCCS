import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Button from 'components/common/Button'

export default function StudyDetailHeader({
  studyTitle,
  numProblems,
  problemIdx,
  setProblemIdx,
}) {
  // 리액트 훅 관련 함수 정의
  const navigate = useNavigate()

  return (
    <Flexbox>
      <div>
        {[...Array(numProblems).keys()].map((idx) => {
          return (
            <Button
              key={`${idx}-problem`}
              size="medium"
              value={idx + 1}
              type={problemIdx === idx ? 'primary' : 'secondary'}
              onClick={() => setProblemIdx(idx)}
            />
          )
        })}
      </div>
      <h2>{studyTitle}</h2>
      <Button
        onClick={() => navigate(`/problem/${problemIdx}`)}
        value="문제풀기"
      />
    </Flexbox>
  )
}

StudyDetailHeader.propTypes = {
  studyTitle: PropTypes.string.isRequired,
  numProblems: PropTypes.number.isRequired,
  problemIdx: PropTypes.number,
  setProblemIdx: PropTypes.func,
}

StudyDetailHeader.defaultProps = {
  problemIdx: 0,
  setProblemIdx: undefined,
}

const Flexbox = styled.div`
  display: flex;
  justify-content: space-between;
`
