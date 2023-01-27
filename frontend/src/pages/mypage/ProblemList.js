import React from 'react'
import styled from 'styled-components'
import { useState, useMemo, useEffect } from 'react'
import ProblemItem from 'components/atoms/ProblemItem'
import Pagination from 'components/molecules/Pagination'
import axios from 'libs/axios'
import api from 'apis/api'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PROBLEM_PER_PAGE = 7
const BUTTON_PER_PAGINATION = 5

export default function ProblemList() {
  // 리덕스 읽어오기
  const id = useSelector((state) => state.user.id)

  // useState
  const [problems, setProblems] = useState(ex_problems)
  const [currentPage, setCurrentPage] = useState(0)
  const [startPagination, setStartPagination] = useState(0)

  // use
  const navigate = { useNavigate }

  // mount시 axios 요청으로 problem 불러오기
  useEffect(() => {
    const [url, method] = api('solvedProblem', { id })
    const config = { method }
    axios
      .request(url, config)
      .then((res) => {
        setProblems(res.data)
      })
      .catch((err) => {
        alert('문제 내역을 불러오지 못했습니다.')
      })
  }, [])

  // 마지막 페이지 인덱스
  const lastPage = useMemo(() => {
    if (problems.length / PROBLEM_PER_PAGE) {
      return parseInt(problems.length / PROBLEM_PER_PAGE) - 1
    }
    return parseInt(problems.length / PROBLEM_PER_PAGE)
  }, [problems])

  // 다음 페이지네이션
  const nextPagination = () => {
    if (startPagination + 2 * BUTTON_PER_PAGINATION - 1 > lastPage) {
      setCurrentPage(lastPage - BUTTON_PER_PAGINATION + 1)
      setStartPagination(lastPage - BUTTON_PER_PAGINATION + 1)
      return
    }
    setCurrentPage(startPagination + BUTTON_PER_PAGINATION)
    setStartPagination(startPagination + BUTTON_PER_PAGINATION)
  }
  // 이전 페이지네이션
  const previousPagination = () => {
    if (startPagination - BUTTON_PER_PAGINATION <= 0) {
      setCurrentPage(0)
      setStartPagination(0)
      return
    }
    setCurrentPage(startPagination - BUTTON_PER_PAGINATION)
    setStartPagination(startPagination - BUTTON_PER_PAGINATION)
  }

  return (
    <div>
      <ProblemsContainer>
        {problems
          .slice(
            currentPage * PROBLEM_PER_PAGE,
            currentPage * PROBLEM_PER_PAGE + PROBLEM_PER_PAGE,
          )
          .map((problem, i) => {
            return (
              <ProblemItem
                problemName={problem.problem_name}
                answerRate={problem.answer_rate}
                submitDatetime={problem.submit_datetime}
                difficulty={problem.difficulty}
                onclick={() => navigate(`/problem/${problem.id}`)}
                key={i}
              />
            )
          })}
      </ProblemsContainer>
      <Pagination
        currentPage={currentPage}
        startPagination={startPagination}
        onClick={setCurrentPage}
        numBtns={BUTTON_PER_PAGINATION}
        onClickLeft={previousPagination}
        onClickRight={nextPagination}
        onClickDoubleLeft={() => {
          setCurrentPage(0)
          setStartPagination(0)
        }}
        onClickDoubleRight={() => {
          setCurrentPage(lastPage - BUTTON_PER_PAGINATION + 1)
          setStartPagination(lastPage - BUTTON_PER_PAGINATION + 1)
        }}
      />
    </div>
  )
}

const ProblemsContainer = styled.div`
  margin: 2rem 0rem;
`

