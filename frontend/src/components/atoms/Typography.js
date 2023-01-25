import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Typography =  ({ type, value, color}) => {
  const typeClass = `${type}`
  const colorClass = `${color}`
  return (
    <TypoWrapper className={`${typeClass} ${colorClass}`}>
      {value}
    </TypoWrapper>
  )
}

Typography.propTypes = {
  type: PropTypes.oneOf(['h1', 'h2', 'h3', 'p', 'c']),
  color : PropTypes.oneOf(['pass', 'error', 'main', 'gray']),
  value: PropTypes.string,
}

Typography.defaultProps = {
  type: 'p',
  color: 'main',
  value: '',
}

const TypoWrapper = styled.p`
  &.h1 {
    font-size: 3rem;
    font-weight: 700;
  }
  &.h2 {
    font-size: 2rem;
    font-weight: 500;
  }
  &.h3 {
    font-size: 1rem;
    font-weight: 400;
  }
  &.p {
    font-size: 0.9rem;
    font-weight: 200
  }
  &.c {
    font-size: 0.8rem;
    font-weight: 100
  }
  &.pass {
    color: ${({ theme }) => theme.passColor};
  }
  &.error {
    color: ${({ theme }) => theme.errorColor};
  }
  &.gray {
    color: ${({ theme }) => theme.grayColor};
  }
  &.gray {
    color: ${({ theme }) => theme.mainColor};
  }
`

export default Typography