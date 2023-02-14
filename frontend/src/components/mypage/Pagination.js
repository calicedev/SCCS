import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from 'components/common/Button'
import IconButton from 'components/common/IconButton'
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from 'react-icons/fa'

/*
페이지네이션 기능의 컴포넌트

currentPage: 지금 선택된 페이지의 인덱스 -> 색깔을 다르게 표시
lastPage: 가장 마지막 페이지의 인덱스
startPagination: 페이지네이션에 현재 표시되는 시작 페이지의 인덱스
numBtms: 페이지네이션에 표시할 버튼 갯수
onClick: 페이지 버튼 클릭시 동작할 함수
onClickLeft: 왼쪽 버튼 클릭시 동작할 함수
onClickRight: 오른쪽 버튼 클릭시 동작할 함수
onClickDoubleLeft: 왼쪽 더블버튼 클릭시 동작할 함수
onClickDoubleRight: 오른쪽 더블버튼 클릭시 동작할 함수
*/

export default function Pagination({
  numBtns,
  currentPage,
  setCurrentPage,
  lastPage,
  startPagination,
  setStartPagination,
}) {
  // 표시할 페이지가 페이지네이션 버튼 수보다 작은 경우를 고려
  const buttons = [...Array(numBtns).keys()].map((key) =>
    key + startPagination > lastPage ? null : key + startPagination,
  )

  // 왼쪽 버튼 클릭 시 페이지네이션 변화
  const previousPagination = () => {
    if (startPagination - numBtns <= 0) {
      setCurrentPage(0)
      setStartPagination(0)
      return
    }
    setCurrentPage(Math.max(startPagination - 1, 0))
    setStartPagination(Math.max(startPagination - numBtns, 0))
  }

  // 왼쪽 더블버튼 클릭 시 페이지네이션 변화
  const previousDoublePagination = () => {
    setCurrentPage(0)
    setStartPagination(0)
  }

  // 오른쪽 버튼 클릭 시 페이지네이션 변화
  const nextPagination = () => {
    if (startPagination + 2 * numBtns - 1 > lastPage) {
      setCurrentPage(Math.max(lastPage - numBtns + 1, 0))
      setStartPagination(Math.max(lastPage - numBtns + 1, 0))
      return
    }
    setCurrentPage(startPagination + numBtns)
    setStartPagination(startPagination + numBtns)
  }

  // 오른쪽 더블버튼 클릭 시 페이지네이션 변화
  const nextDoublePagination = () => {
    if (startPagination + 2 * numBtns - 1 > lastPage) {
      setCurrentPage(Math.max(lastPage - numBtns + 1, 0))
      setStartPagination(Math.max(lastPage - numBtns + 1, 0))
      return
    }
    setCurrentPage(startPagination + numBtns)
    setStartPagination(startPagination + numBtns)
  }

  return (
    <Container>
      <IconButton
        size="small"
        type="gray"
        icon={<FaAngleDoubleLeft />}
        onClick={previousDoublePagination}
      ></IconButton>
      <IconButton
        size="small"
        type="gray"
        icon={<FaAngleLeft />}
        onClick={previousPagination}
      ></IconButton>

      {buttons.map((num, index) => (
        <Button
          key={`${num}-${index}-pg`}
          type={num === currentPage ? 'primary' : 'secondary'}
          size="tiny"
          disabled={num === null ? true : false}
          value={num === null ? null : (num + 1).toString()}
          onClick={() => setCurrentPage(num)}
        />
      ))}

      <IconButton
        size="small"
        type="gray"
        icon={<FaAngleRight />}
        onClick={nextPagination}
      ></IconButton>
      <IconButton
        size="small"
        type="gray"
        icon={<FaAngleDoubleRight />}
        onClick={nextDoublePagination}
      ></IconButton>
    </Container>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  startPagination: PropTypes.number,
  numBtns: PropTypes.number,
  onClick: PropTypes.func,
  onClickLeft: PropTypes.func,
  onClickRight: PropTypes.func,
  onClickDoubleLeft: PropTypes.func,
  onClickDoubleRight: PropTypes.func,
}

Pagination.defaultProps = {
  currentPage: 0,
  startPagination: 0,
  numBtns: 0,
  onClick: undefined,
  onClickLeft: undefined,
  onClickRight: undefined,
  onClickDoubleLeft: undefined,
  onClickDoubleRight: undefined,
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  min-width: 20rem;
  margin: 0 auto;
`
