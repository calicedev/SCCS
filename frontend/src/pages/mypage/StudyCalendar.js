import React, { useState } from 'react'
import { addMonths, subMonths } from 'date-fns'
import Calendar from 'components/molecules/Calendar'
import DateSelector from 'components/molecules/DateSelector'
import styled from 'styled-components'
import { format } from 'date-fns'
import Study from 'components/atoms/StudyItem'

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

export default function StudyCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())

  // 모달 관련 변수
  const [isHovered, setIsHovered] = useState(false)
  const [modalLeft, setModalLeft] = useState(0)
  const [modalTop, setModalTop] = useState(0)
  const [modalDay, setModalDay] = useState(0)
  const [modalContent, setModalContent] = useState('')
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  // 스터디 내역을 날짜 별로 분류
  const hashedStudies = {}
  studies.forEach((study) => {
    const date = new Date(study.created_datetime)
    const key = format(date, 'yyyy-MM-dd')
    if (!hashedStudies[key]) {
      hashedStudies[key] = [study]
      return
    }
    hashedStudies[key].push(study)
  })
  const dateToStudies = Object.fromEntries(
    Object.entries(hashedStudies).map(([key, studies]) => [
      key,
      <Study studies={studies} />,
    ]),
  )

  const previousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  const changeMonth = (e) => {
    setCurrentDate(e.target.date)
  }

  const showModal = (date) => {
    const element = document.getElementById(date)
    const scrollX = window.scrollX
    const scrollY = window.scrollY
    setModalLeft(scrollX + element.getBoundingClientRect().left)
    setModalTop(scrollY + element.getBoundingClientRect().top)
    setWidth(element.clientWidth)
    setHeight(element.clientHeight)
    setModalDay(date.slice(-2))
    setModalContent(dateToStudies[element.id])
    setIsHovered(true)
  }

  return (
    <Container>
      <Modal
        isHovered={isHovered}
        modalLeft={modalLeft}
        modalTop={modalTop}
        width={width}
        height={height}
        onMouseLeave={() => setIsHovered(false)}
      >
        {modalDay}
        {modalContent}
      </Modal>
      <DateSelector
        currentDate={currentDate}
        onChange={(e) => setCurrentDate(new Date(e.target.value))}
        onClickPrevious={previousMonth}
        onClickNext={nextMonth}
      />
      <Calendar
        currentDate={currentDate}
        onClickDateBox={changeMonth}
        onMouseEnterDateBox={showModal}
        contents={dateToStudies}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Modal = styled.div`
  position: absolute;
  z-index: 1;
  overflow: hidden;
  border: 1px solid red;
  background-color: white;
  overflow: hidden;
  white-space: nowrap;
  left: ${({ modalLeft }) => modalLeft}px;
  top: ${({ modalTop }) => modalTop}px;
  visibility: ${({ isHovered }) => (isHovered ? 'visible' : 'hidden')};
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;

  &:hover {
    animation: 0.5s ease-in-out forwards showModal;
  }

  @keyframes showModal {
    0% {
      width: ${({ width }) => width}px;
      height: ${({ height }) => height}px;
    }
    100% {
      width: ${({ width }) => width * 1.5}px;
      height: ${({ height }) => height * 1.5}px;
    }
  }
`
