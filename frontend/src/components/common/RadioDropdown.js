import React, { useState } from 'react'
import Radio from 'components/common/Radio'
import styled from 'styled-components'
import IconButton from 'components/common/IconButton'
import { FaCaretDown } from 'react-icons/fa'

export default function RadioDropdown({ selectedId, name, options, onChange }) {
  const [showOptions, setShowOptions] = useState(false)

  return (
    <Container onClick={() => setShowOptions(true)}>
      <Title>
        {options[selectedId]}
        <IconButton icon={<FaCaretDown />} />
      </Title>
      <Options hidden={!showOptions} onMouseLeave={() => setShowOptions(false)}>
        {Object.keys(options).map((key) => (
          <Radio
            key={key}
            name={name}
            id={key}
            label={options[key]}
            onChange={onChange}
            checked={key === selectedId ? true : false}
          ></Radio>
        ))}
      </Options>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  margin: 0rem 1rem;
`

const Title = styled.div`
  display: flex;
  align-items: center;

  padding: 0rem 0.5rem;

  border: 0;
  border-radius: 0.5rem;

  background-color: white;

  color: black;
  font-weight: bold;

  cursor: pointer;
`

const Options = styled.div`
  position: absolute;
  top: 2rem;

  width: 100%;

  padding: 0.5em 0.5rem;

  border: 0;
  border-radius: 0.5rem;

  color: black;

  background-color: white;
  box-shadow: 5px 5px 10px #00000050;
`
