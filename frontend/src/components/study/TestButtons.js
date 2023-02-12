import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import OutlineButton from 'components/common/OutlineButton'
import Button from 'components/common/Button'

/*
Dropbox 우측의 아래 버튼 아이콘 클릭 시, 체크박스 옵션들이 보여지는 컴포넌트

title: 옵션들의 제목
opitions: {key: value}형태의 옵션. vlaue의 값이 Label로 체크박스 옆에 display
onChange: 클릭 시 동작할 함수
*/

export default function ButtonDropdown({ isFinished, finish, test, submit }) {
  const [showOptions, setShowOptions] = useState(false)

  return (
    <Container>
      <OutlineButton
        value={isFinished ? 'Finished' : 'Finish'}
        type="danger"
        size="small"
        disabled={isFinished ? true : false}
        onClick={finish}
      />
      <FlexBox>
        <Button value="테스트" type="gray" size="small" onClick={test} />
        <Button value="제출" size="small" onClick={submit} />
      </FlexBox>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.studyBgColor};
`

const FlexBox = styled.div`
  display: flex;
  gap: 10px;
`
