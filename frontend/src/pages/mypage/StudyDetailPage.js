import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'libs/axios'
import api from 'constants/api'

import StudyDetailHeader from 'components/mypage/StudyDetailHeader'
import StudyDetailCodeList from 'components/mypage/StudyDetailCodeList'
import Loading from 'components/common/Loading'

export default function StudyDetailPage() {
  // url 파라미터로 가져오 스터디의 pk
  const { id } = useParams()

  // useState
  const [studyTitle, setStudyTitle] = useState(null)
  const [problems, setProblems] = useState(null) // 스터디에서 푼 문제 배열
  const [problemIdx, setProblemIdx] = useState(0) // 현재 보여지는 문제의 인덱스
  const [studyroomId, setStudyroomId] = useState(id)
  // 마운트시 axios 요청으로 스터디 데이터(study) 요청
  useEffect(() => {
    const [url, method] = api('studyDetail', { id })
    const config = { url, method }
    axios
      .request(config)
      .then((res) => {
        console.log(res.data) 
        setStudyTitle(res.data.studyroomTitle)
        // console.log(res.data.studyroomTitle)
        setProblems(res.data.studyroomWithProblems)
        // console.log(problemIdx)
        // console.log(problems)
        // console.log(problemId)
        // console.log(res.data.studyroomWithProblems)
      })
      .catch((err) => {
        setStudyTitle('')
        setProblems([])
        alert('스터디 내역을 불러오지 못했습니다.')
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      {problems ? (
        <>
          <StudyDetailHeader
            studyTitle={studyTitle}
            numProblems={problems.length}
            problemIdx={problemIdx}
            setProblemIdx={setProblemIdx}
            problemId={problems[problemIdx].problemId}
            studyroomId={setStudyroomId}
          />
          <Flexbox>
            <Pane>
              <Wrapper>
                <StyledImg
                  src={problems[problemIdx].problemFolder}
                  alt="문제이미지"
                />
              </Wrapper>
            </Pane>
            <Pane>
              <StudyDetailCodeList
                codeList={problems[problemIdx].participantWithCode}
              />
            </Pane>
          </Flexbox>
        </>
      ) : (
        <Loading height="20rem" />
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  padding: 3rem;
`
const Flexbox = styled.div`
  display: flex;
  gap: 20px;

  width: 100%;
`
const Pane = styled.div`
  flex: 1;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.lightGrayColor};
  border-radius: 1rem;
`
// 스크롤바를 안쪽으로 옮기기 위해서 추가한 Wrapper
const Wrapper = styled.div`
  overflow-y: auto;
  height: 60vh;
`

const StyledImg = styled.img`
  width: 100%;
`
