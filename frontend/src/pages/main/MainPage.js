import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { deleteRoom } from 'redux/roomSlice'
import Layout from 'layouts/MainPageLayout'
import Navbar from 'components/common/Navbar'
import MainRooms from 'components/main/MainRooms'
import MainCarousel from 'components/main/MainCarousel'

// Navbar : 네비게이션바
// MainCarousel : 배너 이미지
// MainRooms: 주요 기능 컴포넌트

export default function MyPage() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(deleteRoom())
  }, [])

  return (
    <Layout>
      <Navbar />
      <MainCarousel />
      <MainRooms />
    </Layout>
  )
}
