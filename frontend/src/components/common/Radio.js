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

export default function Radio({ id, name, value, label, onChange, checked }) {
  return (
    <div>
      <InputCheck
        type="radio"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

Radio.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
}

Radio.defaultProps = {
  id: '',
  label: '',
  name: '',
  value: '',
  onChange: undefined,
}

const InputCheck = styled.input`
  margin-right: 0.5rem;
`
