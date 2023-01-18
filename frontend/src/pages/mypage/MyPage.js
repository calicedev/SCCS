import React from 'react'
import { Outlet } from 'react-router-dom'
import MyPageLayout from 'layouts/MyPageLayout'
import PageRouters from 'pages/mypage/PageRouters'

export default function MyPage() {
  return (
    // 각 페이지로 이동하는게 아니고
    <MyPageLayout>
      <PageRouters></PageRouters>
      <Outlet />
    </MyPageLayout>
  )
}
