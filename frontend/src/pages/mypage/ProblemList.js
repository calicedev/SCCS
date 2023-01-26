import React from 'react'
import styled from 'styled-components'
import { useState, useMemo } from 'react'
import ProblemItem from 'components/atoms/ProblemItem'
import Pagination from 'components/molecules/Pagination'
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from 'react-icons/fa'

const PROBLEM_PER_PAGE = 10
const BUTTON_PER_PAGINATION = 5

export default function ProblemList() {
  const [problems, setProblems] = useState(ex_problems)
  const [page, setPage] = useState(0)
  const [startPagination, setStartPagination] = useState(0)

  // 마지막 페이지 인덱스
  const lastPage = useMemo(() => {
    if (problems.length / PROBLEM_PER_PAGE) {
      return parseInt(problems.length / PROBLEM_PER_PAGE) - 1
    }
    return parseInt(problems.length / PROBLEM_PER_PAGE)
  }, [problems])

  // page수가 담긴 array 만들기 (파이썬의 range랑 같은 개념)
  const pageArray = []
  for (let i = 1; i < lastPageNum + 1; ++i) {
    pageArray.push(i)
  }

  // 5페이지 단위가 몇개인지 변수에 저장
  if (lastPageNum / 5 === parseInt(lastPageNum / 5)) {
    var pageCount5 = parseInt(lastPageNum / 5)
  } else {
    var pageCount5 = parseInt(lastPageNum / 5) + 1
  }

  // console.log(pageCount5)

  // 5페이지 단위 개수가 담긴 array 만들기
  const page5Array = []
  for (let i = 0; i < pageCount5; ++i) {
    page5Array.push(i)
  }

  const nextPagination = () => {
    if (startPagination + BUTTON_PER_PAGINATION > lastPage) return
    setStartPagination(startPagination + BUTTON_PER_PAGINATION)
  }
  const previousPagination = () => {
    if (startPagination - BUTTON_PER_PAGINATION <= 0) return
    setStartPagination(0)
  }

  console.log('page', page)
  console.log('page5', page5)

  return (
    <div>
      {problems.slice(page * 10, page * 10 + 10).map((p, i) => {
        return <ProblemItem problem={p} key={i} />
      })}
      <PageContainer>
        <FaAngleDoubleLeft
          onClick={() => {
            setPage(0)
            setPage5(0)
          }}
        />
        <FaAngleLeft onClick={minusPage5} />
        {pageArray.slice(page5 * 5, page5 * 5 + 5).map((page, idx) => {
          return (
            <Pagination
              page={page}
              setPage={setPage}
              key={idx}
              idx={page5 * 5 + idx}
            />
          )
        })}
        <FaAngleRight onClick={plusPage5} />
        <FaAngleDoubleRight
          onClick={() => {
            setPage(lastPageNum - 1)
            setPage5(pageCount5 - 1)
          }}
        />
      </PageContainer>
    </div>
  )
}

const PageContainer = styled.div`
  text-align: center;
  font-size: 3rem;
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
