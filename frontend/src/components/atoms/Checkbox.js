import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export default function Checkbox({ id, value, label, onChange }) {
  return (
    <div>
      <InputCheck type="checkbox" id={id} value={value} onChange={onChange} />
      <label for={id} value={label} />
    </div>
  )
}

Checkbox.propTypes = {
  id: PropTypes.string,
  value: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
}

Checkbox.defaultProps = {
  id: '',
  value: false,
  label: '',
  onChange: undefined,
}

const InputCheck = styled.input`
  margin-right: 0.5rem;
`
