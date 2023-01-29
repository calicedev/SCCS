import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import axios from 'libs/axios'
import api from 'apis/api'

import StudyDetailTopNavbar from 'components/mypage/StudyDetailTopNavbar'
import StudyDetailCodeList from 'components/mypage/StudyDetailCodeList'
// import StudyDetailTopNavbar from './../../components/mypage/StudyDetailTopNavbar';

// const [url, method] = api('studyHistoryDetail', { id })

export default function StudyDetailPage() {
  const data = {
    id: 1, // 스터디 id
    title: '커피 내기 SSAFY8기 (A301)',
    created_datetime: '2023-01-17 17:18:53',
    problems: [
      {
        id: 1, // 스터디 방 안에서 문제 번호 id
        title: '미로찾기',
        // 문제 img url이 들어갈 곳
        content:
          'https://img.danawa.com/prod_img/500000/390/489/img/14489390_1.jpg?shrink=330:330&_v=20210616110125',
        codes: [
          {
            solved_problem_id: 1, // 내가 제출한 코드 자체의 pk값
            code: '자바코드자바코드자바코드자바코드자바코드자바코드자바코드자바코드자바코드자바코드자바코드자바코드자바코드자바코드자바코드자바코드자바코드자바코드자바코드자바코드자바코드자바코드자바코드자바코드자바코드자바코드',
            runtime: '232ms',
            memory: '246KB',
            result: 'PASS',
            submit_datetime: '2023-01-28',
            problem_id: 234, // 실제 문제의 pk값
            member_id: 'protein monster',
            language_id: 1,
          },
          {
            solved_problem_id: 2, // 내가 제출한 코드 자체의 pk값
            code: '파이썬코드파이썬코드파이썬코드파이썬코드파이썬코드파이썬코드파이썬코드파이썬코드파이썬코드파이썬코드파이썬코드파이썬코드파이썬코드파이썬코드파이썬코드파이썬코드파이썬코드파이썬코드파이썬코드파이썬코드파이썬코드파이썬코드파이썬코드파이썬코드파이썬코드', // 문제 img url이 들어갈 곳
            runtime: '232ms',
            memory: '246KB',
            result: 'PASS',
            submit_datetime: '2023-01-28',
            problem_id: 234, // 실제 문제의 pk값
            member_id: 'python king',
            language_id: 1,
          },
        ],
      },
      {
        id: 2,
        title: '프로틴 괴물 찾기',
        content:
          'https://www.hsuco.or.kr/sports/File/Download/79b8474ed11e47c9c7bc3b6b3e7af76d',
        codes: [
          {
            solved_problem_id: 1,
            code: '파이썬코드파이썬코드파이썬코드파이썬코드파이썬코드파이썬코드파이썬코드파이썬코드파이썬코드파이썬코드파이썬코드파이썬코드파이썬코드파이썬코드파이썬코드파이썬코드파이썬코드파이썬코드파이썬코드파이썬코드파이썬코드파이썬코드파이썬코드파이썬코드파이썬코드파이썬코드파이썬코드',
            runtime: '232ms',
            memory: '246KB',
            result: 'PASS',
            submit_datetime: '2023-01-28',
            problem_id: 234,
            member_id: 'protein monster',
            language_id: 1,
          },
          {
            solved_problem_id: 2,
            code: '자바코드자바코드자바코드자바코드자바코드자바코드자바코드자바코드자바코드자바코드자바코드자바코드자바코드자바코드자바코드자바코드자바코드자바코드자바코드자바코드자바코드자바코드자바코드자바코드자바코드자바코드자바코드',
            runtime: '232ms',
            memory: '246KB',
            result: 'FAIL',
            submit_datetime: '2023-01-28',
            problem_id: 234,
            member_id: 'python king',
            language_id: 1,
          },
        ],
      },
    ],
    members: [{ id: 'protein monster' }, { id: 'python king' }],
  }

  const [problemId, setProblemId] = useState(0)

  return (
    <>
      <StudyDetailTopNavbar data={data} />
      <Container>
        <img src={data.problems[problemId].content} alt="문제 사진임" />
        <StudyDetailCodeList
          data={data}
          problemId={problemId}
          setProblemId={setProblemId}
        />
      </Container>
    </>
  )
}

const Container = styled.div`
  display: flex;
`
