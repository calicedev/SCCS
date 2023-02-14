import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import OutlineButton from 'components/common/OutlineButton'

/*
Dropbox 우측의 아래 버튼 아이콘 클릭 시, 체크박스 옵션들이 보여지는 컴포넌트

title: 옵션들의 제목
opitions: {key: value}형태의 옵션. vlaue의 값이 Label로 체크박스 옆에 display
onChange: 클릭 시 동작할 함수
*/

export default function ButtonDropdown({
  title,
  size,
  type,
  options,
  onClick,
}) {
  const [showOptions, setShowOptions] = useState(false)

  const top =
    size === 'tiny'
      ? '2rem'
      : size === 'small'
      ? '3rem'
      : size === 'medium'
      ? '3.5rem'
      : '4rem'

  const handleClick = (e) => {
    setShowOptions(false)
    onClick(e)
  }

  return (
    <Container>
      <OutlineButton
        size={size}
        type={type}
        value={title}
        onClick={() => setShowOptions(!showOptions)}
      />
      <OptionWrapper display={showOptions ? 'flex' : 'none'} top={top}>
        {Object.keys(options).map((key) => (
          <OutlineButton
            key={key + '-' + options[key].toString()}
            id={key + '-' + options[key].toString()}
            size={size}
            type={type}
            value={options[key]}
            onClick={handleClick}
          />
        ))}
      </OptionWrapper>
    </Container>
  )
}

// ButtonDropdown.propTypes = {
//   title: PropTypes.string.isRequired,
//   options: PropTypes.object.isRequired,
//   onChange: PropTypes.func,
// }

// ButtonDropdown.defaultProps = {
//   onChange: undefined,
//   name: '',
//   value: '',
// }

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const OptionWrapper = styled.div`
  display: ${({ display }) => display};
  flex-direction: column;
  gap: 10px;

  z-index: 6;

  position: absolute;
  top: ${({ top }) => top};

  animation: 0.5s ease-in-out forwards dropdown;

  & > p {
    font-size: 1.2rem;
  }

  @keyframes dropdown {
    0% {
      opacity: 0;
      transform: translate3d(0, -100%, 0);
    }
    100% {
      opacity: 1;
      transform: translateZ(0);
    }
  }
`
