import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { algorithmPk, languageIconPk } from 'constants/pk'
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
        <IconButton key={pk} disabled={true} icon={languageIconPk[pk]} />,
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
        {languages} {id}. {title}
      </StyledDiv>
      <StyledDiv>{algorithms}</StyledDiv>
      <StyledDiv>방장: {hostNickname}</StyledDiv>
      <StyledDiv>현재인원: {personnel}명</StyledDiv>
    </Container>
  )
}

RoomInfo.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  algoIds: PropTypes.array.isRequired,
  languageIds: PropTypes.array.isRequired,
  hostNickname: PropTypes.string.isRequired,
  personnel: PropTypes.number.isRequired,
}

const Container = styled.div`
  display: flex;
  gap: 10px;
`

const StyledDiv = styled.div`
  display: flex;
  align-items: center;

  overflow: hidden;

  padding: 0.2rem 0.5rem;

  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.studyBgColor};

  font-size: 0.9rem;
  font-weight: bold;
  white-space: nowrap;
`
