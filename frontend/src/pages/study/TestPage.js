import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { Resizable } from 're-resizable'

// import Footer from 'components/study/Footer'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'libs/axios'
import api from 'constants/api'

import Button from 'components/common/Button'
import Textarea from 'components/study/Textarea'
import { algorithmPk, languagePk } from 'constants/pk'

export default function CodingTest({
  studyroomId,
  membersNickname,
  roomInfo,
  personnel,
  startStudy,
  id,
  nickname,
  dataForStudy,
  setDataForStudy,
}) {
  const [codingTestData, setCodingTestData] = useState({})

  // 남은 시간 표시하기 위한 state
  const [startTime, setStartTime] = useState(Date.now())
  const [currentTime, setCurrentTime] = useState(Date.now())
  const [timeLeft, setTimeLeft] = useState(7200000)

  // 문제 선택하기 위한 state
  const [onProblem, setOnProblem] = useState() // 현재 선택된 문제의 pk
  const [onProblemIdx, setOnProblemIdx] = useState(0) // 현재 선택된 버튼의 idx (이미지 표시하기 위함)
  const [problemArray, setProblemArray] = useState([]) // 문제 pk 리스트 ex) [7, 19]

  // 정보 저장해보자

  // 코딩테스트 페이지 입장 시 axios 요청
  useEffect(() => {
    const data = {
      id: studyroomId,
      memberIds: membersNickname,
    }
    const [url, method] = api('codingTest')
    const config = { url, method, data }
    console.log('방장이 보낸 정보 받아라', data)
    axios(config)
      .then((res) => {
        setCodingTestData(res.data)
        console.log(res.data.problems[0].id, res.data.problems[1].id)
        // 첫번째 문제현재 선택된 문제로 지정해서 제출 시에 넘어갈 수 있게 해줌
        setOnProblem(res.data.problems[0].id)
        setProblemArray([
          ...problemArray,
          res.data.problems[0].id,
          res.data.problems[1].id,
        ])
        setDataForStudy([
          ...dataForStudy,
          res.data.problems[0].id,
          res.data.problems[1].id,
        ])
      })
      .catch((err) => {})
  }, [])

  // 남은 시간 카운트 다운 useEffect
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(Date.now())
      setTimeLeft(7200000 + startTime - currentTime)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [startTime, currentTime])

  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  )
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)

  //---------------------------------------------------------------------------------------------------
  const [codingTestResult, setCodingTestResult] = useState([])
  const navigate = useNavigate()

  const testCode = useCallback(() => {
    // let fileName = 'formFile.txt';
    const content = document.querySelector('textarea').value
    const element = document.createElement('a')
    const file = new Blob([content], { type: 'text/plain' })
    const formData = new FormData()
    formData.append('formFile', file)
    formData.append('memberId', id)
    formData.append('studyroomId', studyroomId)
    console.log(onProblem)
    // 지금은 채점 서버에 1번 문제밖에 없어서 이렇게 하지만 더 들어오면 OnProblem으로 해야함 (2.10 민혁)
    // formData.append('problemId', 1)
    formData.append('problemId', onProblem)
    // 지금은 Java(2)로 고정하지만 나중에는 파이썬 or 파이썬+자바의 경우도 넣어줘야함 (2.10 민혁)
    formData.append('languageId', 2)

    const headers = { 'Content-Type': 'multipart/form-data' }
    const [url, method] = api('testCode')
    const config = { url, method, data: formData, headers }
    axios(config)
      .then((res) => {
        setCodingTestResult(res.data)
        // navigate('/')
      })
      .catch((err) => {})
    // element.href = URL.createObjectURL(file);
    // // element.download = fileName;
    // document.body.appendChild(element); // Required for this to work in FireFox
    element.click()
  }, [])

  const submitCode = () => {
    // let fileName = 'formFile.txt';
    const content = document.querySelector('textarea').value
    const file = new Blob([content], { type: 'text/plain' })
    const formData = new FormData()
    formData.append('formFile', file)
    formData.append('memberId', id)
    formData.append('studyroomId', studyroomId)
    console.log(onProblem)
    // 지금은 채점 서버에 1번 문제밖에 없어서 이렇게 하지만 더 들어오면 OnProblem으로 해야함 (2.10 민혁)
    // formData.append('problemId', 1)
    formData.append('problemId', onProblem)
    // 지금은 Java(2)로 고정하지만 나중에는 파이썬 or 파이썬+자바의 경우도 넣어줘야함 (2.10 민혁)
    formData.append('languageId', 2)

    const headers = { 'Content-Type': 'multipart/form-data' }

    // console.log(formData)
    const [url, method] = api('submitCode')
    const config = { url, method, data: formData, headers }
    axios(config)
      .then((res) => {
        // navigate('/')
        setCodingTestResult(res.data)
      })
      .catch((err) => {})
    // element.href = URL.createObjectURL(file);
    // // element.download = fileName;
    // document.body.appendChild(element); // Required for this to work in FireFox
    // element.click()
  }
  //---------------------------------------------------------------------------------------------------

  const changeProblem = (idx) => {
    // console.log(problemArray)
    setOnProblem(problemArray[idx])
    setOnProblemIdx(idx)
    // console.log(onProblem)
  }
  return (
    <>
      {codingTestData.title && (
        <>
          <TopNavBar>
            <Btn>
              {studyroomId}번방 {roomInfo.title}
            </Btn>
            {roomInfo.languageIds.map((languageId, idx) => {
              return <Btn key={idx}>{languagePk[languageId]}</Btn>
            })}

            {roomInfo.algoIds.map((algoId, idx) => {
              return <Btn key={idx}>#{algorithmPk[algoId]}</Btn>
            })}

            {['1번', '2번'].map((problem, idx) => {
              return (
                <Btn
                  onClick={() => {
                    changeProblem(idx)
                  }}
                  key={idx}
                >
                  {problem}
                </Btn>
              )
            })}
            <span>
              남은 시간: {hours}시간 {minutes}분 {seconds}초
            </span>
            <span> 현재 {personnel}명</span>
          </TopNavBar>

          <Main>
            {/* <h3>받은 첫 번째 문제 title : {codingTestData.problems[0].name}</h3> */}
            <Problem>
              <Img
                src={codingTestData.problems[onProblemIdx].problemImageUrl}
              ></Img>
            </Problem>
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
              <FlexColumn>
                <CodingSection>
                  <Changer>언어 선택</Changer>
                  <Textarea value={languagePk}></Textarea>
                </CodingSection>
                <Resizable
                  defaultSize={{ width: '100%', height: '37%' }}
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
                  <ResultSection>
                    {codingTestResult.map((result, idx) => {
                      if (idx !== 5) {
                        return <div key={idx}>{result.result}</div>
                      } else {
                        return (
                          <div key={idx}>
                            <div>메모리: {result.avgMemory}</div>
                            <div>실행시간: {result.avgRuntime}ms</div>
                            <div>
                              결과:
                              {result.isAnswer ? (
                                <span> Success</span>
                              ) : (
                                <span> Fail</span>
                              )}
                            </div>
                          </div>
                        )
                      }
                    })}
                  </ResultSection>
                </Resizable>
                <ColoredLine color="#4B91F1" />

                <Foot>
                  <EndBtn onClick={startStudy}>
                    <Button
                      value="시험 종료"
                      type="danger"
                      size="small"
                    ></Button>
                  </EndBtn>
                  <CompileBtn>
                    <Button
                      value="테스트"
                      type="gray"
                      size="small"
                      margin-right="5px"
                      onClick={() => {
                        testCode('')
                      }}
                    ></Button>
                    <Space></Space>
                    <Button
                      value="제출"
                      size="small"
                      onClick={() => {
                        submitCode('')
                      }}
                    ></Button>
                  </CompileBtn>
                </Foot>
              </FlexColumn>
            </Resizable>
          </Main>
        </>
      )}
    </>
  )
}

