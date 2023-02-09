import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'libs/axios'
import api from 'constants/api'

import StudyDetailTopNavbar from 'components/mypage/StudyDetailTopNavbar'
import StudyDetailCodeList from 'components/mypage/StudyDetailCodeList'

export default function StudyDetailPage() {
  // 스터디의 id (duseParams로 자동으로 가져와줌)
  const { id } = useParams()
  // 버튼 클릭시 해당 문제로 이동하기 위해 problemId 사용
  const [problemId, setProblemId] = useState(0)
  // 해당 스터디에 대한 정보를 back에서 가져와서 저장하기 위해 사용
  const [study, setStudy] = useState({})

  // mount시 axios 요청으로 해당 study data 불러오기
  useEffect(() => {
    const [url, method] = api('studyHistoryDetail', { id })
    const config = { url, method }
    axios
      .request(config)
      .then((res) => {
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
        {/* 객체는 항상 참이므로 studyroomId가 들어왔을 때 img를 보여줌 (안 그러면 undefined 뜸) */}
        {study.studyroomId && (
          <img
            src={study.studyroomWithProblems[problemId].problemFolder}
            alt="문제 사진임"
          />
        )}

        <StudyDetailCodeList
          study={study}
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
