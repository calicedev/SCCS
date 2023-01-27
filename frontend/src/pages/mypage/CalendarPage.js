import React, { useState, useEffect, useMemo } from 'react'
import { addMonths, subMonths } from 'date-fns'
import Calendar from 'components/mypage/Calendar'
import MonthSelector from 'components/mypage/MonthSelector'
import styled from 'styled-components'
import { format } from 'date-fns'
import Study from 'components/mypage/StudyItem'
import axios from 'libs/axios'
import api from 'apis/api'
import { useSelector } from 'react-redux'

export default function StudyCalendar() {
  // 리덕스 읽어오기
  const id = useSelector((state) => state.user.id)

  // useState
  const [currentDate, setCurrentDate] = useState(new Date())
  // 모달 관련 변수
  const [studies, setStudies] = useState(ex_studies)
  const [isHovered, setIsHovered] = useState(false)
  const [modalLeft, setModalLeft] = useState(0)
  const [modalTop, setModalTop] = useState(0)
  const [modalDay, setModalDay] = useState(0)
  const [modalContent, setModalContent] = useState('')
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  // mount 시 혹은 날짜 변경 시 studies 불러오기
  useEffect(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const [url, method] = api('studyHistory', { id, year, month })
    const config = { method }
    axios
      .request(url, config)
      .then((res) => {
        setStudies(res.data)
      })
      .catch((err) => {
        alert('스터디 내역을 불러오지 못했습니다.')
      })
  }, [currentDate])

  // useMemo로 studies가 바뀌면 실행. 가능할지 모르겠음
  const dateToStudies = useMemo(() => {
    const hashedStudies = {}
    studies.forEach((study) => {
      const date = new Date(study.created_datetime)
      const key = format(date, 'YYYY-MM-DD')
      if (!hashedStudies[key]) {
        hashedStudies[key] = [study]
        return
      }
      hashedStudies[key].push(study)
    })
    return Object.fromEntries(
      Object.entries(hashedStudies).map(([key, studies]) => [
        key,
        <Study studies={studies} />,
      ]),
    )
  }, [studies])

  const previousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  const changeMonth = (id) => {
    const element = document.getElementById(id)
    if (element.classList.contains('abled')) return
    setCurrentDate(id)
  }

  const showModal = (id) => {
    const element = document.getElementById(id)
    if (element.classList.contains('disabled')) {
      return
    }
    const date = element.id
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
      <MonthSelector
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
  overflow: hidden;
  position: absolute;
  z-index: 1;
  border: 1px solid red;
  border-radius: 5px;
  background-color: white;
  overflow-x: hidden;
  overflow-y: auto;
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

const ex_studies = [
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
