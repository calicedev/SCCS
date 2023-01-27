import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export default function Checkbox({ id, name, value, label, onChange }) {
  return (
    <div>
      <InputCheck
        type="checkbox"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

Checkbox.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
}

Checkbox.defaultProps = {
  id: '',
  label: '',
  name: '',
  value: '',
  onChange: undefined,
}

const InputCheck = styled.input`
  margin-right: 0.5rem;
`