const Main = styled.div`
  color: #ffffff; // 폰트 색 바꾸려면 이거 바꿔야함
  display: flex;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #263747;
`
// const Head = styled.div`

// `
const Adjustment = styled.div`
  display: flex;
  flex-direction: column;
  height: 5%;
`

const Problem = styled.div`
  height: 100vh;
  width: calc(40% - 12px);
  overflow-y: auto;
  flex: 1;
`

const Img = styled.img`
  width: 100%;
`

const FlexColumn = styled.div`
  display: flex;
  height: 99vh;
  flex-direction: column;
  flex: 1;
  overflow: auto visible;
`

const CodingSection = styled.div`
  position: relative;
  padding-top: 1rem;
  height: calc(60% - 7px);
  overflow-y: hidden;
  background-color: #263747; // 코드 입력창 배경화면
  display: flex;
  flex-direction: column;
  border-bottom: 0.0625rem solid #172334;
  word-wrap: break-word;
  word-break: break-all;
  height: 100vh;
`
// const Gutter = styled.div`
//   width: 48px;
//   word-wrap: break-word;
//   word-break: break-all;
//   box-sizing: content-box;
//   white-space: normal;
//   height: 100%;
//   display: inline-block;
//   vertical-align: top;
//   margin-bottom: -50px;
// `
const Changer = styled.div`
  dispaly: flex;
`

const ResultSection = styled.div`
  display: block;
`

// #98ABB

const TopNavBar = styled.div`
  background: ${({ theme }) => theme.codingTestBackgroundColor};
`
const Btn = styled.button`
  font-size: 1.5rem;
  color: white;
  background-color: ${({ theme }) => theme.codingTestButtonColor};
  round: 1;
  border: solid 2px grey;
  border-radius: 12px;
  padding: 6px;
  margin: 10px;
`
const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 5,
    }}
  />
)

const Foot = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0rem 0rem;
  padding: 0rem 1rem;
`

const EndBtn = styled.div`
  display: flex;
`

const CompileBtn = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 1rem;
`
const Space = styled.div`
  width: 1.5rem;
  height: auto;
  display: inline-block;
`
