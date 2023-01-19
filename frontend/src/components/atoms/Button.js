import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Button = ({ size, type, onClick, value, logo, borderRadius }) => {
  const sizeClass = size === 'small' ? 'sm-btn' : 'medium' ? 'md-btn' : 'lg-btn'
  const typeClass = `${type}-btn`

  return (
    <BtnWrapper
      borderRadius={borderRadius}
      className={`${sizeClass} ${typeClass}`}
      onClick={onClick}
    >
      {logo}
      {value}
    </BtnWrapper>
  )
}

Button.propTypes = {
  // 버튼 크기
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  // 버튼 커스터마이징 (글자색, 배경색, border-radius)
  type: PropTypes.oneOf([
    'blueColor',
    'skyblueColor',
    'redColor',
    'grayColor',
    'transparent',
  ]),
  onClick: PropTypes.func,
  value: PropTypes.string,
  logo: PropTypes.elementType,
  borderRadius: PropTypes.string,
}

Button.defaultProps = {
  size: 'small',
  type: 'skyblueColor',
  onClick: undefined,
  value: '',
  logo: undefined,
  borderRadius: '1rem',
}

const BtnWrapper = styled.button`
  display: inline-flex;
  justify-content: center;
  border-radius: ${({ borderRadius }) => borderRadius};
  white-space: nowrap;
  transition: background-color ease 0.1s;
  font-weight: 600;
  text-align: center;
  margin: 0 auto;

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
  &.transparent-btn {
    background-color: opacity: 0;
    color: ${({ theme }) => theme.grayBgColor};
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
