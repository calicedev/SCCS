import React from 'react'
import Layout from 'layouts/MainPageLayout'
import Navbar from 'components/common/Navbar'
import MainCarousel from 'components/main/MainCarousel'
import MainRooms from 'components/main/MainRooms'

export default function MyPage() {
  return (
    <Layout>
      <Navbar />
      <MainCarousel />
      <MainRooms />
    </Layout>
  )
}
