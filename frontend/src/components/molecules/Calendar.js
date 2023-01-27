import React from 'react'
import DateBox from 'components/atoms/DateBox'
import styled from 'styled-components'
import WeekDays from 'components/atoms/WeekDays'
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns'
import { isSameMonth, addDays, format } from 'date-fns'
import PropTypes from 'prop-types'

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
      <WeekDays />
      <Container>{dates}</Container>
    </>
  )
}

Calendar.propTypes = {
  currentDate: PropTypes.instanceOf(Date),
  onClickDateBox: undefined,
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

export default React.memo(Calendar)
