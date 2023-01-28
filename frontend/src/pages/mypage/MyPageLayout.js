import React from 'react'
import { Outlet } from 'react-router-dom'
import Layout from 'layouts/MyPageLayout'
import SideNavbar from 'components/mypage/SideNavbar'
import Navbar from 'components/common/Navbar'

export default function MyPage() {
  return (
    <Layout>
      <Navbar />
      <SideNavbar />
      <Outlet />
    </Layout>
  )
}
