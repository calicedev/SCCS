import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import ProblemItem from 'components/molecules/ProblemItem'
import Pagination from 'components/molecules/Pagination'
import Button from 'components/atoms/Button'

import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io'
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from 'react-icons/fa'

export default function ProblemList() {
  // 임시 데이터

  const problems = [
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

  const [page, setPage] = useState(0)
  const [page5, setPage5] = useState(0)
  // 문제의 개수 구하기
  const problemCount = problems.length
  // console.log(problemCount)

  // 문제의 개수를 토대로 마지막 페이지 번호 구하기 (10으로 나눈 몫 + 1)
  if (problemCount / 10 === parseInt(problemCount / 10)) {
    var lastPageNum = parseInt(problemCount / 10)
  } else {
    var lastPageNum = parseInt(problemCount / 10) + 1
  }

  // console.log(lastPageNum)

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

  const plusPage5 = () => {
    if (5 * page5 + 5 >= lastPageNum) return
    setPage5(page5 + 1)
  }
  const minusPage5 = () => {
    if (page5 === 0) return
    setPage5(page5 - 1)
  }

  console.log('page', page)
  console.log('page5', page5)

  return (
    <div>
      <h1>내가 푼 문제 목록</h1>
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
