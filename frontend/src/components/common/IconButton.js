import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

/*
투명한 아이콘 버튼 컴포넌트(글자 포함 가능)

icon: 아이콘. 기본적으로 'react-icon'라이브러리의 아이콘을 prop받음
type: 색깔
size: 버튼의 크기
text: 버튼 옆에 표시할 글자
onClick: 클릭 시 동작
disabled: 클릭 가능 여부
*/

export default function IconButton({
  icon,
  type,
  size,
  text,
  onClick,
  disabled,
}) {
  const sizeClass = `${size}-icbtn`

  return (
    <IconWrapper
      disabled={disabled}
      type={type}
      className={`${sizeClass}`}
      onClick={onClick}
    >
      {icon} {text}
    </IconWrapper>
  )
}

IconButton.propTypes = {
  icon: PropTypes.element.isRequired,
  type: PropTypes.oneOf([
    'black',
    'primary',
    'secondary',
    'tertiary',
    'gray',
    'white',
  ]),
  size: PropTypes.oneOf(['tiny', 'small', 'medium', 'large']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
}
IconButton.defaultProps = {
  type: 'black',
  size: 'small',
  onClick: undefined,
  disabled: false,
}

const IconWrapper = styled.div`
  cursor: pointer;
  color: black;

  color: ${({ theme, type }) => theme[`${type}Color`]};
  &:hover {
    color: ${({ theme, type }) =>
      theme[`deep${type.replace(/^[a-z]/, (c) => c.toUpperCase())}Color`]};
  }

  &.tiny-icbtn {
    font-size: 1.2rem;
  }
  &.small-icbtn {
    font-size: 1.5rem;
  }
  &.medium-icbtn {
    font-size: 2rem;
  }
  &.large-icbtn {
    font-size: 3rem;
  }
`
