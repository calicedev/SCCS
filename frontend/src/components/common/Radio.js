import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

/*
input type='checkbox'와 라벨을 가지는 컴포넌트

id: input 태그의 id & label 태그의 for
label: label 태그에 띄울 문구
onChange: 클릭 시 동작할 함수

name: input 태그의 name (Radio버튼의 그룹)
value: input 태그의 value
*/

export default function Radio({ id, name, value, label, onChange, checked }) {
  return (
    <Container>
      <StyledDiv
        type="radio"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <label htmlFor={id}>{label}</label>
    </Container>
  )
}

Radio.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
}

Radio.defaultProps = {
  name: '',
  value: '',
  onChange: undefined,
}

const Container = styled.div`
  margin: 0.5rem 0.2rem;
`

const StyledDiv = styled.input`
  margin-right: 0.5rem;
`
