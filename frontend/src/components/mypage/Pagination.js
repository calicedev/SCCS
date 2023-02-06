import React, { useMemo } from 'react'
import styled from 'styled-components'
import Button from 'components/common/Button'
import IconButton from 'components/common/IconButton'
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from 'react-icons/fa'
import PropTypes from 'prop-types'

/*
페이지네이션 기능의 컴포넌트

currentPage: 지금 선택된 페이지 -> 색깔을 다르게 표시
startPagination: 페이지네이션에 현재 표시되는 시작 페이지
numBtms: 페이지네이션에 표시할 버튼 갯수
onClick: 페이지 버튼 클릭시 동작할 함수
onClickLeft: 왼쪽 버튼 클릭시 동작할 함수
onClickRight: 오른쪽 버튼 클릭시 동작할 함수
onClickDoubleLeft: 왼쪽 더블버튼 클릭시 동작할 함수
onClickDoubleRight: 오른쪽 더블버튼 클릭시 동작할 함수
*/

export default function Pagination({
  currentPage,
  startPagination,
  numBtns,
  onClick,
  onClickLeft,
  onClickRight,
  onClickDoubleLeft,
  onClickDoubleRight,
}) {
  const buttons = useMemo(() => {
    return [...Array(numBtns).keys()].map((key) => key + startPagination)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startPagination])

  return (
    <Container>
      <IconButton
        size="small"
        type="gray"
        icon={<FaAngleDoubleLeft />}
        onClick={onClickDoubleLeft}
      ></IconButton>
      <IconButton
        size="small"
        type="gray"
        icon={<FaAngleLeft />}
        onClick={onClickLeft}
      ></IconButton>
      {buttons.map((num) => (
        <Button
          key={num}
          type={num === currentPage ? 'primary' : 'secondary'}
          size="tiny"
          value={(num + 1).toString()}
          onClick={() => onClick(parseInt(num))}
        />
      ))}
      <IconButton
        size="small"
        type="gray"
        icon={<FaAngleRight />}
        onClick={onClickRight}
      ></IconButton>
      <IconButton
        size="small"
        type="gray"
        icon={<FaAngleDoubleRight />}
        onClick={onClickDoubleRight}
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
