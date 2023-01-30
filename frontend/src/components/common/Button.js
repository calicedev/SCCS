import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

/*
기본 버튼 컴포넌트

size: 버튼 사이즈
type: 버튼 색깔
onClick: 클릭 시 동작
value: 버튼 안 글자
*/

export default function Button({ size, type, onClick, value }) {
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
  align-items: center;

  border-radius: 10px;

  color: white;
  text-align: center;
  font-weight: 600;
  white-space: nowrap;

  transition: background-color ease 0.1s;

  &.primary-btn {
    background-color: ${({ theme }) => theme.primaryColor};
    &:hover {
      background-color: ${({ theme }) => theme.deepPrimaryColor};
    }
  }
  &.secondary-btn {
    background-color: ${({ theme }) => theme.secondaryColor};
    &:hover {
      background-color: ${({ theme }) => theme.deepSecondaryColor};
    }
  }
  &.tertiary-btn {
    background-color: ${({ theme }) => theme.tertiaryColor};
    &:hover {
      background-color: ${({ theme }) => theme.deepTertiaryColor};
    }
  }
  &.gray-btn {
    background-color: ${({ theme }) => theme.grayColor};
    &:hover {
      background-color: ${({ theme }) => theme.deepGrayColor};
    }
  }
  &.danger-btn {
    background-color: ${({ theme }) => theme.dangerColor};
    &:hover {
      background-color: ${({ theme }) => theme.deepDangerColor};
    }
  }
  &.xs-btn {
    align-items: center;
    width: 1.7rem;
    height: 1.7rem;
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
