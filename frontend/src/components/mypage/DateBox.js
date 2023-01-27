import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

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
    <DateContainer
      id={date}
      className={disabledClass}
      onMouseEnter={() => (onMouseEnter ? onMouseEnter(date) : null)}
      onMouseLeave={() => (onMouseLeave ? onMouseLeave(date) : null)}
      onClick={() => (onClick ? onClick(date) : null)}
    >
      <FlexBox>
        <p>{date.slice(-2)}</p>
        {content}
      </FlexBox>
    </DateContainer>
  )
}

DateBox.propTypes = {
  date: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
}

DateBox.defaultProps = {
  date: '',
  disabled: false,
  onClick: undefined,
  onMouseEnter: undefined,
  onMouseLeave: undefined,
}

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;

  overflow: hidden;
  white-space: nowrap;
  position: absolute;

  width: 100%;
  height: 100%;
`

const DateContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.grayColor};
  border-radius: 5px;

  width: 100%;
  position: relative;

  &::after {
    display: block;
    content: '';
    padding-bottom: 100%;
  }

  &.disabled {
    background-color: ${({ theme }) => theme.grayColor};
  }
`
