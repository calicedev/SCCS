import React from 'react'
import Layout from 'layouts/MainPageLayout'
import Navbar from 'components/common/Navbar'
import MainRooms from 'pages/main/MainRooms'

export default function MyPage() {
  return (
    <Layout>
      <Navbar />
      <MainRooms />
    </Layout>
  )
}
