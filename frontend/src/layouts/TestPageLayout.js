import React from 'react'
import styled from 'styled-components'
import { Resizable } from 're-resizable'
import { useWindowHeight } from 'hooks/useWindowHeight'

export default function TestPageLayout({ children }) {
  const windowHeight = useWindowHeight() // window의 innerHeight를 반환하는 커스텀 훅

  const [Header, Left, RightUp, RightDown] = children

  return (
    <Container>
      <UpperPane>{Header}</UpperPane>
      <FlexBox>
        <LeftPane height={windowHeight - 120}>{Left}</LeftPane>
        <Resizable
          defaultSize={{ width: '50%', height: '100%' }}
          minWidth={'20%'}
          maxWidth={'80%'}
          enable={{
            top: false,
            right: true,
            bottom: false,
            left: true,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false,
          }}
        >
          <FlexColumn height={windowHeight - 120}>
            {RightUp}
            <Resizable
              defaultSize={{ width: '100%', height: '40%' }}
              minHeight={'20%'}
              maxHeight={'80%'}
              enable={{
                top: true,
                right: false,
                bottom: false,
                left: false,
                topRight: false,
                bottomRight: false,
                bottomLeft: false,
                topLeft: false,
              }}
            >
              {RightDown}
            </Resizable>
          </FlexColumn>
        </Resizable>
      </FlexBox>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  height: 100%;

  padding: 1rem;
`

const UpperPane = styled.div`
  display: flex;
  justify-content: space-between;
`

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5px;
`

const LeftPane = styled.div`
  padding: 0.5rem;
  border-radius: 0.5rem;

  height: ${({ height }) => height}px;
  background-color: ${({ theme }) => theme.whiteColor};
`
const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  height: ${({ height }) => height}px;
`
