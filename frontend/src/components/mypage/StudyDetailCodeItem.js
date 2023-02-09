import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useState } from 'react'
import Modal from 'components/common/Modal'

export default function StudyDetailCodeItem({
  id,
  memberId,
  memory,
  runtime,
  result,
}) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      {showModal ? <Modal close={() => setShowModal(false)} /> : null}
      <div
        onClick={() => {
          setShowModal(true)
        }}
      >
        <span>{memberId}</span>
        <span>{runtime}ms</span>
        <span>{memory}kb</span>
        <span>{result}</span>
      </div>
    </>
  )
}

StudyDetailCodeItem.propTypes = {
  id: PropTypes.number.isRequired,
  memberId: PropTypes.string.isRequired,
  memory: PropTypes.number.isRequired,
  runtime: PropTypes.number.isRequired,
  result: PropTypes.string.isRequired,
}
