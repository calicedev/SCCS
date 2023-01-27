import React from 'react'
import DateBox from 'components/mypage/DateBox'
import styled from 'styled-components'
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns'
import { isSameMonth, addDays, format } from 'date-fns'
import PropTypes from 'prop-types'

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const Calendar = ({
  currentDate,
  onClickDateBox,
  onMouseEnterDateBox,
  onMouseLeaveDateBox,
  contents,
}) => {
  console.log(1)
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const calendarStart = startOfWeek(monthStart)
  const calendarEnd = endOfWeek(monthEnd)

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
      <FlexBox>
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
      </FlexBox>
      <Container>{dates}</Container>
    </>
  )
}

Calendar.propTypes = {
  currentDate: PropTypes.instanceOf(Date),
  onClickDateBox: PropTypes.func,
  onMouseEnterDateBox: PropTypes.func,
  onMouseLeaveDateBox: PropTypes.func,
  contents: PropTypes.object,
}

Calendar.defaultProps = {
  currentDate: null,
  onClickDateBox: undefined,
  onMouseEnterDateBox: undefined,
  onMouseLeaveDateBox: undefined,
  contents: undefined,
}

const Container = styled.div`
  display: grid;

  width: 100%;

  grid-template-columns: repeat(7, 1fr);

  gap: 0.2rem 0.2rem;
`

const FlexBox = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  font-family: cursiveFont;
`

export default React.memo(Calendar)
