import React from 'react'
import styled from 'styled-components'

import Button from 'components/common/Button'

export default function StudyDetailTopNavbar({ data }) {
  return (
    <Container>
      {data.problems.map((data, idx) => {
        return <Button size="medium" value={idx + 1} key={idx} />
      })}
      <h1>{data.title}</h1>
      <Button value="문제풀기" />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
`
