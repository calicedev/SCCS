import Button from 'components/common/Button'
import React from 'react'
import styled from 'styled-components'
import ChatItem from 'components/study/ChatItem'
import { useMemo } from 'react'
import { algorithmPk } from 'constants/pk'
import { FaPython, FaJava } from 'react-icons/fa'
import IconButton from 'components/common/IconButton'

export default function RoomInfo({
  id,
  title,
  languageIds,
  algoIds,
  hostNickname,
  personnel,
}) {
  // 선택된 언어 유형을 아이콘으로 표현
  // Ex. [1, 2] => [<FaPython/>, <FaJava />]
  const languages = useMemo(() => {
    const tempLanguages = []
    languageIds.forEach((pk) => {
      tempLanguages.push(
        <IconButton
          key={pk}
          disabled={true}
          icon={pk === 1 ? <FaPython /> : <FaJava />}
        />,
      )
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
      <StyledDiv>
        {languages}
        {id}. {title}
      </StyledDiv>
      <StyledDiv>{algorithms}</StyledDiv>
      <StyledDiv>방장: {hostNickname}</StyledDiv>
      <StyledDiv>현재인원: {personnel}명</StyledDiv>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  gap: 10px;
`

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 0.2rem 0.7rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  background-color: ${({ theme }) => theme.studyBgColor};
`
