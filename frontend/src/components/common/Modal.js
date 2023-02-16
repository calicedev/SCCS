import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import IconButton from 'components/common/IconButton'
import { FaTimes } from 'react-icons/fa'

/*
모달창 컴포넌트. 배경을 어둡게 하고 화면 최상단에 노출된다.
X 버튼이나 어두운 배경을 클릭해서 닫을 수 있다. 

close: 배경이나 'X'버튼 클릭 시, 동작하는 함수,
content: 모달에 띄울 컴포넌트,
*/

export default function Modal({ close, content }) {
  const stopClose = (e) => {
    e.stopPropagation()
    close()
  }

  return (
    <Container onClick={stopClose}>
      <Wrapper>
        <StyledDiv onClick={(e) => e.stopPropagation()}>
          <ButtonWrapper>
            <IconButton icon={<FaTimes />} onClick={stopClose} />
          </ButtonWrapper>
          {content}
        </StyledDiv>
      </Wrapper>
    </Container>
  )
}

Modal.propTypes = {
  close: PropTypes.func.isRequired,
  content: PropTypes.element,
}

Modal.defaultProps = {
  content: undefined,
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100vw;
  height: 100vh;

  background-color: #00000090;

  z-index: 10;
`

const Wrapper = styled.div`
  position: relative;

  max-width: 90vw;
  max-height: 90vh;
  padding: 2rem 2rem 1.5rem;

  border-radius: 1rem;
  background-color: ${({ theme }) => theme.bgColor};
`

const StyledDiv = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  max-width: 80vw;
  max-height: 80vh;
`

const ButtonWrapper = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`
