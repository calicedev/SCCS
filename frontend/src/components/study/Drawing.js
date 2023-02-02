import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

export default function Drawing() {
  
  // canvas
  const canvasBoardRef = useRef();
  const cavasContainerRef = useRef();
  const colorPickRefs = useRef([]);
  
  // 지우개 뺄지 고민중
  const eraserRef = useRef();
  const resetRef = useRef();

  // 색 버튼
  const colors = [
    '#c0392b',
    '#e67e22',
    '#f1c40f',
    '#2ecc71',
    '#3498db',
    'blueviolet',
    '#e84393',
    '#2c3e50',
  ];


  useEffect(() => {
    let dataChannel;
    let context;
    let painting = false;
    let pickedColor = '#2c3e50';
    let lineWidth = 4;


    // 그림판 생성
    const makeCanvas = () => {
      context = canvasBoardRef.current.getContext('2d');
      context.lineCap = 'round';

      // 화면에 맞춰서 생성
      canvasBoardRef.current.width = cavasContainerRef.current.clientWidth;
      canvasBoardRef.current.height = cavasContainerRef.current.clientHeight;

      if (!canvasBoardRef.current) return;
      if (!context) return;
      
      // mouse event
      canvasBoardRef.current.addEventListener('mousedown', readyPainting);
      canvasBoardRef.current.addEventListener('mousemove', beginPainting);
      canvasBoardRef.current.addEventListener('mouseup', stopPainting);
      canvasBoardRef.current.addEventListener('mouseout', stopPainting);

      // touch event
      canvasBoardRef.current.addEventListener('touchstart', readyPainting);
      canvasBoardRef.current.addEventListener('touchmove', beginPainting);
      canvasBoardRef.current.addEventListener('touchend', stopPainting);

      // 색 바꿔주기
      if (colorPickRefs.current) {
        colorPickRefs.current.map((element) =>
          element.addEventListener('click', (e) => {
            lineWidth = 4;
            if (e.target) {
              pickedColor = e.target.id;
            }
          })
        );
      }

      // 지우개 -> 하얀색으로 덧씌우는거라 뺄가 고민
      if (eraserRef.current) {
        eraserRef.current.onclick = () => {
          pickedColor = 'white';
          lineWidth = 20;
        };
      }

      // 화면 재구성
      if (resetRef.current) {
        resetRef.current.onclick = () => {
          context.clearRect(
            0,
            0,
            canvasBoardRef.current.width,
            canvasBoardRef.current.height
          );
        }
      }
    };

    // 그림그리기
    function readyPainting(e) {
      e.preventDefault();
      const mousePos = getMosuePositionOnCanvas(e);
      context.beginPath(); // 색깔 변경시 기존 선 색상 유지
      context.moveTo(mousePos.x, mousePos.y);
      context.lineWidth = lineWidth;
      context.strokeStyle = pickedColor;
      painting = true;
    }

    function beginPainting(e) {
      e.preventDefault();
      if (painting) {
        const mousePos = getMosuePositionOnCanvas(e);
        context.lineTo(mousePos.x, mousePos.y);
        context.stroke();
        const data = {
          x: mousePos.x,
          y: mousePos.y,
          lineWidth,
          color: pickedColor,
          painting: true,
        };
        if (dataChannel) {
          dataChannel.send(
            JSON.stringify({ type: 'begin', payload: { ...data } })
          );
        }
      }
    }

    // 그림 멈추기
    function stopPainting(e) {
      e.preventDefault();
      if (painting) {
        context.stroke();
      }
      painting = false;
    }

    // 마우스 위치 잡아주기
    function getMosuePositionOnCanvas(e) {
      if (e.touches) {
        return {
          x: e.touches[0].clientX - e.target.parentNode.offsetLeft,
          y: e.touches[0].clientY - e.target.parentNode.offsetHeight + 25,
        };
      }
      return { x: e.offsetX, y: e.offsetY };
    }

    makeCanvas();
  }, []);



  return (
    <Layout>
      <Container>
        <CanvasContainer ref={cavasContainerRef}>
          <CanvasBoard ref={canvasBoardRef} />
          <ColorsPickBox>
            {colors.map((color, i) => {
              return (
                <ColorPick
                  id={color}
                  key={i}
                  color={color}
                  ref={(element) => {
                    if (element) {
                      colorPickRefs.current[i] = element;
                    }
                  }}
                />
              );
            })}
            <Eraser ref={eraserRef}>
              <svg width='24' height='24' xmlns='http://www.w3.org/2000/svg'>
                <path d='M5.662 23l-5.369-5.365c-.195-.195-.293-.45-.293-.707 0-.256.098-.512.293-.707l14.929-14.928c.195-.194.451-.293.707-.293.255 0 .512.099.707.293l7.071 7.073c.196.195.293.451.293.708 0 .256-.097.511-.293.707l-11.216 11.219h5.514v2h-12.343zm3.657-2l-5.486-5.486-1.419 1.414 4.076 4.072h2.829zm6.605-17.581l-10.677 10.68 5.658 5.659 10.676-10.682-5.657-5.657z' />
              </svg>
            </Eraser>
            <Reset ref={resetRef}>
              <Img src='https://item.kakaocdn.net/do/98504002fd1d2e1db2fe8e6eb34160489f5287469802eca457586a25a096fd31' alt='다시'></Img>
            </Reset>
          </ColorsPickBox>
        </CanvasContainer>
      </Container>
    </Layout>
  );
}

const Layout = styled.div`
  margin:  50px auto;
  max-width: 800px;
  width: 100%;
  height: 645px;
`;
const Container = styled.div`
  margin: auto;
  border-radius: 20px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #4B91F1;
`;



const CanvasContainer = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  
  width: 95%;
  height: 500px;
  border-radius: 18px;
  position: relative;
  background-color: white;
  
`;
const CanvasBoard = styled.canvas`
`;

const ColorsPickBox = styled.div`
  position: absolute;
  left: 50%;
  bottom: 5px;
  display: flex;
  align-items: right;
  justify-content: right;
`;
const ColorPick = styled.div`
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  z-index: 999;
  background-color: ${(props) => props.color};
  margin-right: 3px;
  
`;

const Eraser = styled.div`
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: -5px;
`;
const Reset = styled.div`
  cursor: pointer;
  width: 30px;
  height: 30px;
`
const Img=styled.img`
  width:100%;
  height:100%;
`
