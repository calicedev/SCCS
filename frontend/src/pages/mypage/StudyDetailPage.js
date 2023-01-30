import React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'libs/axios'
import api from 'constants/api'

import StudyDetailTopNavbar from 'components/mypage/StudyDetailTopNavbar'
import StudyDetailCodeList from 'components/mypage/StudyDetailCodeList'

export default function StudyDetailPage() {
  // dummy data
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
            code: '자바코드자바코드자바코드자바코드자바코드자바코드',
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
            code: '파이썬코드파이썬코드파이썬코드파이썬코드파이썬코드',
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
            code: 'print()print()print()print()print()print()',
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
            code: 'console.log()console.log()console.log()',
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

  // useState
  // studyId 안다고 가정
  const [studyId, setStudyId] = useState(0)
  // const [data, setData] = useState('') 샘플 데이터 들어오면 다시 주석 풀어줄거임
  const [problemId, setProblemId] = useState(0)

  // mount시 axios 요청으로 해당 study data 불러오기
  useEffect(() => {
    const [url, method] = api('studyHistoryDetail', { studyId })
    const config = { method }
    axios
      .request(url, config)
      .then((res) => {
        // setData(res.data)
      })
      .catch((err) => {
        alert('스터디 내역을 불러오지 못했습니다.')
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Flexbox>
      <StudyDetailTopNavbar
        data={data}
        problemId={problemId}
        setProblemId={setProblemId}
      />
      <Container>
        <img src={data.problems[problemId].content} alt="문제 사진임" />
        <StudyDetailCodeList
          data={data}
          problemId={problemId}
          setProblemId={setProblemId}
        />
      </Container>
    </Flexbox>
  )
}

const Flexbox = styled.div`
  display: flex;
  flex-direction: column;
`
const Container = styled.div`
  display: flex;
  flex: 1;
`
