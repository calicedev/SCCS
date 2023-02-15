import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FaEraser } from 'react-icons/fa'
import Code from 'components/study/Code'
import IconButton from 'components/common/IconButton'

/*
스터디 페이지에서 공유되는 화면, 코드 위에 그림판 canvas가 겹쳐 있음

code: 뒷편에 띄울 code 문자열.
languageId: code의 언어 pk.
*/

export default function ShareSection({ code, languageId }) {
  // canvas
  const canvasBoardRef = useRef()
  const cavasContainerRef = useRef()
  const colorPickRefs = useRef([])
  const resetRef = useRef()

  // 캔버스의 크기를 윈도우 사이즈에 따라 동적을 조절
  const [windowHeight, setWindowHeight] = useState(0)
  useEffect(() => {
    const updateMaxHeight = () => {
      setWindowHeight(window.innerHeight)
    }

    window.addEventListener('resize', updateMaxHeight)
    updateMaxHeight()

    return () => {
      window.removeEventListener('resize', updateMaxHeight)
    }
  }, [])

  // 색깔
  const colors = ['#c0392b', '#f1c40f', '#2ecc71', '#3498db', '#2c3e50']

  useEffect(() => {
    let dataChannel
    let context
    let painting = false
    let pickedColor = '#2c3e50'
    let lineWidth = 3

    // 그림판 생성
    const makeCanvas = () => {
      context = canvasBoardRef.current.getContext('2d')
      context.lineCap = 'round'

      // 화면에 맞춰서 생성
      canvasBoardRef.current.width = cavasContainerRef.current.clientWidth
      canvasBoardRef.current.height = cavasContainerRef.current.clientHeight

      if (!canvasBoardRef.current) return
      if (!context) return

      // mouse event
      canvasBoardRef.current.addEventListener('mousedown', readyPainting)
      canvasBoardRef.current.addEventListener('mousemove', beginPainting)
      canvasBoardRef.current.addEventListener('mouseup', stopPainting)
      canvasBoardRef.current.addEventListener('mouseout', stopPainting)

      // touch event
      canvasBoardRef.current.addEventListener('touchstart', readyPainting)
      canvasBoardRef.current.addEventListener('touchmove', beginPainting)
      canvasBoardRef.current.addEventListener('touchend', stopPainting)

      // 색 바꿔주기
      if (colorPickRefs.current) {
        colorPickRefs.current.map((element) =>
          element.addEventListener('click', (e) => {
            lineWidth = 3
            if (e.target) {
              pickedColor = e.target.id
            }
          }),
        )
      }

      // 화면 재구성
      if (resetRef.current) {
        resetRef.current.onclick = () => {
          context.clearRect(
            0,
            0,
            canvasBoardRef.current.width,
            canvasBoardRef.current.height,
          )
        }
      }
    }

    // 그림그리기
    function readyPainting(e) {
      e.preventDefault()
      const mousePos = getMosuePositionOnCanvas(e)
      context.beginPath() // 색깔 변경시 기존 선 색상 유지
      context.moveTo(mousePos.x, mousePos.y)
      context.lineWidth = lineWidth
      context.strokeStyle = pickedColor
      painting = true
    }

    function beginPainting(e) {
      e.preventDefault()
      if (painting) {
        const mousePos = getMosuePositionOnCanvas(e)
        context.lineTo(mousePos.x, mousePos.y)
        context.stroke()
        const data = {
          x: mousePos.x,
          y: mousePos.y,
          lineWidth,
          color: pickedColor,
          painting: true,
        }
        if (dataChannel) {
          dataChannel.send(
            JSON.stringify({ type: 'begin', payload: { ...data } }),
          )
        }
      }
    }

    // 그림 멈추기
    function stopPainting(e) {
      e.preventDefault()
      if (painting) {
        context.stroke()
      }
      painting = false
    }

    // 마우스 위치 잡아주기
    function getMosuePositionOnCanvas(e) {
      if (e.touches) {
        return {
          x: e.touches[0].clientX - e.target.parentNode.offsetLeft,
          y: e.touches[0].clientY - e.target.parentNode.offsetHeight + 25,
        }
      }
      return { x: e.offsetX, y: e.offsetY }
    }

    makeCanvas()
  }, [windowHeight])

  return (
    <Container windowHeight={windowHeight}>
      <CanvasContainer ref={cavasContainerRef}>
        <CanvasBoard ref={canvasBoardRef} id="code-with-drawing"></CanvasBoard>
        <ColorsPickBox>
          {colors.map((color, i) => {
            return (
              <ColorPick
                id={color}
                key={i}
                color={color}
                ref={(element) => {
                  if (element) {
                    colorPickRefs.current[i] = element
                  }
                }}
              />
            )
          })}
          <Reset ref={resetRef}>
            <IconButton icon={<FaEraser />} />
          </Reset>
        </ColorsPickBox>
      </CanvasContainer>
      <CodeWrapper>
        <Code languageId={languageId} value={code} />
      </CodeWrapper>
    </Container>
  )
}

ShareSection.propTypes = {
  code: PropTypes.string.isRequired,
  languageId: PropTypes.number.isRequired,
}

const Container = styled.div`
  position: relative;

  width: 100%;
  height: ${({ windowHeight }) => `calc(${windowHeight}px - 130px)`};

  border-radius: 0.5rem;
`
const CanvasContainer = styled.div`
  position: relative;

  width: 100%;
  height: 100%;

  border: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 3;
`
const CodeWrapper = styled.div`
  position: absolute;

  top: 0rem;
  left: 0rem;

  width: 100%;
  height: 100%;

  z-index: 2;
`

const CanvasBoard = styled.canvas`
  width: 100%;
  height: 100%;

  z-index: 4;
`

const ColorsPickBox = styled.div`
  display: flex;
  align-items: right;
  justify-content: right;

  position: absolute;
  right: 0rem;
  bottom: 0.5rem;

  gap: 10px;
`
const ColorPick = styled.div`
  z-index: 5;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  cursor: pointer;
`

const Reset = styled.div`
  width: 30px;
  height: 30px;
  z-index: 5;
  cursor: pointer;
`
