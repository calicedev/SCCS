import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'  

export default function Announcement(props) {

  // const [roomInfo, SetRoomInfo] = useState(props)
  const [algoList, setAlgoList] = useState(props.roomInfo.algoIds)
  const [languageList, setLanguageList] = useState(props.roomInfo.languageIds)

  console.log()
  // console.log(roomInfo)
  console.log(props.roomInfo.algoIds.length)
  console.log(props.roomInfo.languageIds.length)
  // useEffect(() => {
  //   if (props.roomInfo.languageIds === 1){
      
  //   }


  // })
  return (
    <StyledDiv>
    <h2>안내사항</h2>
    <Hr></Hr>
    <Body>
      <h4>사전 테스트 체험 페이지입니다. 아래 안내사항은 본 테스트를 기준으로 작성되었으니 유의 바랍니다.</h4>
      <br></br>
      
      <h3>사전 테스트 체험</h3>
      <h4>방 인원들이 모두 우측 상단의 READY 버튼을 누르면, 방장이 테스트를 시작할 수 있습니다.</h4>
      <br></br>
      
      <h4>코딩 테스트 화면에서</h4>
      <h4>테스트 버튼은 작성한 코드에 test case를 적용한 결과를 나타냅니다.</h4>
      <h4>제출 버튼은 작성한 코드를 서버에 제출합니다.</h4>
      <br></br>
      
      <h4>테스트를 종료하고 싶을 경우 좌측 하단의 Finish 버튼을 눌러 테스트를 종료할 수 있습니다.</h4>
      <h4>방의 모든 인원드링 테스트를 종료한 경우 남은 시간에 관계없이 스터디 화면으로 넘어갑니다.</h4>
      <br></br>
      
      
      <Div>
        <h3>테스트 시간</h3>                                                      
        <h3>테스트 문항</h3>
      </Div>
      <Div>
        <h4>120분</h4>
        <h4>2문제</h4>
      </Div>
      
      <br></br>
      <Div>
        <h3>사용 언어</h3>
        <h3>문제 유형</h3>
      </Div>
      <Div>
        <h3>
        <Div>
            {props.roomInfo.algoIds.map((algo, index) => {
              if (algo===0){
                return <div>#랜덤</div>
              } if (algo===1){
                return <div>#기초</div>
              } if (algo===2){
                return <div>#탐색</div>
              } if (algo===3){
                return <div>#이분탐색</div>
              } if (algo===4){
                return <div>#자료구조</div>
              } if (algo===5){
                return <div>#완전탐색</div>
              } if (algo===6){
                return <div>#BFS/DFS</div>
              } if (algo===1){
                return <div>#완전탐색</div>
              }
            })}
          </Div>
        </h3>
        <h3>
          <Div>
            {props.roomInfo.languageIds.map((language, index) => {
              if (language===1){
                return <div>#python</div>
              } else{
                return <div>#Java</div>
              }
            })}
          </Div>
        </h3>
      </Div>
      

    </Body>
  </StyledDiv>
  )
}
const StyledDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  overflow: hidden;
  padding: 1rem;

  min-width: 70rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.studyBgColor};
`

const Hr = styled.hr`
  border: 0;
  width: 90%;
  align: left;
  height: 10px;
  background: #BD5CCD;
}
`

const Body = styled.div`
  text-align: left;
`


const Div = styled.div`
  display: flex;
  justify-content: space-between;
`