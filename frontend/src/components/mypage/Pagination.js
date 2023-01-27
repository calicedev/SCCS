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

export default function Pagination({
  currentPage,
  onClick,
  startPagination,
  numBtns,
  onClickLeft,
  onClickRight,
  onClickDoubleLeft,
  onClickDoubleRight,
}) {
  const buttons = useMemo(() => {
    return [...Array(numBtns).keys()].map((key) => key + startPagination)
  }, [startPagination])

  return (
    <Container>
      <IconButton
        size="small"
        icon={<FaAngleDoubleLeft />}
        onClick={onClickDoubleLeft}
      ></IconButton>
      <IconButton
        size="small"
        icon={<FaAngleLeft />}
        onClick={onClickLeft}
      ></IconButton>
      {buttons.map((num) => (
        <Button
          type={num === currentPage ? 'primary' : 'secondary'}
          size="tiny"
          value={(num + 1).toString()}
          onClick={() => onClick(parseInt(num))}
        />
      ))}
      <IconButton
        size="small"
        icon={<FaAngleRight />}
        onClick={onClickRight}
      ></IconButton>
      <IconButton
        size="small"
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
`
