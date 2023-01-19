import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import ProblemItem from 'components/molecules/ProblemItem'
import Pagination from 'components/molecules/Pagination'

export default function ProblemList() {
  // 임시 데이터

  const [page, setPage] = useState(0)
  const pageArray = [1, 2, 3, 4, 5]
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
      problem_name: '주사위2',
      answer_rate: '78.86%',
      submit_datetime: '2021-12-06 17:56:03',
      difficulty: 0,
      language_id: 1,
    },
    {
      problem_name: '미로2',
      answer_rate: '21.16',
      submit_datetime: '2021-12-06 17:56:03',
      difficulty: 2,
      language_id: 1,
    },
    {
      problem_name: '선물 배달2',
      answer_rate: '45.23',
      submit_datetime: '2021-12-06 17:56:03',
      difficulty: 1,
      language_id: 1,
    },
    {
      problem_name: '주사위3',
      answer_rate: '78.86%',
      submit_datetime: '2021-12-06 17:56:03',
      difficulty: 0,
      language_id: 1,
    },
    {
      problem_name: '미로3',
      answer_rate: '21.16',
      submit_datetime: '2021-12-06 17:56:03',
      difficulty: 2,
      language_id: 1,
    },
    {
      problem_name: '선물 배달3',
      answer_rate: '45.23',
      submit_datetime: '2021-12-06 17:56:03',
      difficulty: 1,
      language_id: 1,
    },
  ]

  return (
    <div>
      <h1>내가 푼 문제 목록</h1>
      {problems.slice(page * 3, page * 3 + 3).map((p, i) => {
        return <ProblemItem problem={p} key={i} />
      })}
      <PageContainer>
        {pageArray.map((page, idx) => {
          return (
            <Pagination page={page} setPage={setPage} key={idx} idx={idx} />
          )
        })}
      </PageContainer>
    </div>
  )
}

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
`
