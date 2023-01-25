import React from 'react'
import PropTypes from 'prop-types'
import Button from 'components/atoms/Button'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'
import { format } from 'date-fns'

export default function DateSelector({
  currentDate,
  onChange,
  onClickPrevious,
  onClickNext,
}) {
  // const currentDateISO = currentDate.toISOString().slice(0, 7)

  return (
    <div>
      <Button
        logo={<AiFillCaretLeft />}
        type={'transparent'}
        onClick={onClickPrevious}
      />
      <input
        type="month"
        value={format(currentDate, 'yyyy-MM')}
        onChange={onChange}
      />
      <Button
        logo={<AiFillCaretRight />}
        type={'transparent'}
        onClick={onClickNext}
      />
    </div>
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
