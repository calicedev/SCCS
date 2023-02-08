import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

/*
input type='checkbox'와 대응하는 Label을 가지는 컴포넌트

id: input 태그의 id & label 태그의 for
label: label 태그의 문구
handleChange: 클릭 시 동작할 함수

아래 두개의 Prop을 input type="check"의 속성값
name: input 태그의 name 
value: input 태그의 value
*/

export default function Checkbox({ id, name, value, label, handleChange }) {
  return (
    <Container>
      <StyledInput
        type="checkbox"
        id={id}
        name={name}
        value={value}
        Change={handleChange}
      />
      <label htmlFor={id}>{label}</label>
    </Container>
  )
}

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.string,
}

Checkbox.defaultProps = {
  handleChange: undefined,
  name: '',
  value: '',
}

const Container = styled.div`
  margin-bottom: 0.5rem;
`

const StyledInput = styled.input`
  margin-right: 0.5rem;
`
