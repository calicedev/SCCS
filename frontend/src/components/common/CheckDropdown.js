import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Checkbox from 'components/common/Checkbox'
import IconButton from 'components/common/IconButton'
import { FaCaretDown } from 'react-icons/fa'

/*
Dropbox 우측의 아래 버튼 아이콘 클릭 시, 체크박스 옵션들이 보여지는 컴포넌트

title: 옵션들의 제목
opitions: {key: value}형태의 옵션. vlaue의 값이 Label로 체크박스 옆에 display
handleChange: 클릭 시 동작할 함수

*/

export default function CheckDropdown({ title, options, handleChange }) {
  const [showOptions, setShowOptions] = useState(false)

  return (
    <Container onClick={() => setShowOptions(true)}>
      <StyledDiv>
        {title}
        <IconButton icon={<FaCaretDown />} />
      </StyledDiv>
      <OptionWrapper
        hidden={!showOptions}
        onMouseLeave={() => setShowOptions(false)}
      >
        {Object.keys(options).map((key) => (
          <Checkbox
            key={key + options[key].toString()}
            id={key + options[key].toString()}
            label={options[key]}
            onChange={handleChange}
          ></Checkbox>
        ))}
      </OptionWrapper>
    </Container>
  )
}

CheckDropdown.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
  handleChange: PropTypes.func,
}

CheckDropdown.defaultProps = {
  handleChange: undefined,
  name: '',
  value: '',
}

const Container = styled.div`
  position: relative;
  margin: 0rem 1rem;
`

const StyledDiv = styled.div`
  height: 100%;

  padding: 0rem 0.5rem;

  border: 0;
  border-radius: 0.5rem;

  background-color: ${({ theme }) => theme.bgColor};
  box-shadow: 3px 3px 7px #000000a0;

  font-weight: bold;

  cursor: pointer;
`

const OptionWrapper = styled.div`
  position: absolute;
  top: 2rem;

  width: 100%;

  padding: 0.5em 0.5rem;

  border: 0;
  border-radius: 0.5rem;

  background-color: ${({ theme }) => theme.bgColor};
  box-shadow: 5px 5px 10px #00000050;
`
