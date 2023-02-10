import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {
  BsFillCameraVideoFill,
  BsFillCameraVideoOffFill,
  BsMicFill,
  BsMicMuteFill,
} from 'react-icons'
import IconButton from 'components/common/IconButton'
import Button from 'components/common/Button'

/*
스터디룸 하단(display=absolute, bottom=0) 조작 툴바 컴포넌트

toggleCamera: 카메라 상태를 토글하는 함수
toggleMic: 마이크 상태를 토글하는 함수
isCameraOn: 현재 카메라의 On 여부
isMicOn: 현재 마이크의 On 여부
exit: 스터디룸을 나가는 함수
*/

export default function ToolBar({
  toggleCamera,
  toggleMic,
  isCameraOn,
  isMicOn,
  exit,
}) {
  return (
    <Container>
      <IconButton
        icon={isMicOn ? <BsMicFill /> : <BsMicMuteFill />}
        type="white"
        onClick={toggleCamera}
      />
      <IconButton
        icon={
          isCameraOn ? <BsFillCameraVideoFill /> : <BsFillCameraVideoOffFill />
        }
        type="white"
        onClick={toggleMic}
      />
      <Button type="danger" value="Exit" onClick={exit} />
    </Container>
  )
}

ToolBar.propTypes = {
  toggleCamera: PropTypes.func,
  toggleMic: PropTypes.func,
  isCameraOn: PropTypes.bool.isRequired,
  isMicOn: PropTypes.bool.isRequired,
  exit: PropTypes.func,
}

ToolBar.defaultProps = {
  toggleCamera: undefined,
  toggleMic: undefined,
  exit: undefined,
}

const Container = styled.div`
  display: flex;

  position: absolute;
  bottom: 0;

  width: 100%;
  height: 5rem;
`
