import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export default function OutlineButton({ size, type, onClick, value }) {
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

OutlineButton.propTypes = {
  size: PropTypes.oneOf(['tiny', 'small', 'medium', 'large']), // 버튼 크기
  type: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'gray', 'danger']), // 버튼 커스터마이징 (글자색, 배경색, border-radius)
  onClick: PropTypes.func,
  value: PropTypes.string,
}

OutlineButton.defaultProps = {
  size: 'small',
  type: 'primary',
  onClick: undefined,
  value: '',
}

const BtnWrapper = styled.button`
  display: inline-flex;
  justify-content: center;

  border-radius: 10px;

  background-color: #ffffff;

  text-align: center;
  font-weight: 600;
  white-space: nowrap;

  transition: background-color ease 0.1s;

  &.primary-btn {
    border: 3px solid ${({ theme }) => theme.primaryColor};
    color: ${({ theme }) => theme.primaryColor};
    &:hover {
      background-color: ${({ theme }) => theme.primaryColor};
      color: #ffffff;
    }
  }
  &.secondary-btn {
    border: 3px solid ${({ theme }) => theme.secondaryColor};
    color: ${({ theme }) => theme.secondaryColor};
    &:hover {
      background-color: ${({ theme }) => theme.secondaryColor};
      color: #ffffff;
    }
  }
  &.tertiary-btn {
    border: 3px solid ${({ theme }) => theme.tertiaryColor};
    color: ${({ theme }) => theme.tertiaryColor};
    &:hover {
      background-color: ${({ theme }) => theme.tertiaryColor};
      color: #ffffff;
    }
  }
  &.gray-btn {
    border: 3px solid ${({ theme }) => theme.grayColor};
    color: ${({ theme }) => theme.grayColor};
    &:hover {
      background-color: ${({ theme }) => theme.grayColor};
      color: #ffffff;
    }
  }
  &.danger-btn {
    border: 3px solid ${({ theme }) => theme.dangerColor};
    color: ${({ theme }) => theme.dangerColor};
    &:hover {
      background-color: ${({ theme }) => theme.dangerColor};
      color: #ffffff;
    }
  }
  &.xs-btn {
    align-items: center;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    font-size: 1rem;
  }
  &.sm-btn {
    padding: 0.5rem 1rem;
    font-size: 1.2rem;
  }
  &.md-btn {
    padding: 0.6rem 1.2rem;
    font-size: 1.5rem;
  }
  &.lg-btn {
    padding: 0.7rem 1.5rem;
    font-size: 2rem;
  }
`
