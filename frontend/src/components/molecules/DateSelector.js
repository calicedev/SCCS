import React from 'react'
import PropTypes from 'prop-types'
import IconButton from 'components/atoms/IconButton'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'
import { format } from 'date-fns'
import styled from 'styled-components'

export default function DateSelector({
  currentDate,
  onChange,
  onClickPrevious,
  onClickNext,
}) {
  const month = format(currentDate, 'YYYY-MM')

  return (
    <Flexbox>
      <IconButton
        icon={<AiFillCaretLeft />}
        size={'small'}
        onClick={onClickPrevious}
      />
      <input type="month" value={month} onChange={onChange} />
      <IconButton
        icon={<AiFillCaretRight />}
        size={'small'}
        onClick={onClickNext}
      />
    </Flexbox>
  )
}

DateSelector.propTypes = {
  currentDate: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  onClickPrevious: PropTypes.func,
  onClickNext: PropTypes.func,
}

DateSelector.defaultProps = {
  currentDate: '',
  onChange: undefined,
  onClickPrevious: undefined,
  onClickNext: undefined,
}

const Flexbox = styled.div`
  display: flex;
`
