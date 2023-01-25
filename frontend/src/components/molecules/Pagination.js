import React from 'react'
import styled from 'styled-components'

import Button from 'components/atoms/Button'

export default function Pagination({ page, setPage, idx }) {
  return (
    <Button
      value={page.toString()}
      onClick={() => {
        setPage(idx)
      }}
    />
  )
}
