import React from 'react'
import styled from 'styled-components'
import CodeInput from 'components/atoms/CodeInput'
import theme from 'constants/theme'

export default function SolveProblem() {
  return (
    <Main >
      <Problem>

        <Img src='https://xe1.xpressengine.com/files/attach/images/122/231/306/019/%EB%AC%B4%EC%84%9C%EC%9A%B4%EC%9D%B4%EC%95%BC%EA%B8%B01.jpg'></Img>
      </Problem>
      <FlexColumn>

        <CodingSection>coding
          <Gutter></Gutter>
          <CodeInput></CodeInput>
        </CodingSection>
        <Div>크기 조절</Div>
        <ResultSection>coding</ResultSection>
      </FlexColumn>
    </Main>
    )
  }
  
  const Main = styled.div`
  color : #1C6FBC;
  display: flex;
  width: 100%;
  height:100%;
  overflow: hidden;
  box-sizing: border-box;
  background-color: #263747;
`

const Problem = styled.div`
  height: 100vh;
  width: calc(40% - 12px);
  overflow-y: auto;
  overflow-x: hidden;
  display: block;
`

const Img = styled.img`
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto visible;
`
  
const CodingSection = styled.div`
  position: relative;
  padding-top: 1rem;  
  height: calc(100% - 54px);
  height: calc(60% - 7px);
  overflow-y: hidden;
  background-color: #263747;
  display: flex;
  flex-direction: column;
  border-bottom: 0.0625rem solid #172334;
  word-wrap: break-word;
  word-break: break-all;
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
const Gutter = styled.div`
  height: 520px;
  left: 0px;
  word-wrap: break-word;
  word-break: break-all;
  box-sizing: content-box;
  position: absolute;
  min-height: 100%;
  z-index: 3;
  display: block;
`

const Div = styled.div`
  display: flex;
  padding: 0 1rem 1rem 1rem;
  justify-content: space-between;
  border-bottom: 0.0625rem solid #172334;
`

const ResultSection = styled.div`
  display: block;
  
`
