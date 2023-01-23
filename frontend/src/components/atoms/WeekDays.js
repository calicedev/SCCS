import React from 'react'
import styled from 'styled-components'

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function WeekDays() {
  return (
    <FlexBox>
      {weekDays.map((day) => {
        return <div key={day}>{day}</div>
      })}
    </FlexBox>
  )
}

const FlexBox = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`
