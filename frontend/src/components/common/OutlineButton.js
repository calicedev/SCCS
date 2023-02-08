import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

/*
기본 버튼 컴포넌트

size: 버튼 사이즈
type: 버튼 색깔
handleClick: 클릭 시 동작
value: 버튼 안 글자
disabled: 버튼 클릭 가능 여부
*/

export default function OutlineButton({
  size,
  type,
  onClick,
  value,
  disabled,
}) {
  const sizeClass =
    size === 'tiny'
      ? 'xs-outbtn'
      : 'small'
      ? 'sm-outbtn'
      : 'medium'
      ? 'md-outbtn'
      : 'lg-outbtn'

  return (
    <StyledButton
      className={`${sizeClass}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {value}
    </StyledButton>
  )
}

OutlineButton.propTypes = {
  size: PropTypes.oneOf(['tiny', 'small', 'medium', 'large']), // 버튼 크기
  type: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'gray', 'danger']), // 버튼 커스터마이징 (글자색, 배경색, border-radius)
  handleClick: PropTypes.func,
  value: PropTypes.string,
  disabled: PropTypes.bool,
}

OutlineButton.defaultProps = {
  size: 'small',
  type: 'primary',
  handleClick: undefined,
  value: '',
  disabled: false,
}

const StyledButton = styled.button`
  display: inline-flex;
  justify-content: center;

  border-radius: 10px;

  background-color: #ffffff;

  text-align: center;
  font-weight: 600;
  white-space: nowrap;

  transition: background-color ease 0.1s;

  baorder-color: 3px solid ${({ theme, type }) => theme[`${type}Color`]};
  color: ${({ theme, type }) => theme[`${type}Color`]};
  &:hover {
    background-color: ${({ theme, type }) => theme[`${type}Color`]};
    color: #ffffff;
  }

  &.xs-outbtn {
    align-items: center;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    font-size: 1rem;
  }
  &.sm-outbtn {
    padding: 0.5rem 1rem;
    font-size: 1.2rem;
  }
  &.md-outbtn {
    padding: 0.6rem 1.2rem;
    font-size: 1.5rem;
  }
  &.lg-outbtn {
    padding: 0.7rem 1.5rem;
    font-size: 2rem;
  }
`
