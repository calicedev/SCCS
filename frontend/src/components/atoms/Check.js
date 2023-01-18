import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Check = () => {
  return (
    <div>
      <CheckBox type="checkbox" />
      Remember ID
    </div>
  )
}

export default Check

const CheckBox = styled.input`
  margin-right: 0.5rem;
`