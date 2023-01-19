import React from 'react'
import PropTypes from 'prop-types'
import Button from 'components/atoms/Button'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'

export default function DateSelector({
  currentDate,
  onChange,
  onClickPrevious,
  onClickNext,
}) {
  return (
    <div>
      <Button
        logo={<AiFillCaretLeft />}
        type={'transparent'}
        onClick={onClickPrevious}
      />
      <input type="month" value={currentDate} onChange={onChange} />
      <Button
        logo={<AiFillCaretRight />}
        type={'transparent'}
        onClick={onClickNext}
      />
    </div>
  )
}

DateSelector.propTypes = {
  currentDate: PropTypes.string,
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
