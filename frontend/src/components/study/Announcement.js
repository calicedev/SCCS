import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { algorithmPk, languagePk } from 'constants/pk'

export default function Announcement({ languageIds, algoIds }) {
  // 선택된 언어 유형을 아이콘으로 표현
  // Ex. [1, 2] => [<FaPython/>, <FaJava />]
  const languages = useMemo(() => {
    let tempLanguages = ''
    languageIds.forEach((pk) => {
      tempLanguages += `#${languagePk[pk]} `
    })
    return tempLanguages
  }, [languageIds])

  // 선택된 알고리즘을 해쉬태그 형식으로 표현
  // Ex. [2, 3] => '#기초 #탐색'
  const algorithms = useMemo(() => {
    let tempAlgorithms = ''
    algoIds.forEach((pk) => {
      tempAlgorithms += `#${algorithmPk[pk]} `
    })
    return tempAlgorithms
  }, [algoIds])

  return (
    <Container>
      <Wrapper>
        <HeaderWrapper>
          <Header>안내사항</Header>
          <li>
            아래 안내사항은 본 테스트를 기준으로 작성되었음을 유의 바랍니다.
          </li>
        </HeaderWrapper>
        <FlexBox>
          <StyledDiv>
            <h3>사전테스트 체험</h3>
            <p>
              방 인원들이 모두 우측 상단의 READY 버튼을 누르면, 방장이 테스트를
              시작할 수 있습니다.
              <br /> <br />
              코딩 테스트 화면에서 테스트 버튼은 작성한 코드에 test case를
              적용한 결과를 나타냅니다. 제출 버튼은 작성한 코드를 서버에
              제출합니다.
              <br /> <br />
              테스트를 종료하고 싶을 경우,좌측 하단의 Finish 버튼을 눌러
              테스트를 종료할 수 있습니다.
            </p>
          </StyledDiv>
        </FlexBox>
        <FlexBox>
          <AnnouncementItem title={'테스트 시간'} content={`120분`} />
          <AnnouncementItem title={'테스트 문항'} content={`2문제`} />
        </FlexBox>
        <FlexBox>
          <AnnouncementItem title={'사용 언어'} content={languages} />
          <AnnouncementItem title={'문제 유형'} content={algorithms} />
        </FlexBox>
      </Wrapper>
    </Container>
  )
}

const AnnouncementItem = ({ title, content }) => {
  return (
    <StyledDiv>
      <h3>{title}</h3>
      <p>{content}</p>
    </StyledDiv>
  )
}

Announcement.propTypes = {
  languageIds: PropTypes.array,
  algoIds: PropTypes.array,
}

Announcement.defaultProps = {
  languageIds: [],
  algoIds: [],
}

const Container = styled.div`
  display: flex;
  align-items: center;

  overflow: hidden;

  width: 100%;
  height: 100%;
  padding: 1rem 5% 2rem;

  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.studyBgColor};

  white-space: wrap;

  & h3 {
    font-size: 1.2rem;
    font-weight: bold;
  }
  & p {
    font-size: 1rem;
  }
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  width: 100%;
  height: 100%;
  max-height: 30rem;
`

const HeaderWrapper = styled.div`
  width: 100%;
`

const Header = styled.div`
  width: 100%;

  padding: 0.5rem 0rem;
  margin: 0.5rem 0rem;

  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;

  border-bottom: 3px solid ${({ theme }) => theme.fontColor};
`

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
`

const StyledDiv = styled.div`
  flex: 1;
  text-align: start;
`
