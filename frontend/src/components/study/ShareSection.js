import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import { FaEraser } from 'react-icons/fa'
import IconButton from 'components/common/IconButton'
import Code from 'components/study/Code'

/*
Dropbox 우측의 아래 버튼 아이콘 클릭 시, 체크박스 옵션들이 보여지는 컴포넌트

title: 옵션들의 제목
opitions: {key: value}형태의 옵션. vlaue의 값이 Label로 체크박스 옆에 display
onChange: 클릭 시 동작할 함수
*/

export default function ShareSection({ code, languageId }) {
  // canvas
  const canvasBoardRef = useRef()
  const cavasContainerRef = useRef()
  const colorPickRefs = useRef([])

  const resetRef = useRef()

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

  // 색 버튼
  const colors = [
    '#c0392b',
    // '#e67e22',
    '#f1c40f',
    '#2ecc71',
    '#3498db',
    // 'blueviolet',
    // '#e84393',
    '#2c3e50',
  ]

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
  height: 100%;
  width: 100%;

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
  cursor: pointer;
  width: 30px;
  height: 30px;
  z-index: 5;
`
