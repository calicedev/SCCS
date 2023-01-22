import React, { useState } from 'react'
import { add, sub } from 'date-fns'
import Calendar from 'components/molecules/Calendar'
import WeekDays from 'components/atoms/WeekDays'
import DateSelector from 'components/molecules/DateSelector'
import styled from 'styled-components'

export default function Study() {
  const [currentDate, setCurrentDate] = useState(() => {
    const date = new Date()
    // ISO 8601 형식으로 YYYY-MM-DD
    return date.toISOString().slice(0, 7)
  })

  const previousDate = () => {
    const previousDate = sub(
      new Date(currentDate.slice(0, 4), currentDate.slice(5, 7)),
      { months: 1 },
    )
      .toISOString()
      .slice(0, 7)
    setCurrentDate(previousDate)
  }

  const nextDate = () => {
    const nextDate = add(
      new Date(currentDate.slice(0, 4), currentDate.slice(5, 7)),
      { months: 1 },
    )
      .toISOString()
      .slice(0, 7)
    setCurrentDate(nextDate)
  }

  return (
    <Container>
      <DateSelector
        currentDate={currentDate}
        onChange={(e) => setCurrentDate(e.target.value)}
        onClickPrevious={previousDate}
        onClickNext={nextDate}
      />
      <WeekDays />
      <Calendar />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
