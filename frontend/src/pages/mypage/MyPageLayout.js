import React from 'react'
import { Outlet } from 'react-router-dom'
import Layout from 'layouts/MyPageLayout'
import Navbar from 'components/common/Navbar'
import SideNavbar from 'components/mypage/SideNavbar'

export default function MyPage() {
  return (
    <Layout>
      <Navbar />
      <SideNavbar />
      <Outlet />
    </Layout>
  )
}
