import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import checkLogin from 'libs/checkLogin'

/*
사용자 로그인 여부에 따라 로그인페이지로 라우팅하는 컴포넌트 
*/

export default function PrivateRoute() {
  const isLogin = checkLogin()

  if (isLogin) {
    return <Outlet />
  }
  alert('로그인 후 이용해주세요')
  return <Navigate to="/auth/login" />
}
