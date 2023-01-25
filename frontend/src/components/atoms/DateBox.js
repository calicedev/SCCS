import React from 'react'
import styled from 'styled-components'

export default function DateBox({
  date,
  disabled,
  content,
  onClick,
  onMouseEnter,
}) {
  // const [isHovered, setIsHovered] = useState(false)

  const mouseEnter = (e) => {
    if (disabled) return
    onMouseEnter(date)
  }

  const mouseLeave = (e) => {
    if (disabled) return
  }

  const click = (e) => {
    if (!disabled) return
    onClick(e)
  }

  return (
    <Container
      id={date}
      disabled={disabled}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      onClick={click}
    >
      {date.slice(-2)}
      {content}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  background-color: ${({ disabled }) => (disabled ? 'gray' : 'white')};

  white-space: nowrap;
  overflow: hidden;
`
