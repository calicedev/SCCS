import React from 'react'
import Button from 'components/common/Button'

export default function StudyDetailTopNavbarBtn({
  value,
  problemId,
  setProblemId,
}) {
  return (
    <span>
      <Button
        onClick={() => {
          setProblemId(value - 1)
        }}
        value={value}
      />
    </span>
  )
}