const ex_problems = [
  {
    problem_name: '주사위1',
    answer_rate: '78.86%',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 0,
    language_id: 1,
  },
  {
    problem_name: '미로1',
    answer_rate: '21.16',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 2,
    language_id: 1,
  },
  {
    problem_name: '선물 배달1',
    answer_rate: '45.23',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 1,
    language_id: 1,
  },
  {
    problem_name: '주사위1',
    answer_rate: '78.86%',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 0,
    language_id: 1,
  },
  {
    problem_name: '미로1',
    answer_rate: '21.16',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 2,
    language_id: 1,
  },
  {
    problem_name: '선물 배달1',
    answer_rate: '45.23',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 1,
    language_id: 1,
  },
  {
    problem_name: '주사위1',
    answer_rate: '78.86%',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 0,
    language_id: 1,
  },
  {
    problem_name: '미로1',
    answer_rate: '21.16',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 2,
    language_id: 1,
  },
  {
    problem_name: '선물 배달1',
    answer_rate: '45.23',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 1,
    language_id: 1,
  },
  {
    problem_name: '10번째 문제',
    answer_rate: '45.23',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 1,
    language_id: 1,
  },
  {
    problem_name: '2페이지 주사위2',
    answer_rate: '78.86%',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 0,
    language_id: 1,
  },
  {
    problem_name: '미로1',
    answer_rate: '21.16',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 2,
    language_id: 1,
  },
  {
    problem_name: '선물 배달1',
    answer_rate: '45.23',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 1,
    language_id: 1,
  },
  {
    problem_name: '주사위1',
    answer_rate: '78.86%',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 0,
    language_id: 1,
  },
  {
    problem_name: '미로1',
    answer_rate: '21.16',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 2,
    language_id: 1,
  },
  {
    problem_name: '선물 배달1',
    answer_rate: '45.23',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 1,
    language_id: 1,
  },
  {
    problem_name: '주사위1',
    answer_rate: '78.86%',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 0,
    language_id: 1,
  },
  {
    problem_name: '미로1',
    answer_rate: '21.16',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 2,
    language_id: 1,
  },
  {
    problem_name: '선물 배달1',
    answer_rate: '45.23',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 1,
    language_id: 1,
  },
  {
    problem_name: '10번째 문제',
    answer_rate: '45.23',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 1,
    language_id: 1,
  },
  {
    problem_name: '3페이지 주사위2',
    answer_rate: '78.86%',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 0,
    language_id: 1,
  },
  {
    problem_name: '미로1',
    answer_rate: '21.16',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 2,
    language_id: 1,
  },
  {
    problem_name: '선물 배달1',
    answer_rate: '45.23',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 1,
    language_id: 1,
  },
  {
    problem_name: '주사위1',
    answer_rate: '78.86%',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 0,
    language_id: 1,
  },
  {
    problem_name: '미로1',
    answer_rate: '21.16',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 2,
    language_id: 1,
  },
  {
    problem_name: '선물 배달1',
    answer_rate: '45.23',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 1,
    language_id: 1,
  },
  {
    problem_name: '주사위1',
    answer_rate: '78.86%',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 0,
    language_id: 1,
  },
  {
    problem_name: '미로1',
    answer_rate: '21.16',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 2,
    language_id: 1,
  },
  {
    problem_name: '선물 배달1',
    answer_rate: '45.23',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 1,
    language_id: 1,
  },
  {
    problem_name: '10번째 문제',
    answer_rate: '45.23',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 1,
    language_id: 1,
  },
  {
    problem_name: '4페이지 주사위2',
    answer_rate: '78.86%',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 0,
    language_id: 1,
  },
  {
    problem_name: '미로1',
    answer_rate: '21.16',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 2,
    language_id: 1,
  },
  {
    problem_name: '선물 배달1',
    answer_rate: '45.23',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 1,
    language_id: 1,
  },
  {
    problem_name: '주사위1',
    answer_rate: '78.86%',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 0,
    language_id: 1,
  },
  {
    problem_name: '미로1',
    answer_rate: '21.16',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 2,
    language_id: 1,
  },
  {
    problem_name: '선물 배달1',
    answer_rate: '45.23',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 1,
    language_id: 1,
  },
  {
    problem_name: '주사위1',
    answer_rate: '78.86%',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 0,
    language_id: 1,
  },
  {
    problem_name: '미로1',
    answer_rate: '21.16',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 2,
    language_id: 1,
  },
  {
    problem_name: '선물 배달1',
    answer_rate: '45.23',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 1,
    language_id: 1,
  },
  {
    problem_name: '10번째 문제',
    answer_rate: '45.23',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 1,
    language_id: 1,
  },
  {
    problem_name: '5페이지 주사위2',
    answer_rate: '78.86%',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 0,
    language_id: 1,
  },
  {
    problem_name: '미로1',
    answer_rate: '21.16',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 2,
    language_id: 1,
  },
  {
    problem_name: '선물 배달1',
    answer_rate: '45.23',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 1,
    language_id: 1,
  },
  {
    problem_name: '주사위1',
    answer_rate: '78.86%',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 0,
    language_id: 1,
  },
  {
    problem_name: '미로1',
    answer_rate: '21.16',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 2,
    language_id: 1,
  },
  {
    problem_name: '선물 배달1',
    answer_rate: '45.23',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 1,
    language_id: 1,
  },
  {
    problem_name: '주사위1',
    answer_rate: '78.86%',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 0,
    language_id: 1,
  },
  {
    problem_name: '미로1',
    answer_rate: '21.16',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 2,
    language_id: 1,
  },
  {
    problem_name: '선물 배달1',
    answer_rate: '45.23',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 1,
    language_id: 1,
  },
  {
    problem_name: '10번째 문제',
    answer_rate: '45.23',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 1,
    language_id: 1,
  },
  {
    problem_name: '6페이지 주사위2',
    answer_rate: '78.86%',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 0,
    language_id: 1,
  },
  {
    problem_name: '미로1',
    answer_rate: '21.16',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 2,
    language_id: 1,
  },
  {
    problem_name: '선물 배달1',
    answer_rate: '45.23',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 1,
    language_id: 1,
  },
  {
    problem_name: '주사위1',
    answer_rate: '78.86%',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 0,
    language_id: 1,
  },
  {
    problem_name: '미로1',
    answer_rate: '21.16',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 2,
    language_id: 1,
  },
  {
    problem_name: '선물 배달1',
    answer_rate: '45.23',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 1,
    language_id: 1,
  },
  {
    problem_name: '주사위1',
    answer_rate: '78.86%',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 0,
    language_id: 1,
  },
  {
    problem_name: '미로1',
    answer_rate: '21.16',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 2,
    language_id: 1,
  },
  {
    problem_name: '선물 배달1',
    answer_rate: '45.23',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 1,
    language_id: 1,
  },
  {
    problem_name: '6페이지 10번째 문제',
    answer_rate: '45.23',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 1,
    language_id: 1,
  },
  {
    problem_name: '7페이지 주사위2',
    answer_rate: '78.86%',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 0,
    language_id: 1,
  },
  {
    problem_name: '미로1',
    answer_rate: '21.16',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 2,
    language_id: 1,
  },
  {
    problem_name: '선물 배달1',
    answer_rate: '45.23',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 1,
    language_id: 1,
  },
  {
    problem_name: '주사위1',
    answer_rate: '78.86%',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 0,
    language_id: 1,
  },
  {
    problem_name: '미로1',
    answer_rate: '21.16',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 2,
    language_id: 1,
  },
  {
    problem_name: '선물 배달1',
    answer_rate: '45.23',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 1,
    language_id: 1,
  },
  {
    problem_name: '주사위1',
    answer_rate: '78.86%',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 0,
    language_id: 1,
  },
  {
    problem_name: '미로1',
    answer_rate: '21.16',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 2,
    language_id: 1,
  },
  {
    problem_name: '선물 배달1',
    answer_rate: '45.23',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 1,
    language_id: 1,
  },
  {
    problem_name: '7페이지 10번째 문제',
    answer_rate: '45.23',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 1,
    language_id: 1,
  },
  {
    problem_name: '8페이지 주사위2',
    answer_rate: '78.86%',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 0,
    language_id: 1,
  },
  {
    problem_name: '미로1',
    answer_rate: '21.16',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 2,
    language_id: 1,
  },
  {
    problem_name: '선물 배달1',
    answer_rate: '45.23',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 1,
    language_id: 1,
  },
  {
    problem_name: '주사위1',
    answer_rate: '78.86%',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 0,
    language_id: 1,
  },
  {
    problem_name: '미로1',
    answer_rate: '21.16',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 2,
    language_id: 1,
  },
  {
    problem_name: '선물 배달1',
    answer_rate: '45.23',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 1,
    language_id: 1,
  },
  {
    problem_name: '주사위1',
    answer_rate: '78.86%',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 0,
    language_id: 1,
  },
  {
    problem_name: '미로1',
    answer_rate: '21.16',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 2,
    language_id: 1,
  },
  {
    problem_name: '선물 배달1',
    answer_rate: '45.23',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 1,
    language_id: 1,
  },
  {
    problem_name: '7페이지 10번째 문제',
    answer_rate: '45.23',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 1,
    language_id: 1,
  },
  {
    problem_name: '9페이지 주사위2',
    answer_rate: '78.86%',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 0,
    language_id: 1,
  },
  {
    problem_name: '미로1',
    answer_rate: '21.16',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 2,
    language_id: 1,
  },
  {
    problem_name: '선물 배달1',
    answer_rate: '45.23',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 1,
    language_id: 1,
  },
  {
    problem_name: '주사위1',
    answer_rate: '78.86%',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 0,
    language_id: 1,
  },
  {
    problem_name: '미로1',
    answer_rate: '21.16',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 2,
    language_id: 1,
  },
  {
    problem_name: '선물 배달1',
    answer_rate: '45.23',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 1,
    language_id: 1,
  },
  {
    problem_name: '주사위1',
    answer_rate: '78.86%',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 0,
    language_id: 1,
  },
  {
    problem_name: '미로1',
    answer_rate: '21.16',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 2,
    language_id: 1,
  },
  {
    problem_name: '선물 배달1',
    answer_rate: '45.23',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 1,
    language_id: 1,
  },
  {
    problem_name: '7페이지 10번째 문제',
    answer_rate: '45.23',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 1,
    language_id: 1,
  },
  {
    problem_name: '10페이지 주사위2',
    answer_rate: '78.86%',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 0,
    language_id: 1,
  },
  {
    problem_name: '미로1',
    answer_rate: '21.16',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 2,
    language_id: 1,
  },
  {
    problem_name: '선물 배달1',
    answer_rate: '45.23',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 1,
    language_id: 1,
  },
  {
    problem_name: '주사위1',
    answer_rate: '78.86%',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 0,
    language_id: 1,
  },
  {
    problem_name: '미로1',
    answer_rate: '21.16',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 2,
    language_id: 1,
  },
  {
    problem_name: '선물 배달1',
    answer_rate: '45.23',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 1,
    language_id: 1,
  },
  {
    problem_name: '주사위1',
    answer_rate: '78.86%',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 0,
    language_id: 1,
  },
  {
    problem_name: '미로1',
    answer_rate: '21.16',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 2,
    language_id: 1,
  },
  {
    problem_name: '선물 배달1',
    answer_rate: '45.23',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 1,
    language_id: 1,
  },
  {
    problem_name: '7페이지 10번째 문제',
    answer_rate: '45.23',
    submit_datetime: '2021-12-06 17:56:03',
    difficulty: 1,
    language_id: 1,
  },
]
