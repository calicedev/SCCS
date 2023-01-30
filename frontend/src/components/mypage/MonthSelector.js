import React from 'react'
import PropTypes from 'prop-types'
import IconButton from 'components/common/IconButton'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'
import { format } from 'date-fns'
import styled from 'styled-components'

/*
input type="month" 컴포넌트

currentDate: 오늘 날짜(input의 value)
onChange: 날짜 선택 시 동작할 함수
onClickPrevious: 왼쪽 화살표 버튼 클릭 시 동작할 함수
onClickNext: 오른쪽 화살표 버튼 클릭 시 동작할 함수
*/

export default function MonthSelector({
  currentDate,
  onChange,
  onClickPrevious,
  onClickNext,
}) {
  const month = format(currentDate, 'YYYY-MM')

  return (
    <Flexbox>
      <IconButton
        icon={<AiFillCaretLeft />}
        size="small"
        type="gray"
        onClick={onClickPrevious}
      />
      <Input type="month" value={month} onChange={onChange} />
      <IconButton
        icon={<AiFillCaretRight />}
        size={'small'}
        type="gray"
        onClick={onClickNext}
      />
    </Flexbox>
  )
}

MonthSelector.propTypes = {
  currentDate: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  onClickPrevious: PropTypes.func,
  onClickNext: PropTypes.func,
}

MonthSelector.defaultProps = {
  currentDate: '',
  onChange: undefined,
  onClickPrevious: undefined,
  onClickNext: undefined,
}

const Flexbox = styled.div`
  display: flex;
  align-items: center;
`

const Input = styled.input`
  background-color: #00000000;
  padding: 0.2rem 0.5rem;
  color: ${({ theme }) => theme.fontColor};
  font-size: 1rem;
  border: none;
  outline: none;

  &::-webkit-calendar-picker-indicator {
    background-color: #ffffff;
    padding: 5px;
    cursor: pointer;
    border-radius: 3px;
  }
`