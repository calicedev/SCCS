import React from 'react'
import styled from 'styled-components'
import IconButton from 'components/common/IconButton'
import { FaTimes } from 'react-icons/fa'

export default function SonModal({ close, code }) {
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
        <NameH3>{code.submissionMemberId}의 코드</NameH3>
        <CodeDiv>{code.sumbmissionStoreFileName}</CodeDiv>
        <div>
          ***이건 그냥 예시코드임***Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Voluptates laborum doloremque autem voluptas rerum,
          hic quisquam eveniet, vitae non dolorem, dolores similique ut quia
          tenetur nisi modi sit molestiae? Ad! Lorem ipsum dolor, sit amet
          consectetur adipisicing elit. Voluptates laborum doloremque autem
          voluptas rerum, hic quisquam eveniet, vitae non dolorem, dolores
          similique ut quia tenetur nisi modi sit molestiae? Ad! Lorem ipsum
          dolor, sit amet consectetur adipisicing elit. Voluptates laborum
          doloremque autem voluptas rerum, hic quisquam eveniet, vitae non
          dolorem, dolores similique ut quia tenetur nisi modi sit molestiae?
          Ad! Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Voluptates laborum doloremque autem voluptas rerum, hic quisquam
          eveniet, vitae non dolorem, dolores similique ut quia tenetur nisi
          modi sit molestiae? Ad! Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Voluptates laborum doloremque autem voluptas rerum,
          hic quisquam eveniet, vitae non dolorem, dolores similique ut quia
          tenetur nisi modi sit molestiae? Ad! Lorem ipsum dolor, sit amet
          consectetur adipisicing elit. Voluptates laborum doloremque autem
          voluptas rerum, hic quisquam eveniet, vitae non dolorem, dolores
          similique ut quia tenetur nisi modi sit molestiae? Ad! Lorem ipsum
          dolor, sit amet consectetur adipisicing elit. Voluptates laborum
          doloremque autem voluptas rerum, hic quisquam eveniet, vitae non
          dolorem, dolores similique ut quia tenetur nisi modi sit molestiae?
          Ad! Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Voluptates laborum doloremque autem voluptas rerum, hic quisquam
          eveniet, vitae non dolorem, dolores similique ut quia tenetur nisi
          modi sit molestiae? Ad! Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Voluptates laborum doloremque autem voluptas rerum,
          hic quisquam eveniet, vitae non dolorem, dolores similique ut quia
          tenetur nisi modi sit molestiae? Ad! Lorem ipsum dolor, sit amet
          consectetur adipisicing elit. Voluptates laborum doloremque autem
          voluptas rerum, hic quisquam eveniet, vitae non dolorem, dolores
          similique ut quia tenetur nisi modi sit molestiae? Ad! Lorem ipsum
          dolor, sit amet consectetur adipisicing elit. Voluptates laborum
          doloremque autem voluptas rerum, hic quisquam eveniet, vitae non
          dolorem, dolores similique ut quia tenetur nisi modi sit molestiae?
          Ad! Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Voluptates laborum doloremque autem voluptas rerum, hic quisquam
          eveniet, vitae non dolorem, dolores similique ut quia tenetur nisi
          modi sit molestiae? Ad!
        </div>
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

const NameH3 = styled.h3`
  text-align: center;
`

const CodeDiv = styled.div`
  text-align: center;
  font-size: 1.2rem;
`
