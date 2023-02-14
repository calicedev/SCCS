import React from 'react'
import styled from 'styled-components'
import info1 from 'assets/img/info_1.png'
import info2 from 'assets/img/info_2.png'
import info3 from 'assets/img/info_3.png'
import info4 from 'assets/img/info_4.png'

export default function AboutPage() {
  return (
    <>
      <H1>About SCCS</H1>
      <Flex>
        <img src={info1} alt="" />
        <img src={info2} alt="" />
        <img src={info3} alt="" />
        <img src={info4} alt="" />
      </Flex>
    </>
  )
}

const Flex = styled.div`
  display: flex;
  flex-direction: column;
`
const H1 = styled.h1`
  text-align: center;
  font-size: 3rem;
`
