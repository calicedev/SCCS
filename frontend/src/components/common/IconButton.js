import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

/*
투명한 아이콘 버튼 컴포넌트(글자 포함 가능)

id: 버튼의 id
icon: 아이콘. 기본적으로 'react-icon'라이브러리의 아이콘을 prop받음
size: 버튼 사이즈
type: 버튼 색깔
text: 아이콘 옆 문구
onClick: 클릭 시 동작
disabled: 버튼 클릭 가능 여부
*/

export default function IconButton({
  id,
  icon,
  size,
  type,
  text,
  onClick,
  disabled,
}) {
  const sizeClass = `${size}-icbtn`

  return (
    <IconWrapper
      id={id}
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
  id: PropTypes.string,
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

  color: ${({ theme, type }) => theme[`${type}Color`]};

  &:hover {
    color: ${({ theme, type }) =>
      theme[`deep${type.replace(/^[a-z]/, (c) => c.toUpperCase())}Color`]};
  }

  &.tiny-icbtn {
    font-size: 1.1rem;
  }
  &.small-icbtn {
    font-size: 1.2rem;
  }
  &.medium-icbtn {
    font-size: 1.5rem;
  }
  &.large-icbtn {
    font-size: 2rem;
  }
`
