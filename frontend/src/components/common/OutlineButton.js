import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

/*
기본 버튼 컴포넌트

size: 버튼 사이즈
type: 버튼 색깔
onClick: 클릭 시 동작
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
      : size === 'small'
      ? 'sm-outbtn'
      : size === 'medium'
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
  onClick: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
}

OutlineButton.defaultProps = {
  size: 'medium',
  type: 'primary',
  onClick: undefined,
  value: '',
  disabled: false,
}

// border크기로 인해 Button에 비해 padding을 0.1rem씩 줄임
const StyledButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  border-radius: 10px;

  text-align: center;
  font-weight: 600;
  white-space: nowrap;

  transition: background-color ease 0.1s;

  border: 3px solid ${({ theme, type }) => theme[`${type}Color`]};
  color: ${({ theme, type }) => theme[`${type}Color`]};

  &:hover {
    background-color: ${({ theme, type }) => theme[`${type}Color`]};
    color: #ffffff;
  }

  &.xs-outbtn {
    align-items: center;
    width: 1.7rem;
    height: 1.7rem;
    border-radius: 50%;
    font-size: 1rem;
  }
  &.sm-outbtn {
    padding: 0.3rem 0.8rem;
    font-size: 1.1rem;
  }
  &.md-outbtn {
    padding: 0.4rem 0.9rem;
    font-size: 1.2rem;
  }
  &.lg-outbtn {
    padding: 0.6rem 1.1rem;
    font-size: 1.5rem;
  }
`
