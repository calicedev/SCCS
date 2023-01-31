import React, { useState } from 'react'
import Checkbox from 'components/common/Checkbox'
import styled from 'styled-components'
import IconButton from 'components/common/IconButton'
import { FaCaretDown } from 'react-icons/fa'

export default function CheckDropdown({ title, options, onChange }) {
  const [showOptions, setShowOptions] = useState(false)

  return (
    <Container onClick={() => setShowOptions(true)}>
      <Title>
        {title}
        <IconButton icon={<FaCaretDown />} />
      </Title>
      <Options hidden={!showOptions} onMouseLeave={() => setShowOptions(false)}>
        {Object.keys(options).map((key) => (
          <Checkbox
            key={key}
            id={key + options[key].toString()}
            label={options[key]}
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
`

const Title = styled.div`
  display: flex;
  align-items: center;

  padding: 0rem 0.5rem;

  border: 0;
  border-radius: 0.5rem;

  background-color: ${({ theme }) => theme.bgColor};
  box-shadow: 3px 3px 7px #000000a0;

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

  background-color: ${({ theme }) => theme.bgColor};
  box-shadow: 5px 5px 10px #00000050;
`
