import React from 'react'
import styled from 'styled-components'

import Layout from 'layouts/MainPageLayout'
import Navbar from 'components/common/Navbar'

import info2 from 'assets/img/info_2.png'
import info3 from 'assets/img/info_3.png'
import info4 from 'assets/img/info_4.png'

export default function AboutPage() {
  return (
    <Layout>
      <Navbar />
      <Flex>
        <StyledImg src={info4} alt="" />
        <StyledImg src={info2} alt="" />
        <StyledImg src={info3} alt="" />
      </Flex>
    </Layout>
  )
}

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const StyledImg = styled.img`
  width: 1500px;
`
