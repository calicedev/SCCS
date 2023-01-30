import React from 'react'
import styled from 'styled-components'
import { Resizable } from 're-resizable'
// import jQuery from 'jquery';

export default function SolveProblem() {
  return (
    <Main>
      <Problem>
        <Img src="https://ncache.ilbe.com/files/attach/new/20150224/14357299/2334320564/5366146341/59f715829f6e1ec432f420df9a9a9792.jpeg"></Img>
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
          <Gutter>언어 선택</Gutter>
          <CodingSection>
            코딩창
            <Textarea></Textarea>
          </CodingSection>
          <Resizable
            defaultSize={{ width: '100%', height: '50%' }}
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
            {/* <Div>크기 조절</Div> */}
            <ResultSection>결과창</ResultSection>
          </Resizable>
        </FlexColumn>
      </Resizable>
    </Main>
  )
}

const Main = styled.div`
  color: #1c6fbc;
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  background-color: #263747;
`

const Problem = styled.div`
  height: 100%;
  width: calc(40% - 12px);
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
`

const Img = styled.img`
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
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
  background-color: #263747;
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

const ResultSection = styled.div`
  display: block;
`

const Textarea = styled.textarea`
  width: 100%;
  height: 100%;
  resize: none;
  background: #34495e;
  color: #fff;
  font-size: 20px;
`
