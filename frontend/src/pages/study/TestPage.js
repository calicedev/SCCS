import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useOutletContext, useNavigate } from 'react-router-dom'
import api from 'constants/api'
import axios from 'libs/axios'
import Layout from 'layouts/TestPageLayout'
import Timer from 'components/study/Timer'
import Button from 'components/common/Button'
import Loading from 'components/common/Loading'
import RoomInfo from 'components/study/RoomInfo'
import CodeSection from 'components/study/CodeSection'
import ProblemImage from 'components/common/ProblemImage'
import ResultSection from 'components/study/ResultSection'

const initialCode = {
  1: `class Solution:
  print("sccs")
`,
  2: `class Solution{
  public static void main(String[] args) {
    System.out.println("sccs");
  }
}
`,
}

export default function TestPage() {
  const {
    user,
    studyroomId,
    roomInfo,
    stomp,
    members,
    problems,
    setProblems,
    setIsMicOn,
  } = useOutletContext()

  // 리액트 훅 관련 함수 선언
  const navigate = useNavigate()

  // useState
  const [subscription, setSubscription] = useState(null)

  const [problemIdx, setProblemIdx] = useState(0) // 현재 선택된 문제의 인덱스

  const [languageId, setLanguageId] = useState(roomInfo.languageIds[0])
  const [code, setCode] = useState(initialCode[languageId]) // langaugaeId 다음에 선언
  const [testResult, setTestResult] = useState(null)

  const [finished, setFinished] = useState(false)
  const [finishedList, setFinishedList] = useState([])

  const [onSubmitButton, setOnSubmitButoon] = useState(false)
  const [onTestButton, setOnTestButoon] = useState(false)

  // 코딩테스트 페이지 입장 시 마이크 뮤트
  useEffect(() => {
    setIsMicOn(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 코딩테스트 페이지 입장 시 axios 요청
  useEffect(() => {
    const data = {
      id: studyroomId,
      memberId: user.id,
      memberIds: members,
    }
    const [url, method] = api('codingTest')
    const config = { url, method, data }
    axios(config)
      .then((res) => {
        setProblems(res.data.problems)
      })
      .catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 문제 번호나, 언어 변경 시 초기화
  useEffect(() => {
    setCode(initialCode[languageId])
    setTestResult(null)
  }, [problemIdx, languageId])

  // 모두 시험을 종료하면 테스트 페이지로 이동
  useEffect(() => {
    if (finishedList.length === members.length) {
      navigate(`/room/${studyroomId}/study`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finishedList])

  // 웹 소켓 send: 시험 종료
  const sendFinished = () => {
    stomp.send(
      '/pub/studyroom',
      {},
      JSON.stringify({
        status: 'study',
        studyroomId: studyroomId,
        id: user.id,
        nickname: user.nickname,
      }),
    )
    setFinished(true)
  }

  // 웹 소켓 subscribe
  useEffect(() => {
    setSubscription(
      stomp.subscribe('/sub/studyroom/' + studyroomId, (chatDto) => {
        const content = JSON.parse(chatDto.body)
        if (content.status === 'study') {
          setFinishedList((finishedList) => [...finishedList, chatDto.nickname])
        }
      }),
    )
    return () => {
      subscription && subscription.unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 코드 제출 함수. type = 'test' or 'submit'
  const submitCode = (type) => {
    const apiKey = type === 'submit' ? 'submitCode' : 'testCode'
    if (type === 'submit') {
      setOnTestButoon(false)
      setOnSubmitButoon(true)
    } else {
      setOnSubmitButoon(false)
      setOnTestButoon(true)
    }
    const codeString = code
    const formData = new FormData()
    formData.append('formFile', new Blob([codeString], { type: 'text/plain' }))
    formData.append('memberId', user.id)
    formData.append('studyroomId', studyroomId)
    formData.append('problemId', problems[problemIdx].id)
    formData.append('languageId', languageId)
    const headers = { 'Content-Type': 'multipart/form-data' }
    const [url, method] = api(apiKey)
    const config = { url, method, data: formData, headers }
    axios(config)
      .then((res) => {
        setTestResult(res.data)
      })
      .catch(() => {})
  }

  return (
    <>
      {problems ? (
        <Layout>
          {/* HeaderPane */}
          <>
            <ButtonWrapper>
              <RoomInfo
                id={roomInfo.id}
                title={roomInfo.title}
                languageIds={roomInfo.languageIds}
                algoIds={roomInfo.algoIds}
                hostNickname={roomInfo.hostNickname}
                personnel={roomInfo.personnel}
              />
              {[...Array(problems.length).keys()].map((idx) => {
                return (
                  <Button
                    key={`${idx}-problem`}
                    size="small"
                    value={idx + 1}
                    type={problemIdx === idx ? 'primary' : 'secondary'}
                    onClick={() => setProblemIdx(idx)}
                  />
                )
              })}
            </ButtonWrapper>
            <Timer
              sec={2 * 60 * 60}
              onZero={() => {
                navigate(`/room/${studyroomId}/study`)
              }}
            />
          </>
          {/* LeftPane */}
          <ProblemImage src={problems[problemIdx].problemImageUrl} />
          {/* RightUpPane */}
          <CodeSection
            value={code}
            setValue={setCode}
            languageIds={roomInfo.languageIds}
            languageId={languageId}
            setLanguageId={setLanguageId}
          />
          {/* RightDownPane */}
          <ResultSection
            results={testResult}
            isFinished={finished}
            finish={sendFinished}
            test={() => {
              submitCode('test')
            }}
            submit={() => {
              submitCode('submit')
            }}
          />
        </Layout>
      ) : (
        <Loading height="90vh" />
      )}
    </>
  )
}

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`
