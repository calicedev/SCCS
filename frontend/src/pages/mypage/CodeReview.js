import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Resizable } from 're-resizable'
import Textarea from 'components/study/Textarea'
import Button from 'components/common/Button'
import axios from 'libs/axios'
import api from 'constants/api'


export default function CodeReview() {
  const { id } = useParams()
  const [problemId, setProblemId] = useState()

  useEffect(() => {
    const [url, method] = api('studyHistoryDetail', { id })
    const config = { url, method }
    axios
      .request(config)
      .then((res) => {
        console.log(res.data)
        setProblemId(res.data)
        // console.log(study)
      })
      .catch((err) => {
        alert('스터디 내역을 불러오지 못했습니다.')
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])









  return (
    <>
      {/* {problemId.studyroomwithProblems && ( */}
        <>
          <Main>
            <Problem>
              <Img src={problemId.studyroomwithProblems.problemFolder}></Img>
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
                  {/* <ResultSection>
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
                  </ResultSection> */}
                </Resizable>
                <ColoredLine color="#4B91F1" />

                <Foot>
                  <EndBtn>
                    <Button
                      value="시험 종료"
                      type="danger"
                      size="small"
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
                    ></Button>
                    <Space></Space>
                    <Button
                      value="제출"
                      size="small"
                      onClick={() => {
                        submitCode('')
                      }} */}
                    {/* ></Button> */}
                  </CompileBtn>
                </Foot>
              </FlexColumn>
            </Resizable>
          </Main>
        </>
      {/* )}  */}
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
