import React from 'react'
import styled from 'styled-components'

import Button from 'components/atoms/Button'

export default function Pagination({ page, setPage, idx }) {
  const movePage = (page) => {
    return
  }
  return (
    <Button
      value={page.toString()}
      onClick={() => {
        setPage(idx)
      }}
    />
  )
}

const PageContainer = styled.div`
  text-align: center;
`
