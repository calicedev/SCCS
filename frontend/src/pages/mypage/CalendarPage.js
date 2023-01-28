import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { addMonths, subMonths } from 'date-fns'
import MemoizedCalendar from 'components/mypage/Calendar'
import MonthSelector from 'components/mypage/MonthSelector'
import styled from 'styled-components'
import { format } from 'date-fns'
import StudyList from 'components/mypage/StudyList'
import axios from 'libs/axios'
import api from 'apis/api'
import { useSelector } from 'react-redux'

export default function StudyCalendar() {
  // 리덕스 -> 유저 id 읽기
  const id = useSelector((state) => state.user.id)

  // useState
  const [currentDate, setCurrentDate] = useState(new Date())
  // // 모달 관련 useState
  const [studies, setStudies] = useState(ex_studies)
  const [isHovered, setIsHovered] = useState(false)
  const [modalLeft, setModalLeft] = useState(0)
  const [modalTop, setModalTop] = useState(0)
  const [modalDay, setModalDay] = useState(0)
  const [modalContent, setModalContent] = useState('')
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  // useMemo
  // // studies 변경 시 Calendar에 prop해 줄 dateToStudies 오브젝트 생성
  // // { YYYY-MM-DD: 날짜박스에 표시할 컨텐츠 }
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
        <StudyList studies={studies} />,
      ]),
    )
  }, [studies])

  // useEffect
  // // currentDate에 따라 studies 데이터 서버 요청
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate])

  // useCallback
  // 달력(Calendar)컴포넌트의 잦은 재렌더링을 막기 위해, useCallback사용
  // // DateBox 클릭 시 날짜 변경
  const changeMonth = useCallback((id) => {
    const element = document.getElementById(id)
    if (element.classList.contains('abled')) return
    setCurrentDate(new Date(id))
  }, [])

  // // DateBox 호버 시 모달창 생성
  const showModal = useCallback((id) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // currentDate 한 달 전으로 변경
  const previousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  // currentDate 한 달 후로 변경
  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
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
      <MemoizedCalendar
        currentDate={currentDate}
        onClickDateBox={changeMonth}
        onMouseEnterDateBox={showModal}
        contents={dateToStudies}
      />
    </Container>
  )
}

const Container = styled.div`
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  padding: 3rem 3rem;
`

// 평소에 모달 창은 hidden
// 모달 창의 위치를 호버된 Datebox로 이동시킨 뒤 visible
// 모달 창이 Datebox의 1.5배로 커지도록 설정
const Modal = styled.div`
  visibility: ${({ isHovered }) => (isHovered ? 'visible' : 'hidden')};

  overflow-x: hidden;
  overflow-y: auto;

  position: absolute;
  left: ${({ modalLeft }) => modalLeft}px;
  top: ${({ modalTop }) => modalTop}px;
  z-index: 1;

  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;

  border: 1px solid gray;
  border-radius: 5px;

  background-color: white;

  color: #000000;
  white-space: nowrap;

  &::-webkit-scrollbar {
    width: 10px;
  }

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
