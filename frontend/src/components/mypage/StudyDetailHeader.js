import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Button from 'components/common/Button'

/*
스터디 디테일 페이지의 문제별 상단 해더
왼쪽: 문제 번호 목록 버튼. -> 클릭 시 현재 선택된 문제가 변경
가운데: 스터디의 제목.
오른족: 현재 선택된 문제를 푸는 url로 이동.

studyTitle: 스터디 제목
numProblems: 스터디에서 푼 문제의 갯수
problemIdx: 현재 선택된 문제의 배열 인덱스
setProblemIdx: problemIdx으니 setState 함수
*/

export default function StudyDetailHeader({
  studyTitle,
  numProblems,
  problemIdx,
  setProblemIdx,
  problemId,
}) {
  console.log(setProblemIdx)
  // 리액트 훅 관련 함수 정의
  const navigate = useNavigate()

  return (
    <Flexbox>
      <ButtonWrapper>
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
      </ButtonWrapper>
      <h2>{studyTitle}</h2>
      <Button
        onClick={() => navigate(`/problem/${problemId}`)}
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
  problemId: PropTypes.number,
}

StudyDetailHeader.defaultProps = {
  problemIdx: 0,
  setProblemIdx: undefined,
}

const Flexbox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 1rem;
`

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`
