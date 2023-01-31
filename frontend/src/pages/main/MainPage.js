import React from 'react'
import Layout from 'layouts/MainPageLayout'
import Navbar from 'components/common/Navbar'
import MainCarousel from 'pages/main/MainCarousel'
import MainRooms from 'pages/main/MainRooms'

export default function MyPage() {
  return (
    <Layout>
      <Navbar />
      <MainCarousel />
      <MainRooms />
    </Layout>
  )
}
