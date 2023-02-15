import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Resizable } from 're-resizable'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { useWindowHeight } from 'hooks/useWindowHeight'
import api from 'constants/api'
import axios from 'libs/axios'
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
  const windowHeight = useWindowHeight() // window의 innerHeight를 반환하는 커스텀 훅

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
        <Container>
          <FlexBox>
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
          </FlexBox>
          <FlexBox2>
            <ImageWrapper height={windowHeight - 120}>
              <ProblemImage src={problems[problemIdx].problemImageUrl} />
            </ImageWrapper>
            <Resizable
              defaultSize={{ width: '50%', height: '100%' }}
              minWidth={'20%'}
              maxWidth={'80%'}
              enable={{
                top: false,
                right: true,
                bottom: false,
                left: true,
                topRight: false,
                bottomRight: false,
                bottomLeft: false,
                topLeft: false,
              }}
            >
              <FlexColumn height={windowHeight - 120}>
                <CodeSection
                  value={code}
                  setValue={setCode}
                  languageIds={roomInfo.languageIds}
                  languageId={languageId}
                  setLanguageId={setLanguageId}
                />
                <Resizable
                  defaultSize={{ width: '100%', height: '40%' }}
                  minHeight={'20%'}
                  maxHeight={'80%'}
                  enable={{
                    top: true,
                    right: false,
                    bottom: false,
                    left: false,
                    topRight: false,
                    bottomRight: false,
                    bottomLeft: false,
                    topLeft: false,
                  }}
                >
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
                    onSubmitButton={onSubmitButton}
                    onTestButton={onTestButton}
                  />
                </Resizable>
              </FlexColumn>
            </Resizable>
          </FlexBox2>
        </Container>
      ) : (
        <Loading height="70vh" />
      )}
    </>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  height: 100%;

  padding: 1rem;
`
const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
`
const FlexBox2 = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5px;
`

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  height: ${({ height }) => height}px;
`
const ImageWrapper = styled.div`
  padding: 0.5rem;
  border-radius: 0.5rem;

  height: ${({ height }) => height}px;
  background-color: ${({ theme }) => theme.whiteColor};
`

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`
