import React, { useState, useMemo, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import api from 'constants/api'
import axios from 'libs/axios'
import Loading from 'components/common/Loading'
import Pagination from 'components/mypage/Pagination'
import ProblemItem from 'components/mypage/ProblemItem'

const PROBLEM_PER_PAGE = 7 // 페이지 당 문제 수
const BUTTON_PER_PAGINATION = 5 // 페이네이션에 표시할 버튼 수

export default function ProblemList() {
  // 리액트 훅 관련 함수 정의
  const navigate = useNavigate()

  // 리덕스 -> 유저의 id 읽어오기
  const id = useSelector((state) => state.user.id)

  // useState
  const [problems, setProblems] = useState(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [startPagination, setStartPagination] = useState(0)

  // 컴포넌트 생성 시 문제내역(problems) 서버 요청
  useEffect(() => {
    const [url, method] = api('solvedProblem', { id })
    const config = { method }
    axios
      .request(url, config)
      .then((res) => {
        setProblems(res.data)
      })
      .catch((err) => {
        setProblems([])
        alert('문제 내역을 불러오지 못했습니다.')
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  // lastPage : 마지막 페이지의 인덱스 계산
  const lastPage = useMemo(() => {
    if (!problems) return
    if (problems.length % PROBLEM_PER_PAGE) {
      return parseInt(problems.length / PROBLEM_PER_PAGE)
    }
    return parseInt(problems.length / PROBLEM_PER_PAGE) - 1
  }, [problems])

  return (
    <Container>
      {problems ? (
        <ProblemsContainer>
          {problems
            .slice(
              currentPage * PROBLEM_PER_PAGE,
              currentPage * PROBLEM_PER_PAGE + PROBLEM_PER_PAGE,
            )
            .map((problem, i) => {
              return (
                <ProblemItem
                  problemName={problem.problemName}
                  answerRate={problem.answerRate}
                  submitDatetime={problem.date}
                  difficulty={problem.difficulty}
                  onClick={() => navigate(`/problem/${problem.problemID}`)}
                  key={i}
                />
              )
            })}
        </ProblemsContainer>
      ) : (
        <Loading height="20rem" />
      )}
      <Pagination
        numBtns={BUTTON_PER_PAGINATION}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        lastPage={lastPage}
        startPagination={startPagination}
        setStartPagination={setStartPagination}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;

  width: 80%;

  padding: 2rem 0.5rem 3rem;

  @media screen and (min-width: 1024px) {
    padding: 2rem 3rem 3rem;
  }
`
const ProblemsContainer = styled.div`
  margin: 2rem 0rem;
`
