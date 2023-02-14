import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import RoomInfo from './RoomInfo'


export default function Announcement(props) {

  const [roomInfo, SetRoomInfo] = useState(props)
  console.log()
  console.log(roomInfo)
  console.log(props.roomInfo.algoIds)
  useEffect(() => {
    if (props.roomInfo.languageIds === 1){
      
    }


  })
  return (
    <StyledDiv>
    <h1>안내사항</h1>
    <Hr></Hr>
    <Body>
      <h4>사전 테스트 체험 페이지입니다. 아래 안내사항은 본 테스트를 기준으로 작성되었으니 유의 바랍니다.</h4>
      <br></br>
      <br></br>
      <h3>사전 테스트 체험</h3>
      <h4>방 인원들이 모두 우측 상단의 READY 버튼을 누르면, 방장이 테스트를 시작할 수 있습니다.</h4>
      <br></br>
      <br></br>
      <h4>코딩 테스트 화면에서</h4>
      <h4>테스트 버튼은 작성한 코드에 test case를 적용한 결과를 나타냅니다.</h4>
      <h4>제출 버튼은 작성한 코드를 서버에 제출합니다.</h4>
      <br></br>
      <br></br>
      <h4>테스트를 종료하고 싶을 경우 좌측 하단의 Finish 버튼을 눌러 테스트를 종료할 수 있습니다.</h4>
      <h4>방의 모든 인원드링 테스트를 종료한 경우 남은 시간에 관계없이 스터디 화면으로 넘어갑니다.</h4>
      <h3>테스트 시간                                                      테스트 문항</h3>
      <h4>120분                                                           5문제</h4>
      <h3>사용 언어                                                        문제 유형</h3>
      <h3>{props.roomInfo.algoIds}</h3>
      <h3>{props.roomInfo.languageIds}</h3>

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
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.studyBgColor};
`

const Hr = styled.hr`
  border: 0;
  width: 90%;
  align: left;
  height: 2px;
  background: #BD5CCD;
}
`

const Body = styled.div`
  text-align: left;
`