import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import IconButton from 'components/common/IconButton'
import { FaTimes } from 'react-icons/fa'

/*
모달창 컴포넌트. 배경을 어둡게 하고 화면 최상단에 노출된다.
X 버튼이나 어두운 배경을 클릭해서 닫을 수 있다. 

close: 모달 창의 부모 컴포넌트에서 모달창의 렌더링 여부를 결정하기 위헤 동작할 함수,
content: 모달 컨텐츠를 가진 컴포넌트,
*/

export default function Modal({ close, content }) {
  const stopClose = (e) => {
    e.stopPropagation()
    close()
  }

  return (
    <Container onClick={stopClose}>
      <StyledDiv onClick={(e) => e.stopPropagation()}>
        <ButtonWrapper>
          <IconButton icon={<FaTimes />} onClick={stopClose} />
        </ButtonWrapper>
        {/* 2.12 민혁 추가 - <pre></pre> 태그로 감싸주면 공백이나 줄바꿈이 잘 적용됨 */}
        <pre>{content}</pre>
      </StyledDiv>
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

const StyledDiv = styled.div`
  position: relative;
  padding: 1rem 2rem 1.5rem;

  border-radius: 1rem;
  background-color: ${({ theme }) => theme.bgColor};
`

const ButtonWrapper = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`
