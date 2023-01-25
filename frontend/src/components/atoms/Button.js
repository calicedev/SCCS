import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Button = ({ size, type, onClick, value }) => {
  const sizeClass =
    size === 'tiny'
      ? 'xs-btn'
      : 'small'
      ? 'sm-btn'
      : 'medium'
      ? 'md-btn'
      : 'lg-btn'
  const typeClass = `${type}-btn`

  return (
    <BtnWrapper className={`${sizeClass} ${typeClass}`} onClick={onClick}>
      {value}
    </BtnWrapper>
  )
}

Button.propTypes = {
  size: PropTypes.oneOf(['tiny', 'small', 'medium', 'large']), // 버튼 크기
  type: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'gray', 'danger']), // 버튼 커스터마이징 (글자색, 배경색, border-radius)
  onClick: PropTypes.func,
  value: PropTypes.string,
}

Button.defaultProps = {
  size: 'small',
  type: 'primary',
  onClick: undefined,
  value: '',
}

const BtnWrapper = styled.button`
  display: inline-flex;
  justify-content: center;

  margin: 0 auto;

  border-radius: 10px;

  text-align: center;
  font-weight: 600;
  color: white;
  white-space: nowrap;

  transition: background-color ease 0.1s;

  &.primary-btn {
    background-color: ${({ theme }) => theme.primaryColor};
  }
  &.secondary-btn {
    background-color: ${({ theme }) => theme.secondaryColor};
    &:hover {
      background-color: ${({ theme }) => theme.primaryColor};
    }
  }
  &.tertiary-btn {
    background-color: ${({ theme }) => theme.tertiaryColor};
  }
  &.gray-btn {
    background-color: ${({ theme }) => theme.grayColor};
  }
  &.warning-btn {
    background-color: ${({ theme }) => theme.warningColor};
  }
  &.xs-btn {
    padding: 0.5rem 0.5rem;
    border-radius: 50%;
    font-size: 1.2rem;
  }
  &.sm-btn {
    padding: 0.5rem 1rem;
    font-size: 1.5rem;
  }
  &.md-btn {
    padding: 0.7rem 1.3rem;
    font-size: 1.8rem;
  }
  &.lg-btn {
    padding: 0.9rem 1.5rem;
    font-size: 2rem;
  }
`
export default Button
