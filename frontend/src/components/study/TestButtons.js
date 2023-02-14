import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import OutlineButton from 'components/common/OutlineButton'
import Button from 'components/common/Button'

/*
문제를 푸는 페이지에서 하단의 버튼들(종료버튼, 테스트버튼, 제출 버튼)

isFinished: 종료 여부를 나타내는 Bool. FInish 버튼의 텍스트를 결정
finish: 종료 버튼 클릭 시 동작하는 함수
test: 테스트 버튼 클릭 시 동작하는 함수
submit: 제출 버튼 클릭 시 동작하는 함수
*/

export default function TestButtons({ isFinished, finish, test, submit }) {
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

TestButtons.propTypes = {
  isFinished: PropTypes.bool,
  finish: PropTypes.func,
  test: PropTypes.func,
  submit: PropTypes.func,
}

TestButtons.defaultProps = {
  results: [],
  isFinished: false,
  finish: undefined,
  test: undefined,
  submit: undefined,
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
