import React from 'react'
import DateBox from 'components/atoms/DateBox'
import styled from 'styled-components'
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns'
import { isSameMonth, isSameDay, addDays, parse, format } from 'date-fns'

export default function Calendar({ currentDate, setCurrentDate, studies }) {
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const calendarStart = startOfWeek(monthStart)
  const calendarEnd = endOfWeek(monthEnd)

  const studiesHashed = {}
  //   let date = monthStart

  //   while (date <= monthEnd) {
  //     studiesHashed[format(date, 'yyyy-MM-dd')] = []
  //     date = addDays(date, 1)
  //   }
  //   console.log(studiesHashed)

  studies.forEach((study) => {
    const key = study.created_datetime.slice(0, 10)
    if (!studiesHashed[key]) {
      studiesHashed[key] = [study]
      return
    }
    studiesHashed[key].push(study)
  })

  const dates = []
  let date = calendarStart

  while (date <= calendarEnd) {
    dates.push(
      <DateBox
        date={date}
        disabled={!isSameMonth(date, monthStart) ? true : false}
        setCurrentDate={setCurrentDate}
        key={date}
        studies={studiesHashed[format(date, 'yyyy-MM-dd')]}
      />,
    )
    date = addDays(date, 1)
  }

  return <Container>{dates}</Container>
}

const Container = styled.div`
  display: grid;

  width: 100%;

  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: minmax(130px, auto);
`

// while (date <= calendarEnd) {
//     const row = []
//     for (let i = 0; i < 7; i++) {
//       row.push(
//         <DateBox
//           className={`${date} ${
//             !isSameMonth(date, monthStart) ? 'disabled' : undefined
//           }`}
//         />,
//       )
//       date = addDays(date, 1)
//     }
//     rows.push(row)
//   }
//   return <Container>{rows}</Container>

// const monthStartDate = startOfMonth(currentMonth);
// const monthEnd = endOfMonth(monthStart);
// const calendarStart = startOfWeek(monthStart);
// const calendarEnd = endOfWeek(monthEnd);

// const rows = [];
// let days = [];
// let day = startDate;
// let formattedDate = '';

// while (day <= endDate) {
//     for (let i = 0; i < 7; i++) {
//         formattedDate = format(day, 'd');
//         const cloneDay = day;
//         days.push(
//             <div
//                 className={`col cell ${
//                     !isSameMonth(day, monthStart)
//                         ? 'disabled'
//                         : isSameDay(day, selectedDate)
//                         ? 'selected'
//                         : format(currentMonth, 'M') !== format(day, 'M')
//                         ? 'not-valid'
//                         : 'valid'
//                 }`}
//                 key={day}
//                 onClick={() => onDateClick(parse(cloneDay))}
//             >
//                 <span
//                     className={
//                         format(currentMonth, 'M') !== format(day, 'M')
//                             ? 'text not-valid'
//                             : ''
//                     }
//                 >
//                     {formattedDate}
//                 </span>
//             </div>,
//         );
//         day = addDays(day, 1);
//     }
//     rows.push(
//         <div className="row" key={day}>
//             {days}
//         </div>,
//     );
//     days = [];
// }
// return <div className="body">{rows}</div>;
// };
