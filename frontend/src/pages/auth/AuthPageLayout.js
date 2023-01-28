import React from 'react'
import { Outlet } from 'react-router-dom'
import Layout from 'layouts/AuthPageLayout'
import AuthImage from 'components/auth/AuthImage'

export default function AuthPageLayout() {
  return (
    <Layout>
      <Outlet />
      <AuthImage />
    </Layout>
  )
}
