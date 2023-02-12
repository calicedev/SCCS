import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {
  BsFillCameraVideoFill,
  BsFillCameraVideoOffFill,
  BsMicFill,
  BsMicMuteFill,
  BsSunFill,
  BsMoonFill,
} from 'react-icons/bs'
import IconButton from 'components/common/IconButton'
import Button from 'components/common/Button'

/*
스터디룸 하단(display=absolute, bottom=0) 조작 툴바 컴포넌트

toggleCamera: 카메라 상태를 토글하는 함수
toggleMic: 마이크 상태를 토글하는 함수
isCameraOn: 현재 카메라의 On 여부
isMicOn: 현재 마이크의 On 여부
leaveSession: 스터디룸을 나가는 함수
*/

export default function ToolBar({
  toggleCamera,
  toggleMic,
  isCameraOn,
  isMicOn,
  exit,
  theme,
  toggleTheme,
}) {
  return (
    <Container>
      <Wrapper>
        <IconButton
          icon={
            isCameraOn ? (
              <BsFillCameraVideoFill />
            ) : (
              <BsFillCameraVideoOffFill />
            )
          }
          type="white"
          onClick={toggleCamera}
        />
        <IconButton
          icon={isMicOn ? <BsMicFill /> : <BsMicMuteFill />}
          type="white"
          onClick={toggleMic}
        />
        <IconButton
          icon={theme === 'light' ? <BsSunFill /> : <BsMoonFill />}
          type="white"
          onClick={toggleTheme}
        />
      </Wrapper>
      <Button size="small" type="danger" value="Exit" onClick={exit} />
    </Container>
  )
}

ToolBar.propTypes = {
  toggleCamera: PropTypes.func,
  toggleMic: PropTypes.func,
  isCameraOn: PropTypes.bool.isRequired,
  isMicOn: PropTypes.bool.isRequired,
  leaveSession: PropTypes.func,
}

ToolBar.defaultProps = {
  toggleCamera: undefined,
  toggleMic: undefined,
  exit: undefined,
}

const Container = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;

  width: 100vw;
  height: 3rem;

  padding: 1rem 2rem;

  background-color: ${({ theme }) => theme.blackColor};
`

const Wrapper = styled.div`
  display: flex;
  gap: 40px;

  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
`
