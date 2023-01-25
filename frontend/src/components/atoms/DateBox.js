import React from 'react'
import styled from 'styled-components'
import Typography from 'components/atoms/Typography'

export default function DateBox({
  date,
  disabled,
  content,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) {
  const disabledClass = disabled ? 'disabled' : 'abled'

  return (
    <FlexBox
      id={date}
      className={disabledClass}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <Typography type="p" value={date.slice(-2)} />
      {content}
    </FlexBox>
  )
}

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;

  overflow: hidden;

  border: 1px solid gray;
  border-radius: 5px;

  white-space: nowrap;

  &.disabled {
    background-color: ${({ theme }) => theme.grayColor};
  }
`
