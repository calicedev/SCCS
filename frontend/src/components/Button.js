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
  border-radius: 6px;
  white-space: nowrap;
  transition: background-color ease 0.1s;
  font-weight: 600;
  line-height: 1.3rem;

  &.blueColor-btn {
    background-color: ${({ theme }) => theme.blueBgColor};
    color: ${({ theme }) => theme.whiteColor};
  }
  &.skyblueColor-btn {
    background-color: ${({ theme }) => theme.skyblueBgColor};
    color: ${({ theme }) => theme.whiteColor};
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
    font-size: 1rem;
    svg {
      width: 0.8rem;
      height: 0.8rem;
    }
  }
  &.md-btn {
    padding: 0.3px 0.9px;
    font-size: 0.8rem};
    svg {
      width: 0.9rem;
      height: 0.9rem;
    }
  }
  &.lg-btn {
    padding: 0.4rem 1rem;
    font-size: 0.9rem};
    svg {
      width: 1rem;
      height: 1rem;
    }
  }
`
export default Button
