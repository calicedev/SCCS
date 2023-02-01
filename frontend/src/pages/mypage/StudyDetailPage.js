import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'libs/axios'
import api from 'constants/api'

import StudyDetailTopNavbar from 'components/mypage/StudyDetailTopNavbar'
import StudyDetailCodeList from 'components/mypage/StudyDetailCodeList'

export default function StudyDetailPage() {
  // useState
  // studyId 안다고 가정
  // const [studyId, setStudyId] = useState(0)
  const { id } = useParams()
  // const [data, setData] = useState({}) 샘플 데이터 들어오면 다시 주석 풀어줄거임
  const [problemId, setProblemId] = useState(0)
  const [study, setStudy] = useState({})
  // mount시 axios 요청으로 해당 study data 불러오기

  useEffect(() => {
    const [url, method] = api('studyHistoryDetail', { id })
    const config = { url, method }
    axios
      .request(config)
      .then((res) => {
        console.log(res.data)
        setStudy(res.data)
        // console.log(study)
      })
      .catch((err) => {
        alert('스터디 내역을 불러오지 못했습니다.')
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Flexbox>
      <h1>스터디 디테일 페이지입니다!</h1>
      {study.studyroomWithProblems && (
        <StudyDetailTopNavbar
          study={study}
          problemId={problemId}
          setProblemId={setProblemId}
        />
      )}

      <Container>
        {/* <img src={study.problems[problemId].content} alt="문제 사진임" /> */}
        {/* <StudyDetailCodeList
          study={study}
          problemId={problemId}
          setProblemId={setProblemId}
        /> */}
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
