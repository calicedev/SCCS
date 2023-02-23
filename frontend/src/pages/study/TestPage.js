import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { setReduxProblems } from 'redux/roomSlice'
import { setReduxFinished } from 'redux/roomSlice'
import api from 'constants/api'
import { languagePkInitialCode } from 'constants/pk'
import axios from 'libs/axios'
import Layout from 'layouts/TestPageLayout'
import Timer from 'components/study/Timer'
import Button from 'components/common/Button'
import Loading from 'components/common/Loading'
import RoomInfo from 'components/study/RoomInfo'
import CodeSection from 'components/study/CodeSection'
import ProblemImage from 'components/common/ProblemImage'
import ResultSection from 'components/study/ResultSection'

export default function TestPage() {
  const {
    user,
    studyroomId,
    roomInfo,
    stomp,
    memberList,
    problems,
    setProblems,
    setIsMicOn,
    finishedObject,
    setFinishedObject,
    finishedList,
  } = useOutletContext()

  // 리덕스 -> 기존 방 정보 읽어오기
  const room = useSelector((state) => state.room)

  // 리액트 훅 관련 함수 선언
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // useState
  // const [subscription, setSubscription] = useState(null)

  const [problemIdx, setProblemIdx] = useState(0) // 현재 선택된 문제의 인덱스

  const [languageId, setLanguageId] = useState(roomInfo.languageIds[0])
  const [code, setCode] = useState(languagePkInitialCode[languageId]) // langaugaeId 다음에 선언
  const [testResult, setTestResult] = useState(null)

  const [finished, setFinished] = useState(
    room.finished ? room.finished : false,
  )

  // 테스트, 제출 버튼 클릭 관련 state (true는 submit / false는 test)
  const [isSubmit, setIsSubmit] = useState(false)

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
      memberIds: memberList,
    }
    const [url, method] = api('codingTest')
    const config = { url, method, data }
    axios(config)
      .then((res) => {
        setProblems(res.data.problems)
        dispatch(setReduxProblems(res.data.problems))
      })
      .catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 문제 번호나, 언어 변경 시 초기화
  useEffect(() => {
    setCode(languagePkInitialCode[languageId])
    setTestResult(null)
  }, [problemIdx, languageId])

  // 모두 시험을 종료하면 테스트 페이지로 이동
  useEffect(() => {
    if (finishedList.length === memberList.length) {
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
    dispatch(setReduxFinished(true))
  }

  // 웹 소켓 subscribe
  // useEffect(() => {
  //   setSubscription(
  //     stomp.subscribe('/sub/studyroom/' + studyroomId, (chatDto) => {
  //       const content = JSON.parse(chatDto.body)
  //       if (content.status === 'study') {
  //         setFinishedObject((finishedObject) => {
  //           const newFinishedObject = { ...finishedObject }
  //           newFinishedObject[content.nickname] = true
  //           dispatch(setReduxFinishedObject(newFinishedObject))
  //           return newFinishedObject
  //         })
  //       }
  //     }),
  //   )
  //   return () => {
  //     subscription && subscription.unsubscribe()
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // 코드 제출 함수. type = 'test' or 'submit'
  const submitCode = (type) => {
    let apiKey = ''
    if (type === 'submit') {
      apiKey = 'submitCode'
      setIsSubmit(true)
    } else {
      apiKey = 'testCode'
      setIsSubmit(false)
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
            isSubmit={isSubmit}
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
