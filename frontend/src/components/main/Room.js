import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { algorithm } from 'constants/pk'
import { FaLock, FaPython, FaJava } from 'react-icons/fa'
import IconButton from 'components/common/IconButton'

export default function Room({
  id,
  title,
  isSolving,
  isPrivate,
  algoIds,
  languageIds,
}) {
  let algorithms = ''
  algoIds.forEach((pk) => {
    algorithms += `#${algorithm[pk]}`
  })

  let languages = []
  languageIds.forEach((pk) => {
    languages.push(
      <IconButton key={pk} icon={pk === 1 ? <FaPython /> : <FaJava />} />,
    )
  })

  return (
    <RoomContainer>
      <Flexbox>
        <OutlineBox>{id}</OutlineBox>
        <OutlineBox>{algorithms}</OutlineBox>
        <p>{isSolving ? 'SOLVING' : 'WAITING'}</p>
      </Flexbox>
      <Flexbox>
        {languages}
        <OutlineBox>
          {isPrivate && <IconButton icon={<FaLock />} />}
          {title}
        </OutlineBox>
      </Flexbox>
    </RoomContainer>
  )
}

const RoomContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 200px;
  border: 5px solid
    ${({ isSolving, theme }) =>
      isSolving ? theme.tertiaryColor : theme.secondaryColor};
  border-radius: 1rem;

  background-color: ${({ isSolving, theme }) =>
    isSolving ? theme.lightTertiaryColor : theme.lightSecondaryColor};
`

const Flexbox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const OutlineBox = styled.div`
  background-color: #ffffff;
  border: 3px solid
    ${({ isSolving, theme }) =>
      isSolving ? theme.tertiaryColor : theme.secondaryColor};
  border-radius: 1rem;
`

Room.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isSolving: PropTypes.bool.isRequired,
  isPrivate: PropTypes.bool.isRequired,
  algoIds: PropTypes.array.isRequired,
  languageIds: PropTypes.array.isRequired,
}
