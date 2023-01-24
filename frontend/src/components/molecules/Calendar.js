import React from 'react'
import DateBox from 'components/atoms/DateBox'
import styled from 'styled-components'
import WeekDays from 'components/atoms/WeekDays'
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns'
import { isSameMonth, addDays, format } from 'date-fns'

export default function Calendar({
  currentDate,
  onClickDateBox,
  onMouseEnterDateBox,
  contents,
}) {
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
        date={format(date, 'yyyy-MM-dd')}
        disabled={!isSameMonth(date, monthStart) ? true : false}
        content={contents[format(date, 'yyyy-MM-dd')]}
        onClick={onClickDateBox}
        onMouseEnter={onMouseEnterDateBox}
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

const Container = styled.div`
  display: grid;

  width: 100%;

  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: minmax(130px, 130px);
`
