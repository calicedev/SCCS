import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

/*
input type='checkbox'와 라벨을 가지는 컴포넌트

id: input 태그 id & label 태그 for
name: input 태그의 name 
value: input 태그의 value, checkbox의 value는 boolean이 아님!
label: label 태그의 문구
onChange: 클릭 시 동작
*/

export default function Checkbox({ id, name, value, label, onChange }) {
  return (
    <InputBox>
      <InputCheck
        type="checkbox"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </InputBox>
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

const InputBox = styled.div`
  margin-bottom: 0.5rem;
`

const InputCheck = styled.input`
  margin-right: 0.5rem;
`
