import React from 'react'
import { Outlet } from 'react-router-dom'
import AuthPageLayout from 'layouts/AuthPageLayout'
import AuthImage from 'pages/auth/AuthImage'

export default function AuthPage() {
  return (
    <AuthPageLayout>
      <Outlet />
      <AuthImage />
    </AuthPageLayout>
  )
}
