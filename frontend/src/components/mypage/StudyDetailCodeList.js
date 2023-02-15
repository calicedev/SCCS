import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import StudyDetailCodeItem from './StudyDetailCodeItem'

/*
코드 리스트를 "아이디, 언어, 실행시간, 메모리, 결과" 표 형태로 띄우는 컴포넌트
표의 개별 데이터는 StudyDetailCodeItem 컴포넌트 사용

codeList =[
  {
    submissionId 제출 내역의 pk
    submissionMemberId: 유저 아이디
    submissionLanguageId: 언어 pk
    submissionMemory: 메모리 사용
    submissionRuntime: 실행시간
    submissionResult: 통과여부
    submissionFileName: 코드 파일 url
  }
]
*/

export default function StudyDetailCodeList({ codeList }) {
  return (
    <Container>
      <StyledP> 참가자 코드 보기</StyledP>
      <FlexBox>
        <FlexEle flex={1}>아이디</FlexEle>
        <FlexEle flex={1}>언어</FlexEle>
        <FlexEle flex={1}>실행시간</FlexEle>
        <FlexEle flex={1}>메모리</FlexEle>
        <FlexEle flex={1}>결과</FlexEle>
      </FlexBox>
      {codeList.map((code) => (
        <StudyDetailCodeItem
          key={code.submissionId}
          id={code.submissionId}
          memberId={code.submissionMemberId}
          languageId={code.submissionLanguageId}
          memory={code.submissionMemory}
          runtime={code.submissionRuntime}
          result={code.submissionResult}
          fileUrl={code.submissionFileName}
        />
      ))}
    </Container>
  )
}

StudyDetailCodeList.propTypes = {
  codeList: PropTypes.array.isRequired,
}

const Container = styled.div``

const StyledP = styled.p`
  margin-bottom: 1rem;
  font-size: 1.2rem;
`

const FlexBox = styled.div`
  display: flex;

  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #00000015;

  font-weight: 600;
  font-size: 1rem;
`

const FlexEle = styled.div`
  flex: ${({ flex }) => flex};

  text-align: center;
  white-space: nowrap;
`
