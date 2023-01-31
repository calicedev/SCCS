import React from 'react'
// import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import Button from 'components/common/Button'
import StudyDetailTopNavbarBtn from 'components/mypage/StudyDetailTopNavbarBtn'

export default function StudyDetailTopNavbar({
  data,
  problemId,
  setProblemId,
}) {
  const navigate = useNavigate()
  return (
    <Container>
      <div>
        {data.problems.map((data, idx) => {
          return (
            <StudyDetailTopNavbarBtn
              size="medium"
              value={idx + 1}
              problemId={problemId}
              setProblemId={setProblemId}
              key={idx}
            />
          )
        })}
      </div>
      <h1>{data.title}</h1>
      <Button
        onClick={() => navigate(`/problem/${problemId}`)} // 이 주소로 가는게 맞는지는 정확히 모르겠음
        value="문제풀기"
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`
