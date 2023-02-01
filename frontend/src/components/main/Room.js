import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { algorithmPk } from 'constants/pk'
import { FaLock, FaPython, FaJava } from 'react-icons/fa'
import IconButton from 'components/common/IconButton'
import Modal from 'components/common/Modal'
import PwdModalContent from 'components/main/PwdModalContent'

export default function Room({
  id,
  title,
  isSolving,
  isPrivate,
  algoIds,
  languageIds,
}) {
  const [showModal, setShowModal] = useState(false)

  let algorithms = ''
  algoIds.forEach((pk) => {
    algorithms += `#${algorithmPk[pk]}`
  })

  let languages = []
  languageIds.forEach((pk) => {
    languages.push(
      <IconButton
        key={pk}
        type={isSolving ? 'tertiary' : 'secondary'}
        disabled={true}
        icon={pk === 1 ? <FaPython /> : <FaJava />}
      />,
    )
  })

  const enterRoom = () => {
    if (isPrivate) {
      setShowModal(true)
      return
    }
  }

  return (
    <>
      {showModal && (
        <Modal
          close={() => setShowModal(false)}
          content={<PwdModalContent id={id} />}
        ></Modal>
      )}
      <RoomContainer isSolving={isSolving} onClick={enterRoom}>
        <Flexbox>
          <Id isSolving={isSolving}>{id}</Id>
          <Algo isSolving={isSolving}>{algorithms}</Algo>
          <MarginBox
            className={`extra-bold ${isSolving ? 'tertiary' : 'secondary'}`}
          >
            {isSolving ? 'SOLVING' : 'WAITING'}
          </MarginBox>
        </Flexbox>
        <Flexbox>
          <MarginBox>{languages}</MarginBox>
          <Title isSolving={isSolving}>
            {isPrivate && (
              <IconButton
                icon={<FaLock />}
                disabled={true}
                type={isSolving ? 'tertiary' : 'solving'}
              />
            )}
            {title}
          </Title>
        </Flexbox>
      </RoomContainer>
    </>
  )
}

Room.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isSolving: PropTypes.bool.isRequired,
  isPrivate: PropTypes.bool.isRequired,
  algoIds: PropTypes.array.isRequired,
  languageIds: PropTypes.array.isRequired,
}

const RoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 0rem 1rem;

  height: 130px;
  width: 350px;
  border: 5px solid
    ${({ isSolving, theme }) =>
      isSolving ? theme.deepTertiaryColor : theme.deepSecondaryColor};
  border-radius: 2rem;

  background-color: ${({ isSolving, theme }) =>
    isSolving ? theme.lightTertiaryColor : theme.lightSecondaryColor};

  font-weight: bold;
  color: ${({ isSolving, theme }) =>
    isSolving ? theme.deepTertiaryColor : theme.deepSecondaryColor};
  cursor: pointer;

  transition: all 0.2s ease-in-out;
  &:hover {
    scale: 1.05;
    background-color: ${({ isSolving, theme }) =>
      isSolving ? theme.tertiaryColor : theme.secondaryColor};
  }
`

const Flexbox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const MarginBox = styled.div`
  margin: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const OutlineBox = styled(MarginBox)`
  height: 2.2rem;

  margin: 0.5rem;

  background-color: #ffffff;
  border: 3px solid
    ${({ isSolving, theme }) =>
      isSolving ? theme.deepTertiaryColor : theme.deepSecondaryColor};
  border-radius: 1rem;
`
const Id = styled(OutlineBox)`
  flex: 1;
  display: flex;
  justify-content: center;
`

const Algo = styled(OutlineBox)`
  flex: 6;
`

const Title = styled(OutlineBox)`
  flex: 1;
  display: flex;
  justify-content: start;
`
