import React from 'react'
import DateBox from 'components/mypage/DateBox'
import styled from 'styled-components'
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns'
import { isSameMonth, addDays, format } from 'date-fns'
import PropTypes from 'prop-types'
import 'styles/font.css'

/*
달력 컴포넌트. React.memo 컴포넌트 제공 (MemoizedCalendar)

currentDate: 오늘 날짜
onClickDateBox: 일별 박스 클릭 시 동작할 함수
onMouseEnterDateBox: 일별 박스에 마우스 enter시 함수
onMouseLeaveDateBox: 일별 박스에 마우스 leave시 함수
contents: 일별 박스에 띄울 콘텐츠, { YYYY-MM-DD: content } 구조의 Object
*/
const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function Calendar({
  currentDate,
  onClickDateBox,
  onMouseEnterDateBox,
  onMouseLeaveDateBox,
  contents,
}) {
  // currentDate를 기반으로 한 데이터
  const monthStart = startOfMonth(currentDate) // 현 월의 시작 일자
  const monthEnd = endOfMonth(currentDate) // 현 월의 마지막 일자
  const calendarStart = startOfWeek(monthStart) // 달력의 시작 일자
  const calendarEnd = endOfWeek(monthEnd) // 달력의 마지막 일자

  // 달력 날짜 박스 Array 형성. 현 월이 아닐 경우 disabled=true
  const dates = []
  let date = calendarStart
  while (date <= calendarEnd) {
    dates.push(
      <DateBox
        key={date}
        date={format(date, 'YYYY-MM-DD')}
        disabled={!isSameMonth(date, monthStart) ? true : false}
        content={contents[format(date, 'YYYY-MM-DD')]}
        onClick={onClickDateBox}
        onMouseEnter={onMouseEnterDateBox}
        onMouseLeave={onMouseLeaveDateBox}
      />,
    )
    date = addDays(date, 1)
  }

  return (
    <>
      <WeekDays>
        {WEEK_DAYS.map((day) => {
          return (
            <h3
              key={day}
              className={`${
                day === 'Sat' ? 'pass' : day === 'Sun' ? 'error' : 'main'
              }`}
            >
              {day}
            </h3>
          )
        })}
      </WeekDays>
      <CalendarGrid>{dates}</CalendarGrid>
    </>
  )
}

Calendar.propTypes = {
  currentDate: PropTypes.instanceOf(Date).isRequired,
  onClickDateBox: PropTypes.func,
  onMouseEnterDateBox: PropTypes.func,
  onMouseLeaveDateBox: PropTypes.func,
  contents: PropTypes.object,
}

Calendar.defaultProps = {
  onClickDateBox: undefined,
  onMouseEnterDateBox: undefined,
  onMouseLeaveDateBox: undefined,
  contents: undefined,
}

// 달력 Grid 생성
const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.2rem 0.2rem;
  width: 100%;
`

const WeekDays = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`
// Memoized React Component
const MemoizedCalendar = React.memo(Calendar)
export default MemoizedCalendar
export { Calendar }
