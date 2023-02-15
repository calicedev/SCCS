import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { format } from 'date-fns'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { addMonths, subMonths } from 'date-fns'
import api from 'constants/api'
import axios from 'libs/axios'
import StudyList from 'components/mypage/StudyList'
import MemoizedCalendar from 'components/mypage/Calendar'
import MonthSelector from 'components/mypage/MonthSelector'
// import useUser from 'hooks/useUser'

export default function StudyCalendar() {
  // 리덕스 -> 유저 id 읽기
  const id = useSelector((state) => state.user.id)

  // useState
  const [currentDate, setCurrentDate] = useState(new Date())
  // 모달 관련 useState
  const [studies, setStudies] = useState([])
  const [isHovered, setIsHovered] = useState(false)
  const [modalLeft, setModalLeft] = useState(0)
  const [modalTop, setModalTop] = useState(0)
  const [modalDay, setModalDay] = useState(0)
  const [modalContent, setModalContent] = useState('')
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  // useMemo
  // 스터디내역(studies)를 달력 컴포넌트에 내려 줄 형태로 가곧
  // Result : { YYYY-MM-DD: 날짜박스에 표시할 컨텐츠 }
  const dateToStudies = useMemo(() => {
    const hashedStudies = {}
    studies.forEach((study) => {
      const date = new Date(study.studyroomCreateDatetime)
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

  // 현재날짜(currentDate)에 따라 스터디내역(studies) 데이터 서버 요청
  useEffect(() => {
    const year = format(currentDate, 'YYYY')
    const month = format(currentDate, 'MM')
    const [url, method] = api('studyHistory', { id: id, year, month })
    const config = { url, method }
    axios
      .request(config)
      .then((res) => {
        setStudies(res.data)
      })
      .catch((err) => {
        alert('스터디 내역을 불러오지 못했습니다.')
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, currentDate])

  // 날짜박스(DateBox) 클릭 시 현재 날짜 변경하는 함수
  // 달력(Calendar)컴포넌트의 잦은 재렌더링을 막기 위해, useCallback사용
  const changeMonth = useCallback((id) => {
    const element = document.getElementById(id)
    if (element.classList.contains('abled')) return
    setCurrentDate(new Date(id))
  }, [])

  // 날짜박스(DateBox) 호버 시 모달창 생성
  // 달력(Calendar)컴포넌트의 잦은 재렌더링을 막기 위해, useCallback사용
  // TroubleShooting : 함수를 저장한다는 것은 안의 변수 들도 고정!!
  const showModal = useCallback(
    (id) => {
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
      setModalContent(dateToStudies[id])
      setIsHovered(true)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [studies],
  )

  // 현재날짜(currentDate) 한 달 전으로 변경하는 함수
  const previousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  // 현재날짜(currentDate) 한 달 후로 변경하는 함수
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
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  padding: 1rem;
  @media screen and (min-width: 1024px) {
    padding: 3rem;
  }
`

// 평소에 모달 창은 hidden
// 모달 창의 위치를 호버된 Datebox로 이동시킨 뒤 visible
// 모달 창이 Datebox의 1.5배로 커지도록 설정
const Modal = styled.div`
  visibility: ${({ isHovered }) => (isHovered ? 'block' : 'hidden')};

  overflow-x: hidden;
  overflow-y: auto;

  position: absolute;
  left: ${({ modalLeft }) => modalLeft}px;
  top: ${({ modalTop }) => modalTop}px;
  z-index: 1;

  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;

  padding: 0.2rem;

  border: 1px solid gray;
  border-radius: 5px;

  background-color: ${({ theme }) => theme.dateBoxColor};

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
