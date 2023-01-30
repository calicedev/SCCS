import React, { useState } from 'react'
import Checkbox from 'components/common/Checkbox'
import styled from 'styled-components'
import IconButton from 'components/common/IconButton'
import { FaCaretDown } from 'react-icons/fa'

export default function Dropdown({ title, options, onChange }) {
  const [showOptions, setShowOptions] = useState(false)

  return (
    <Container>
      <Title onClick={() => setShowOptions(!showOptions)}>
        {title}
        <IconButton icon={<FaCaretDown />} />
      </Title>
      <Options hidden={!showOptions}>
        {Object.keys(options).map((key) => (
          <Checkbox
            id={options[key]}
            name={key}
            value={options[key]}
            label={key}
            onChange={onChange}
          ></Checkbox>
        ))}
      </Options>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  margin: 0rem 1rem;

  border: 1px solid black;
`
const Title = styled.div`
  display: flex;
  cursor: pointer;
  font-weight: bold;
`

const Options = styled.div`
  position: absolute;
  top: 2rem;

  width: 100%;

  border: 1px solid black;

  background-color: white;
`
