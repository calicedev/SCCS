import React, { useRef, useEffect } from 'react';
import "./App.css";


function Resizer() {
  const refBox = useRef(null);
  const refTop = useRef(null);
  const refBottom = useRef(null);
  const refRight = useRef(null);
  const refLeft = useRef(null);
  
  useEffect(() => {
    const resizeableElement = refBox.current;
    const styles = window.getComputedStyle(resizeableElement)
    let width = parseInt(styles.width, 10)
    let height = parseInt(styles.height, 10)
    let xCord = 0;
    let yCord = 0;
  
    resizeableElement.style.top = "50px";
    resizeableElement.style.left = "50px";
  
    //top
    const onMouseMoveTopResize = (event) => {
      const dy = event.clientY-yCord;
      height = height - dy;
      yCord = event.clientY;
      resizeableElement.style.height = `${height}px`;
    };
  
    const onMouseUpTopResize = (event) => {
      document.removeEventListener("mousemove", onMouseMoveTopResize);
    };
  
    const onMouseDownTopResize = (event) => {
      yCord = event.clientY;
      const styles = window.getComputedStyle(resizeableElement);
      resizeableElement.style.bottom = styles.bottom;
      resizeableElement.style.top = null;
      document.addEventListener("mousemove", onMouseDownTopResize);
      document.addEventListener("mouseup", onMouseUpTopResize);
    };
  
    //bottom
    const onMouseMoveBottomResize = (event) => {
      const dy = event.clientY-yCord;
      height = height + dy;
      yCord = event.clientY;
      resizeableElement.style.height = `${height}px`;
    };
  
    const onMouseUpBottomResize = (event) => {
      document.removeEventListener("mousemove", onMouseMoveBottomResize);
    };
  
    const onMouseDownBottomResize = (event) => {
      yCord = event.clientY;
      const styles = window.getComputedStyle(resizeableElement);
      resizeableElement.style.top = styles.top;
      resizeableElement.style.bottom = null;
      document.addEventListener("mousemove", onMouseDownBottomResize);
      document.addEventListener("mouseup", onMouseUpBottomResize);
    };
    
    // Right
    const onMouseMoveRightResize = (event) => {
      const dx = event.clientX-xCord;
      width = width + dx;
      xCord = event.clientX;
      resizeableElement.style.height = `${width}px`;
    };
  
    const onMouseUpRightResize = (event) => {
      document.removeEventListener("mousemove", onMouseMoveRightResize);
    };
  
    const onMouseDownRightResize = (event) => {
      yCord = event.clientY;
      const styles = window.getComputedStyle(resizeableElement);
      resizeableElement.style.left = styles.left;
      resizeableElement.style.right = null;
      document.addEventListener("mousemove", onMouseDownRightResize);
      document.addEventListener("mouseup", onMouseUpRightResize);
    };
  
    //Left
    const onMouseMoveLeftResize = (event) => {
      const dx = event.clientX-xCord;
      width = width - dx;
      xCord = event.clientX;
      resizeableElement.style.height = `${width}px`;
    };
  
    const onMouseUpLeftResize = (event) => {
      document.removeEventListener("mousemove", onMouseMoveLeftResize);
    };
  
    const onMouseDownLeftResize = (event) => {
      yCord = event.clientY;
      const styles = window.getComputedStyle(resizeableElement);
      resizeableElement.style.right = styles.right;
      resizeableElement.style.left = null;
      document.addEventListener("mousemove", onMouseDownLeftResize);
      document.addEventListener("mouseup", onMouseUpLeftResize);
    };
  
    const resizerRight = refRight.current;
    resizerRight.addEventListener("mousedown", onMouseDownRightResize)
    const resizerLeft = refLeft.current;
    resizerLeft.addEventListener("mousedown", onMouseDownLeftResize)
    const resizerTop = refTop.current;
    resizerTop.addEventListener("mousedown", onMouseDownTopResize)
    const resizerBottom = refBottom.current;
    resizerBottom.addEventListener("mousedown", onMouseDownBottomResize)
  
    return () => {
      resizerTop.removeEventListener("mousedown",onMouseDownTopResize);
      resizerBottom.removeEventListener("mousedown",onMouseDownBottomResize);
      resizerRight.removeEventListener("mousedown",onMouseDownRightResize);
      resizerLeft.removeEventListener("mousedown",onMouseDownLeftResize);
    };
  
  }, [])
  
  return (
    
    <div className="container">
    <div ref={refBox} className="resizeable">
      <div ref={refLeft} className="resizer resizer-l"></div>
      <div ref={refTop} className="resizer resizer-t"></div>
      <div ref={refRight} className="resizer resizer-r"></div>
      <div ref={refBottom} className="resizer resizer-b"></div>
    </div>
  </div>
  )
}
export default Resizer;

