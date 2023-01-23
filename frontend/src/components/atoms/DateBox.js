import React, { useState } from 'react'
import styled from 'styled-components'

export default function DateBox({ date, disabled, setCurrentDate, studies }) {
  const [isHovered, setIsHovered] = useState(false)

  const onMouseEnter = () => {
    if (disabled) return
    setIsHovered(true)
  }

  const onMouseLeave = () => {
    if (disabled) return
    setIsHovered(false)
  }

  const onClick = () => {
    if (!disabled) return
    setCurrentDate(date)
  }

  const day = date.getDate()

  return (
    <>
      <Container
        disabled={disabled}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        <div>{day}</div>
        {studies?.map((study) => (
          <Study study={study} isHovered={isHovered} key={study.id} />
        ))}
      </Container>
      <div hidden={!isHovered}></div>
    </>
  )
}

function Study({ study, isHovered }) {
  return (
    <div>
      {study?.title}
      <div className="problems" hidden={!isHovered}>
        {study?.problems.map((problem) => (
          <li key={problem.id}>{problem.title}</li>
        ))}
      </div>
    </div>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  background-color: ${({ disabled }) => (disabled ? 'gray' : 'white')};

  transition: all 0.3s ease-in-out;

  &:hover {
    position: absolute;
    z-index; 1;
  }
`
