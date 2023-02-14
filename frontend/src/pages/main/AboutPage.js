import React from 'react'
import styled from 'styled-components'
import info2 from 'assets/img/info_2.png'
import info3 from 'assets/img/info_3.png'
import info4 from 'assets/img/info_4.png'
import Navbar from 'components/common/Navbar'

export default function AboutPage() {
  const observer = new IntersectionObserver((observingList) => {
    observingList.forEach((ele) => {
      if (ele.isIntersecting) {
        ele.target.style.opacity = 1
        ele.target.style.scale = 1.1
      } else {
        ele.target.style.opacity = 0
        ele.target.style.scale = 1
      }
    })
  })

  const imgList = document.querySelectorAll('#about-image-container > img')
  imgList.forEach((img) => {
    observer.observe(img)
  })

  return (
    <Container>
      <Navbar />
      <FlexBox id="about-image-container">
        <StyledImg src={info4} alt="" />
        <StyledImg src={info2} alt="" />
        <StyledImg src={info3} alt="" />
      </FlexBox>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledImg = styled.img`
  width: 1000px;

  opacity: 0;
  transition: all 0.5s ease-in-out;
`
