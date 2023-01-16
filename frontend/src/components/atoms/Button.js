import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Button = ({ size, type, onClick, value }) => {
  const sizeClass = size === 'small' ? 'sm-btn' : 'medium' ? 'md-btn' : 'lg-btn'
  const typeClass = `${type}-btn`

  return <BtnWrapper className={`${sizeClass} ${typeClass}`}>하윙</BtnWrapper>
}

Button.propTypes = {
  // 버튼 크기
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  // 버튼 커스터마이징 (글자색, 배경색, border-radius)
  type: PropTypes.oneOf(['blueColor', 'skyblueColor', 'redColor', 'grayColor']),
  onClick: PropTypes.func,
  value: PropTypes.string,
}

Button.defaultProps = {
  size: 'small',
  type: 'skyblueColor',
  onClick: undefined,
  value: '',
}

const BtnWrapper = styled.button`
  display: inline-flex;
  border-radius: 10px;
  white-space: nowrap;
  transition: background-color ease 0.1s;
  font-weight: 600;

  &.blueColor-btn {
    background-color: ${({ theme }) => theme.blueBgColor};
    color: ${({ theme }) => theme.whiteColor};
    &:hover {
      background-color: ${({ theme }) => theme.indigoBgColor};
    }
  }
  &.skyblueColor-btn {
    background-color: ${({ theme }) => theme.skyblueBgColor};
    color: ${({ theme }) => theme.whiteColor};
    &:hover {
      background-color: ${({ theme }) => theme.blueBgColor};
    }
  }
  &.redColor-btn {
    background-color: ${({ theme }) => theme.redBgColor};
    color: ${({ theme }) => theme.whiteColor};
  }
  &.grayColor-btn {
    background-color: ${({ theme }) => theme.grayBgColor};
    color: ${({ theme }) => theme.whiteColor};
  }

  &.sm-btn {
    padding: 0.2rem 0.75rem;
    font-size: 1.3rem;
  }
  &.md-btn {
    padding: 0.3rem 0.85rem;
    font-size: 1.5rem;
  }
  &.lg-btn {
    padding: 0.4rem 0.95rem;
    font-size: 1.7rem;
  }
`
export default Button
