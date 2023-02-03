import React from 'react'
import styled from 'styled-components'
import { Resizable } from 're-resizable'
import Textarea from 'components/study/Textarea'
import Footer from 'components/study/Footer'

export default function SolveProblem() {
  return (
    <Main>
      <Problem>
        <Img src="https://img3.cyberskyshop.com:8443/web/upload/prm/20200331161339247021/20200401084535615044.png"></Img>
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
        <Changer>언어 선택</Changer>
        <CodingSection>
          코딩창
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
        {/* <Div>크기 조절</Div> */}
          <ResultSection>결과창</ResultSection>
        </Resizable>
        <ColoredLine color="#4B91F1" />
        <Footer></Footer>
        </FlexColumn>
      </Resizable>
        
    </Main>
  )
}


const Main = styled.div`
  color:  #ffffff; // 폰트 색 바꾸려면 이거 바꿔야함
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
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




const ColoredLine = ({ color }) => (
  <hr
      style={{
          color: color,
          backgroundColor: color,
          height: 5
      }}
  />
);

