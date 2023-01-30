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
disabled: hover시 색깔 전활 활성화 여부
*/

export default function IconButton({
  icon,
  type,
  size,
  text,
  onClick,
  disabled,
}) {
  const typeClass = `${type}-icbtn`
  const sizeClass = `${size}-icbtn`

  return (
    <IconWrapper
      disabled={disabled}
      className={`${typeClass} ${sizeClass}`}
      onClick={onClick}
    >
      {icon} {text}
    </IconWrapper>
  )
}

IconButton.propTypes = {
  icon: PropTypes.element,
  type: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'gray', 'white']),
  size: PropTypes.oneOf(['small', 'middle', 'large']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
}
IconButton.defaultProps = {
  icon: {},
  type: undefined,
  size: 'small',
  onChange: undefined,
  disabled: false,
}

const IconWrapper = styled.div`
  cursor: pointer;
  color: black;

  &.primary-icbtn {
    color: ${({ theme }) => theme.primaryColor};
    :hover {
      color: ${({ disabled, theme }) =>
        disabled ? theme.primaryColor : theme.deepPrimaryColor};
    }
  }
  &.secondary-icbtn {
    color: ${({ theme }) => theme.secondaryColor};
    :hover {
      color: ${({ disabled, theme }) =>
        disabled ? theme.secondaryColor : theme.deepSecondaryColor};
    }
  }
  &.tertiary-icbtn {
    color: ${({ theme }) => theme.tertiaryColor};
    :hover {
      color: ${({ disabled, theme }) =>
        disabled ? theme.tertiaryColor : theme.deepTertiaryColor};
    }
  }
  &.gray-icbtn {
    color: ${({ theme }) => theme.grayColor};
    :hover {
      color: ${({ disabled, theme }) =>
        disabled ? theme.grayColor : theme.deepGrayColor};
    }
  }
  &.white-icbtn {
    color: #ffffff;
    :hover {
      color: #ffffff;
    }
  }
  &.small-icbtn {
    font-size: 1.5rem;
  }
  &.middle-icbtn {
    font-size: 2rem;
  }
  &.large-icbtn {
    font-size: 3rem;
  }
`
