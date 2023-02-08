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

export default function Button({ size, type, handleClick, value, disabled }) {
  const sizeClass =
    size === 'tiny'
      ? 'xs-btn'
      : 'small'
      ? 'sm-btn'
      : 'medium'
      ? 'md-btn'
      : 'lg-btn'

  return (
    <BtnWrapper
      className={`${sizeClass}`}
      type={type}
      disabled={disabled}
      onClick={() => (disabled ? null : handleClick())}
    >
      {value}
    </BtnWrapper>
  )
}

Button.propTypes = {
  size: PropTypes.oneOf(['tiny', 'small', 'medium', 'large']), // 버튼 크기
  type: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'gray', 'danger']), // 버튼 커스터마이징 (글자색, 배경색, border-radius)
  handleClick: PropTypes.func,
  value: PropTypes.string,
  disabled: PropTypes.bool,
}

Button.defaultProps = {
  size: 'small',
  type: 'primary',
  handleClick: undefined,
  value: '',
  disabled: false,
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

  background-color: ${({ theme, type }) => theme[`${type}Color`]};
  &:hover {
    background-color: ${({ theme, type }) =>
      theme[`deep${type.replace(/^[a-z]/, (c) => c.toUpperCase())}Color`]};
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

// &.primary-btn {
//   background-color: ${({ theme }) => theme.primaryColor};
//   &:hover {
//     background-color: ${({ theme }) => theme.deepPrimaryColor};
//   }
// }
// &.secondary-btn {
//   background-color: ${({ theme }) => theme.secondaryColor};
//   &:hover {
//     background-color: ${({ theme }) => theme.deepSecondaryColor};
//   }
// }
// &.tertiary-btn {
//   background-color: ${({ theme }) => theme.tertiaryColor};
//   &:hover {
//     background-color: ${({ theme }) => theme.deepTertiaryColor};
//   }
// }
// &.gray-btn {
//   background-color: ${({ theme }) => theme.grayColor};
//   &:hover {
//     background-color: ${({ theme }) => theme.deepGrayColor};
//   }
// }
// &.danger-btn {
//   background-color: ${({ theme }) => theme.dangerColor};
//   &:hover {
//     background-color: ${({ theme }) => theme.deepDangerColor};
//   }
// }
