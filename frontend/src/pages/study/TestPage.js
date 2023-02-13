import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { useOutletContext } from 'react-router-dom'
import { Resizable } from 're-resizable'

// import Footer from 'components/study/Footer'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'libs/axios'
import api from 'constants/api'

import Button from 'components/common/Button'
import Textarea from 'components/study/Textarea'
import { algorithmPk, languagePk } from 'constants/pk'
import useInterval from 'hooks/useInterval'
import OutlineButton from 'components/common/OutlineButton'
import ProblemImage from 'components/common/ProblemImage'
import CodeSection from 'components/study/CodeSection'

import RoomInfo from 'components/study/RoomInfo'
import ResultSection from 'components/study/ResultSection'
import Loading from 'components/common/Loading'

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
    connected,
    members,
    setMembers,
    problems,
    setProblems,
    message,
    setMessage,
    chatList,
    sendChat,
    disconnect,
  } = useOutletContext()

  const navigate = useNavigate()

  const [subscription, setSubscription] = useState(null)

  const [problemIdx, setProblemIdx] = useState(0) // 현재 선택된 문제의 인덱스
  const [finished, setFinished] = useState(false)
  const [finishedList, setFinishedList] = useState([])
  const [languageId, setLanguageId] = useState(roomInfo.languageIds[0])

  const [code, setCode] = useState(initialCode[languageId])
  //const [code, setCode] = useState('')

  // 남은 시간 표시하기 위한 state
  const [timer, setTimer] = useState(2 * 60 * 60)

  const [testResult, setTestResult] = useState(null)

  // 코딩테스트 페이지 입장 시 axios 요청
  useEffect(() => {
    const data = {
      id: studyroomId,
      nickname: user.nickname,
      memberIds: members,
    }
    const [url, method] = api('codingTest')
    const config = { url, method, data }
    axios(config)
      .then((res) => {
        setProblems(res.data.problems)
      })
      .catch(() => {})
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
  }, [finishedList])

  // 웹 소켓 send: 시험 종료
  const sendFinished = () => {
    stomp.send(
      '/pub/studyroom',
      {},
      JSON.stringify({
        status: 'study',
        studyroomId: studyroomId,
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
  }, [])

  // 타이머
  useInterval(() => setTimer((timer) => timer - 1), 1000)

  useEffect(() => {
    if (timer <= 0) {
      navigate(`/room/${studyroomId}/study`)
    }
  }, [timer])

  // 코드 제출
  const submitCode = (type) => {
    const apiKey = type === 'submit' ? 'submitCode' : 'testCode'
    const codeString = code
    const formData = new FormData()
    formData.append('formFile', new Blob([codeString], { type: 'text/plain' }))
    formData.append('memberId', user.id)
    formData.append('studyroomId', studyroomId)
    formData.append('problemId', problems[problemIdx].id)
    formData.append('languageId', languageId)
    // formData.append('problemId', 16)
    // formData.append('languageId', 2)
    const headers = { 'Content-Type': 'multipart/form-data' }
    const [url, method] = api(apiKey)
    const config = { url, method, data: formData, headers }
    axios(config)
      .then((res) => {
        setTestResult(res.data)
      })
      .catch(() => {})
  }

  const [windowHeight, setWindowHeight] = useState(0)

  useEffect(() => {
    const updateMaxHeight = () => {
      setWindowHeight(window.innerHeight)
    }

    window.addEventListener('resize', updateMaxHeight)
    updateMaxHeight()

    return () => {
      window.removeEventListener('resize', updateMaxHeight)
    }
  }, [])

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
            <StyledDiv>
              {parseInt(timer / (60 * 60))}:{parseInt((timer / 60) % 60)}:
              {parseInt(timer % 60)}
            </StyledDiv>
          </FlexBox>
          <FlexBox2>
            <ImageWrapper windowHeight={windowHeight}>
              <ProblemImage imgUrl={problems[problemIdx].problemImageUrl} />
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
              <FlexColumn windowHeight={windowHeight}>
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
  height: ${({ windowHeight }) => `calc(${windowHeight}px - 130px)`};
`
const ImageWrapper = styled.div`
  padding: 0.5rem;
  border-radius: 0.5rem;
  height: ${({ windowHeight }) => `calc(${windowHeight}px - 130px)`};
  background-color: ${({ theme }) => theme.whiteColor};
`

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 0.2rem 0.5rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  font-weight: bold;
  background-color: ${({ theme }) => theme.studyBgColor};
`

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`
