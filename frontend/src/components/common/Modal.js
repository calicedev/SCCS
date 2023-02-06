import React from 'react'
import styled from 'styled-components'
import IconButton from 'components/common/IconButton'
import { FaTimes } from 'react-icons/fa'

export default function Modal({ close, content }) {
  const stopClose = (e) => {
    e.stopPropagation()
    close()
  }
  return (
    <ModalBg onClick={stopClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <CancelBtn>
          <IconButton icon={<FaTimes />} onClick={stopClose} />
        </CancelBtn>
        {content}
      </ModalBox>
    </ModalBg>
  )
}

const ModalBg = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  background-color: #00000090;
`

const ModalBox = styled.div`
  position: relative;
  padding: 1rem 2rem 1.5rem;

  border-radius: 1rem;
  background-color: ${({ theme }) => theme.bgColor};
`

const CancelBtn = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`
