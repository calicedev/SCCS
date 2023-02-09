import React from 'react'
import Layout from 'layouts/MainPageLayout'
import Navbar from 'components/common/Navbar'
import MainCarousel from 'components/main/MainCarousel'
import MainRooms from 'components/main/MainRooms'

// Navbar : 네비게이션바
// MainCarousel : 배너 이미지
// MainRooms: 주요 기능 컴포넌트

export default function MyPage() {
  return (
    <Layout>
      <Navbar />
      <MainCarousel />
      <MainRooms />
    </Layout>
  )
}
