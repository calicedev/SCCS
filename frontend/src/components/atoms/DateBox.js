import React, { useState } from 'react'
import styled from 'styled-components'

const studies = [
  {
    id: 1,
    title: '커피 내기 SSAFY기 (A301)',
    created_datetime: '2023-01-17 17:18:53',
    problems: [
      { id: 1, title: '미로찾기' },
      { id: 2, title: '치즈 녹이기' },
    ],
  },
  {
    id: 2,
    title: '커피 내기 SSAFY기2 (A301)',
    created_datetime: '2023-01-17 21:18:53',
    problems: [
      { id: 3, title: '미로찾기2' },
      { id: 2, title: '치즈 녹이기' },
    ],
  },
]

export default function DateBox({}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ul>
        {studies.map((study) => (
          <Study study={study} isHovered={isHovered} key={study.id} />
        ))}
      </ul>
    </Container>
  )
}

function Study({ study, isHovered }) {
  return (
    <>
      <li>
        {study.title}
        <ul className="problems">
          {study.problems.map((problem) => (
            <li key={problem.id}>{problem.title}</li>
          ))}
        </ul>
      </li>
    </>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;

  & .problems {
    visibility: hidden;
    position: absolute;
  }

  &:hover {
    & .problems {
      visibility: visible;
      position: static;
    }
  }
`
