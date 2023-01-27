import React from 'react'
import { Outlet } from 'react-router-dom'
import MyPageLayout from 'layouts/MyPageLayout'
import SideNavbar from 'components/mypage/SideNavbar'
import Navbar from 'components/common/Navbar'

export default function MyPage() {
  return (
    // 각 페이지로 이동하는게 아니고
    <MyPageLayout>
      <Navbar />
      <SideNavbar />
      <Outlet />
    </MyPageLayout>
  )
}
