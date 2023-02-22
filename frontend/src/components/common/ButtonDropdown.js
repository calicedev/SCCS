import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from 'components/common/Button'

/*
클릭시 버튼 옵션들이 아래로 나타나는 컴포넌트

title: 옵션들의 제목
size: Button Component의 사이즈
type: Button Component의 색깔 
options: {key: value}형태의 옵션 객체. 버튼의 id = "key-value". 버튼의 글씨 = value.
onClick: 클릭 시 동작할 함수
isLeft: 버튼 정렬을 오른쪽에 맞출지 결정하는 인자.
*/

export default function ButtonDropdown({
  title,
  size,
  type,
  options,
  onClick,
  isLeft,
}) {
  // 옵션 버튼들의 display 여부
  const [showOptions, setShowOptions] = useState(false)

  // 버튼 사이즈에 따라 옵션 버튼들의 위치 조정
  const top =
    size === 'tiny'
      ? '1.5rem'
      : size === 'small'
      ? '2rem'
      : size === 'medium'
      ? '2.5rem'
      : '3rem'

  const handleClick = (e) => {
    setShowOptions(false)
    onClick(e)
  }

  return (
    <Container>
      <Button
        size={size}
        type={type}
        value={title}
        onClick={() => setShowOptions(!showOptions)}
      />
      <OptionWrapper
        display={showOptions ? 'flex' : 'none'}
        top={top}
        isLeft={isLeft}
      >
        {Object.keys(options).map((key) => (
          <Button
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

ButtonDropdown.propTypes = {
  title: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['tiny', 'small', 'medium', 'large']), // 버튼 크기
  type: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'gray', 'danger']), // 버튼 커스터마이징 (글자색, 배경색, border-radius)
  options: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  isLeft: PropTypes.bool,
}

ButtonDropdown.defaultProps = {
  size: 'medium',
  type: 'primary',
  onClick: undefined,
  isLeft: true,
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  position: relative;
`

const OptionWrapper = styled.div`
  display: ${({ display }) => display};
  flex-direction: column;
  gap: 5px;

  position: absolute;
  top: ${({ top }) => top};
  ${({ isLeft }) => (isLeft ? 'left: 0rem' : 'right: 0rem')};

  z-index: 6;

  animation: 0.5s ease-in-out forwards dropdown;
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
