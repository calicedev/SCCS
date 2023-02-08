import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

/*
사용자 로그인 여부에 따라 로그인페이지로 라우팅하는 컴포넌트 
*/

export default function PrivateRoute() {
  const user = useSelector((state) => state.user)
  return user ? <Outlet /> : <Navigate to="/auth/login" />
}
