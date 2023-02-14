import React from 'react'
import { getDay } from 'date-fns'
import PropTypes from 'prop-types'
import styled from 'styled-components'

/*
달력(Calendar) 컴포넌트에서 사용하는 날짜 박스

date: 날짜, YYYY-MM-DD
disabled: 날짜박스의 활성화 여부, className="disabled or abled" 할당
onClick: 클릭 시에 동작할 함수
onMouseEnter: 마우스 Enter시에 동작할 함수. 해당 DateBox의 날짜를 첫번째 인자로 받음
onMouseLeave: 마우스 Leave시에 동작할 함수. 해당 DateBox의 날짜를 첫번째 인자로 받음 
*/

export default function DateBox({
  date,
  disabled,
  content,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) {
  // disabled 여부에 따라 className 할당
  const disabledClass = disabled ? 'disabled' : 'abled'
  // 0 ~ 6 에 해당하는 요일
  const day = getDay(date)

  return (
    <Container
      id={date}
      className={disabledClass}
      onMouseEnter={() => (onMouseEnter ? onMouseEnter(date) : null)}
      onMouseLeave={() => (onMouseLeave ? onMouseLeave(date) : null)}
      onClick={() => (onClick ? onClick(date) : null)}
    >
      <FlexBox>
        <p
          className={`${
            disabled ? 'gray' : day === 0 ? 'error' : day === 6 ? 'pass' : null
          }`}
        >
          {date.slice(-2)}
        </p>
        {content}
      </FlexBox>
    </Container>
  )
}

DateBox.propTypes = {
  date: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
}

DateBox.defaultProps = {
  disabled: false,
  onClick: undefined,
  onMouseEnter: undefined,
  onMouseLeave: undefined,
}

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;

  overflow: hidden;

  position: absolute;

  width: 100%;
  height: 100%;

  padding: 0.2rem;

  white-space: nowrap;
`

// ::after는 날짜 박스를 정사각형으로 유지하기 위해서 사용
const Container = styled.div`
  position: relative;

  width: 100%;

  border: 1px solid ${({ theme }) => theme.grayColor};
  border-radius: 5px;

  background-color: #ffffff;

  &::after {
    display: block;
    content: '';
    padding-bottom: 80%;
  }

  &.disabled {
    background-color: #dddddd;
  }
`
