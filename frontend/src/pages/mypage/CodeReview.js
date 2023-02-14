import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Resizable } from 're-resizable'
import Textarea from 'components/study/Textarea'
import Button from 'components/common/Button'
import axios from 'libs/axios'
import api from 'constants/api'
import { useSelector } from 'react-redux'

import ButtonDropdown from 'components/common/ButtonDropdown'
import CustomedTextarea from 'components/mypage/CustomedTextarea'
// import useUser from 'hooks/useUser'
import { languagePk } from 'constants/pk'

export default function CodeReview() {
  const navigate = useNavigate()
  // const { id } = useParams()
  const memberId = useSelector((state) => state.user.id)
  const { problemId } = useParams()

  const [problemUrl, setProblemUrl] = useState(null)
  const [submissionList, setSubmissionList] = useState([])

  // 2.14 민혁 추가
  const [code, setCode] = useState('') // ㅇㅇ번째 코드 버튼을 클릭되었을 때 code에 지난 제출 코드가 담김
  const [languageId, setLanguageId] = useState(1)

  useEffect(() => {
    const [url, method] = api('solveProblem', { memberId, problemId })
    const config = { url, method }
    axios
      .request(config)
      .then((res) => {
        setProblemUrl(res.data.problemUrl)
        console.log(res.data)
        setSubmissionList(res.data.submissionInfo)
      })
      .catch((err) => {
        alert('스터디 내역을 불러오지 못했습니다.')
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [codingTestResult, setCodingTestResult] = useState([])
  const submitCode = () => {
    const content = document.querySelector('textarea').value
    const file = new Blob([content], { type: 'text/plain' })
    const formData = new FormData()
    formData.append('formFile', file)
    formData.append('memberId', memberId)
    formData.append('problemId', problemId)
    formData.append('languageId', languageId) // 2.14 민혁 추가

    const headers = { 'Content-Type': 'multipart/form-data' }

    // console.log(formData)
    const [url, method] = api('submitCode')
    const config = { url, method, data: formData, headers }
    axios(config)
      .then((res) => {
        // navigate('/')
        setCodingTestResult(res.data)
        console.log(res.data)
      })
      .catch((err) => {})
    // element.href = URL.createObjectURL(file);
    // // element.download = fileName;
    // document.body.appendChild(element); // Required for this to work in FireFox
    // element.click()
  }

  // 제출한 코드 목록 (2.13 민혁 추가)
  const codesObject = useMemo(() => {
    const tempObject = {}
    submissionList.forEach((code, idx) => {
      tempObject[`${idx}`] = `${idx + 1}번째 제출코드` //code.submissionFile
    })

    return tempObject
  }, [submissionList])

  // 해당 idx클릭하면 idx에 담긴 url 주소의 문제를 불러오기
  const fetchData = async (idx) => {
    fetch(submissionList[idx[0]].submissionFile)
      .then((res) => {
        // console.log('res', res)
        return res.text()
      })
      .then((code) => {
        // console.log('code', code)
        setCode(code)
      })
  }

  // 언어선택 드롭다운을 통해 언어 idx 바꾸기
  const changeLanguageId = (idx) => {
    console.log(idx[0])
    setLanguageId(idx[0])
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
          <Flex>
            <ButtonDropdown
              title="언어 선택"
              size="small"
              type="primary"
              options={{ 1: 'Python', 2: 'Java' }}
              onClick={(e) => changeLanguageId(e.target.id.split('-'))}
            />
            <ButtonDropdown
              title="코드 선택"
              size="small"
              type="primary"
              options={codesObject}
              onClick={(e) => fetchData(e.target.id.split('-'))}
            />
          </Flex>
          <CodingSection>
            <CustomedTextarea lastCode={code}></CustomedTextarea>
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
              {codingTestResult.resultList && (
                <>
                  {codingTestResult.resultList.map((problem, index) => (
                    <p
                      className={problem.result ? 'pass' : 'error'}
                      key={`${index}-problem-result`}
                    >
                      {index + 1}번{') '} {problem.message} : {problem.memory}kb
                      {' / '}
                      {problem.runtime}ms
                    </p>
                  ))}
                  {codingTestResult.isAnswer ? (
                    <p className="pass">
                      <br />
                      통과했습니다~~~!!!
                      <br /> 런타임 평균: {codingTestResult.avgRuntime}ms 메모리
                      평균: {codingTestResult.avgMemory}kb
                    </p>
                  ) : (
                    <p className="error">
                      <br />
                      틀렸습니다ㅜㅜ
                      <br /> 런타임 평균: {codingTestResult.avgRuntime}ms 메모리
                      평균: {codingTestResult.avgMemory}kb
                    </p>
                  )}
                </>
              )}
            </ResultSection>
          </Resizable>
          <ColoredLine color="#4B91F1" />

          <Foot>
            <EndBtn>
              <Button
                value="시험 종료"
                type="danger"
                size="small"
                onClick={() => {
                  navigate(`/mypage/study/`)
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
                  submitCode('')
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

const Flex = styled.div`
  display: flex;
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

