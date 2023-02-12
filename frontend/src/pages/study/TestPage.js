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

export default function TestPage({
  user,
  studyroomId,
  roomInfo,
  stomp,
  connected,
  memebers,
  setMembers,
  problems,
  setProblems,
  message,
  setMessage,
  chatList,
  sendChat,
  disconnect,
}) {
  // const [codingTestData, setCodingTestData] = useState({})
  // const [finishedList, setFinishedList] = useState([])

  // // 남은 시간 표시하기 위한 state
  // const [startTime, setStartTime] = useState(Date.now())
  // const [currentTime, setCurrentTime] = useState(Date.now())
  // const [timeLeft, setTimeLeft] = useState(7200000)

  // // 문제 선택하기 위한 state
  // const [onProblem, setOnProblem] = useState() // 현재 선택된 문제의 pk
  // const [onProblemIdx, setOnProblemIdx] = useState(0) // 현재 선택된 버튼의 idx (이미지 표시하기 위함)
  // const [problemArray, setProblemArray] = useState([]) // 문제 pk 리스트 ex) [7, 19]

  // const startStudy = () => {
  //   stomp.send(
  //     '/pub/studyroom',
  //     {},
  //     JSON.stringify({
  //       studyroomId: studyroomId,
  //       nickname: nickname,
  //       status: 'study',
  //       personnel: personnel,
  //       readyForStudyArray: [...readyForStudyArray, nickname],
  //     }),
  //   )
  // }
  // // 정보 저장해보자

  // stompClient.subscribe('/sub/studyroom/' + studyroomId, function (chatDto) {
  //   const content = JSON.parse(chatDto.body)
  //   if (content.status === 'study') {
  //     // 시험 종료 버튼 전부 누르면 스터디 페이지로 이동

  //     // useState의 setReadyForStudyArray은 비동기적으로 처리되므로 그냥 push를 해주면 동기적으로 처리되는 것 같음
  //     // push를 했을 때 실제로 readyForStudyArray가 setState하는 것처럼 바뀜.
  //     // console.log 찍어봐도 같음.
  //     readyForStudyArray.push(content.nickname)
  //     console.log(
  //       '바깥 state : ',
  //       readyForStudyArray,
  //       'stomp 내부 : ',
  //       content.readyForStudyArray,
  //     )
  //     console.log(
  //       '현재인원:',
  //       content.personnel,
  //       '배열길이 state:',
  //       readyForStudyArray.length,
  //       '배열길이 stomp 내부:',
  //       content.readyForStudyArray.length,
  //     )
  //     if (content.personnel === content.readyForStudyArray.length) {
  //       setCodingTest(false)
  //       setStudy(true)
  //     }
  //   }
  // })

  // // 코딩테스트 페이지 입장 시 axios 요청
  // useEffect(() => {
  //   const data = {
  //     id: studyroomId,
  //     memberIds: membersNickname,
  //   }
  //   const [url, method] = api('codingTest')
  //   const config = { url, method, data }
  //   console.log('방장이 보낸 정보 받아라', data)
  //   axios(config)
  //     .then((res) => {
  //       setCodingTestData(res.data)
  //       console.log(res.data.problems[0].id, res.data.problems[1].id)
  //       setProblemArray([
  //         ...problemArray,
  //         res.data.problems[0].id,
  //         res.data.problems[1].id,
  //       ])
  //       setDataForStudy([
  //         ...dataForStudy,
  //         res.data.problems[0].id,
  //         res.data.problems[1].id,
  //       ])
  //       // 0번 인덱스의 문제 pk를 onProblem에 넣어줌
  //       setOnProblem(problemArray[0])
  //     })
  //     .catch((err) => {})
  // }, [])

  // // 남은 시간 카운트 다운 useEffect
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setCurrentTime(Date.now())
  //     setTimeLeft(7200000 + startTime - currentTime)
  //   }, 1000)

  //   return () => clearInterval(intervalId)
  // }, [startTime, currentTime])

  // const hours = Math.floor(
  //   (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  // )
  // const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
  // const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)

  // //---------------------------------------------------------------------------------------------------
  // const [codingTestResult, setCodingTestResult] = useState([])
  // const navigate = useNavigate()

  // const testCode = useCallback(() => {
  //   // let fileName = 'formFile.txt';
  //   const content = document.querySelector('textarea').value
  //   const element = document.createElement('a')
  //   const file = new Blob([content], { type: 'text/plain' })
  //   const formData = new FormData()
  //   formData.append('formFile', file)
  //   formData.append('memberId', id)
  //   formData.append('studyroomId', studyroomId)
  //   console.log(onProblem)
  //   // 지금은 채점 서버에 1번 문제밖에 없어서 이렇게 하지만 더 들어오면 OnProblem으로 해야함 (2.10 민혁)
  //   formData.append('problemId', 1)
  //   // formData.append('problemId', onProblem)
  //   // 지금은 Java(2)로 고정하지만 나중에는 파이썬 or 파이썬+자바의 경우도 넣어줘야함 (2.10 민혁)
  //   formData.append('languageId', 2)

  //   const headers = { 'Content-Type': 'multipart/form-data' }
  //   const [url, method] = api('testCode')
  //   const config = { url, method, data: formData, headers }
  //   axios(config)
  //     .then((res) => {
  //       setCodingTestResult(res.data)
  //       // navigate('/')
  //     })
  //     .catch((err) => {})
  //   // element.href = URL.createObjectURL(file);
  //   // // element.download = fileName;
  //   // document.body.appendChild(element); // Required for this to work in FireFox
  //   element.click()
  // }, [])

  // const submitCode = () => {
  //   // let fileName = 'formFile.txt';
  //   const content = document.querySelector('textarea').value
  //   const element = document.createElement('a')
  //   const file = new Blob([content], { type: 'text/plain' })
  //   const formData = new FormData()
  //   formData.append('formFile', file)
  //   formData.append('memberId', id)
  //   formData.append('studyroomId', studyroomId)
  //   console.log(onProblem)
  //   // 지금은 채점 서버에 1번 문제밖에 없어서 이렇게 하지만 더 들어오면 OnProblem으로 해야함 (2.10 민혁)
  //   formData.append('problemId', 1)
  //   // formData.append('problemId', onProblem)
  //   // 지금은 Java(2)로 고정하지만 나중에는 파이썬 or 파이썬+자바의 경우도 넣어줘야함 (2.10 민혁)
  //   formData.append('languageId', 2)

  //   const headers = { 'Content-Type': 'multipart/form-data' }

  //   // console.log(formData)
  //   const [url, method] = api('submitCode')
  //   const config = { url, method, data: formData, headers }
  //   axios(config)
  //     .then((res) => {
  //       // navigate('/')
  //       setCodingTestResult(res.data)
  //     })
  //     .catch((err) => {})
  //   // element.href = URL.createObjectURL(file);
  //   // // element.download = fileName;
  //   // document.body.appendChild(element); // Required for this to work in FireFox
  //   // element.click()
  // }
  // //---------------------------------------------------------------------------------------------------

  // const changeProblem = (idx) => {
  //   // console.log(problemArray)
  //   setOnProblem(problemArray[idx])
  //   setOnProblemIdx(idx)
  //   // console.log(onProblem)
  // }
  return (
    <>
      <p>{roomInfo.id}</p>
      <p>{roomInfo.title}</p>
      <p>{roomInfo.personeel}</p>
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
