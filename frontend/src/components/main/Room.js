import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { algorithmPk } from 'constants/pk'
import { FaLock, FaPython, FaJava } from 'react-icons/fa'
import IconButton from 'components/common/IconButton'
import checkLogin from 'libs/checkLogin'
import Modal from 'components/common/Modal'
import PwdModalContent from 'components/main/PwdModalContent'
import { useNavigate } from 'react-router-dom'

/*
메인 화면에서 스터디룸을 표시하는 컴포넌트

id: 방의 pk
title: 방의 제목
isSolving: 현재 스터디 진행 여부
isPrivate: 비밀방 여부
algoIds: 해당 방의 알고리즘 pk 배열
languageIds: 해당 방의 언어 pk 배열
personnel: 인원 수
*/

export default function Room({
  id,
  title,
  isSolving,
  isPrivate,
  algoIds,
  languageIds,
  personnel,
}) {
  // 리액트 훅 관련 함수 선언
  const navigate = useNavigate()
  const isLogin = checkLogin()

  // useState
  const [showModal, setShowModal] = useState(false) // 비밀방의 모달창 표시 여부를 정하는 State
  const [isHover, setIsHover] = useState(false)

  // 선택된 알고리즘을 해쉬태그 형식으로 표현
  // Ex. [2, 3] => '#기초 #탐색'
  let algorithms = ''
  algoIds.forEach((pk) => {
    algorithms += `#${algorithmPk[pk]} `
  })

  // 선택된 언어 유형을 아이콘으로 표현
  // Ex. [1, 2] => [<FaPython/>, <FaJava />]
  const languages = []
  languageIds.forEach((pk) => {
    languages.push(
      <IconButton
        key={pk}
        type={isHover ? 'white' : isSolving ? 'tertiary' : 'secondary'}
        disabled={true}
        icon={pk === 1 ? <FaPython /> : <FaJava />}
      />,
    )
  })

  // 방을 입장하는 함수
  const enterRoom = () => {
    if (!isLogin) {
      alert('로그인 후 이용해주세요')
      return
    }
    if (isSolving) return
    // 비밀방일 경우 모달창 띄우기
    if (isPrivate) {
      setShowModal(true)
      return
    }
    // 비밀방이 아닐 경우 바로 이동
    navigate(`/room/${id}/waiting`)
  }

  return (
    <>
      {showModal && (
        <Modal
          close={() => setShowModal(false)}
          content={<PwdModalContent id={id} />}
        ></Modal>
      )}
      <Container
        isSolving={isSolving}
        onClick={enterRoom}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <Flexbox>
          <OutlineBox isSolving={isSolving} isHover={isHover} flex={1}>
            {id}
          </OutlineBox>
          <OutlineBox isSolving={isSolving} isHover={isHover} flex={5}>
            {algorithms}
          </OutlineBox>
          <OutlineBox isSolving={isSolving} isHover={isHover} flex={1}>
            {personnel}/6
          </OutlineBox>
        </Flexbox>

        <Flexbox>
          {languages}
          <OutlineBox isSolving={isSolving} isHover={isHover} flex={1}>
            {isPrivate && (
              <IconButton
                icon={<FaLock />}
                size="tiny"
                disabled={true}
                type={isSolving ? 'tertiary' : 'secondary'}
              />
            )}
            {title}
          </OutlineBox>
          <p
            className={`extra-bold ${
              isHover ? 'white' : isSolving ? 'tertiary' : 'secondary'
            }`}
          >
            {isSolving ? 'SOLVING' : 'WAITING'}
          </p>
        </Flexbox>
      </Container>
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 0rem 0.7rem;

  width: 19rem;
  height: 8rem;

  border: 5px solid
    ${({ isSolving, theme }) =>
      isSolving ? theme.tertiaryColor : theme.secondaryColor};
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
      isSolving ? theme.deepTertiaryColor : theme.deepSecondaryColor};
    border: 5px solid
      ${({ isSolving, theme }) =>
        isSolving ? theme.deepTertiaryColor : theme.deepSecondaryColor};
  }
`

const Flexbox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const OutlineBox = styled.div`
  flex: ${({ flex }) => flex};

  display: flex;
  justify-content: start;
  align-items: center;

  white-space: nowrap;

  overflow: hidden;

  height: 2.2rem;

  margin: 0.5rem 0.2rem;
  padding: 0rem 0.5rem;

  background-color: #ffffff;
  border: 4px solid
    ${({ isSolving, isHover, theme }) =>
      isSolving
        ? isHover
          ? theme.deepTertiaryColor
          : theme.tertiaryColor
        : isHover
        ? theme.deepSecondaryColor
        : theme.secondaryColor};
  border-radius: 1rem;
`
