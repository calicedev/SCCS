import React, { useState } from 'react'
import { addMonths, subMonths } from 'date-fns'
import Calendar from 'components/molecules/Calendar'
import WeekDays from 'components/atoms/WeekDays'
import DateSelector from 'components/molecules/DateSelector'
import styled from 'styled-components'

const studies = [
  {
    id: 1,
    title: '커피 내기 SSAFY기 (A301)',
    created_datetime: '2023-01-17 17:18:53',
    problems: [
      { id: 1, title: '미로찾기' },
      { id: 2, title: '치즈 녹이기' },
    ],
  },
  {
    id: 2,
    title: '커피 내기 SSAFY기2 (A301)',
    created_datetime: '2023-01-17 21:18:53',
    problems: [
      { id: 3, title: '미로찾기2' },
      { id: 2, title: '치즈 녹이기' },
    ],
  },
]

export default function Study() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const previousDate = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  const nextDate = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  return (
    <Container>
      <DateSelector
        currentDate={currentDate}
        onChange={(e) => setCurrentDate(new Date(e.target.value))}
        onClickPrevious={previousDate}
        onClickNext={nextDate}
      />
      <WeekDays />
      <Calendar
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        studies={studies}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
