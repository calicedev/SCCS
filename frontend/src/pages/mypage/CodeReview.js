import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Resizable } from 're-resizable'
import Textarea from 'components/study/Textarea'
import Button from 'components/common/Button'
import axios from 'libs/axios'
import api from 'constants/api'
import useUser from 'hooks/useUser'

export default function CodeReview({
  problem,
  studyroomId,
  
}) {
  const navigate = useNavigate()
  const { id } = useParams()
  // const id = useUser().id  
  const [problemUrl, setProblemUrl] = useState()

  useEffect(() => {
    const [url, method] = api('codeReview', { id })
    const config = { url, method }
    axios
      .request(config)
      .then((res) => {
        console.log(res.data)
        setProblemUrl(res.data)
        // console.log(study)
        console.log(id)
      })
      .catch((err) => {
        console.log(id)
        alert('스터디 내역을 불러오지 못했습니다.')
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [codingTestResult, setCodingTestResult] = useState([])
  const submitReview = () => {
    // let fileName = 'formFile.txt';
    const content = document.querySelector('textarea').value
    const file = new Blob([content], { type: 'text/plain' })
    const formData = new FormData()
    formData.append('formFile', file)
    // formData.append('memberId', id) 
    // formData.append('problemId', problemId)
    formData.append('languageId', 2)
    // formData.append('studyroomId', studyroomId)
    // console.log(onProblem)
    // 지금은 채점 서버에 1번 문제밖에 없어서 이렇게 하지만 더 들어오면 OnProblem으로 해야함 (2.10 민혁)
    // formData.append('problemId', 1)
    // 지금은 Java(2)로 고정하지만 나중에는 파이썬 or 파이썬+자바의 경우도 넣어줘야함 (2.10 민혁)

    const headers = { 'Content-Type': 'multipart/form-data' }

    // console.log(formData)
    const [url, method] = api('submitReview')
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






  return (
    <Main>
      <Problem>
        <Img src={problemUrl}></Img>
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
            <Textarea></Textarea>
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
            <EndBtn>
              <Button
                value="시험 종료"
                type="danger"
                size="small"
                onClick={() =>{
                  navigate(`/mypage/study/${studyroomId}`)
                }}
              ></Button>
            </EndBtn>
            <CompileBtn>
              {/* <Button
                value="테스트"
                type="gray"
                size="small"
                margin-right="5px"
                onClick={() => {
                  testCode('')
                }}
              ></Button> */}
              <Space></Space>
              <Button
                value="제출"
                size="small"
                onClick={() => {
                  submitReview('')
                }}
              ></Button>
            </CompileBtn>
          </Foot>
        </FlexColumn>
      </Resizable>
    </Main>
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
  height: 100vh;
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

const Btn = styled.button`
  font-size: 2.5rem;
  color: white;
  background-color: skyblue;
  round: 1;
  border: solid 2px grey;
  border-radius: 12px;
  padding: 5px;
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
