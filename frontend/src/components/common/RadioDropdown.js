import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Radio from 'components/common/Radio'
import styled from 'styled-components'
import IconButton from 'components/common/IconButton'
import { FaCaretDown } from 'react-icons/fa'

/*
Dropbox 우측의 아래 버튼 아이콘 클릭 시, 라디오버튼 옵션들이 보여지는 컴포넌트

name: 라디오 버튼들을 그룹질 이름
opitions: {key: value}형태의 옵션. vlaue의 값이 Label로 체크박스 옆에 display
onChange: 클릭 시 동작할 함수
*/

export default function RadioDropdown({
  name,
  options,
  selectedKey,
  onChange,
}) {
  const [showOptions, setShowOptions] = useState(false)

  return (
    <Container onClick={() => setShowOptions(!showOptions)}>
      <StyledDiv>
        {options[selectedKey] ? options[selectedKey] : '옵션 선택'}
        <IconButton icon={<FaCaretDown />} />
      </StyledDiv>
      <OptionWrapper
        hidden={!showOptions}
        onMouseLeave={() => setShowOptions(false)}
      >
        {Object.keys(options).map((key) => (
          <Radio
            key={key}
            name={name}
            id={key}
            label={options[key]}
            onChange={onChange}
            checked={key === selectedKey ? true : false}
          ></Radio>
        ))}
      </OptionWrapper>
    </Container>
  )
}

RadioDropdown.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
  selectedKey: PropTypes.string,
  onChange: PropTypes.func,
}

RadioDropdown.defaultProps = {
  selectedKey: '1',
  onChange: undefined,
}

const Container = styled.div`
  position: relative;
`

const StyledDiv = styled.div`
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
  align-items: center;

  padding: 0rem 0.5rem;

  border: 0;
  border-radius: 0.5rem;

  background-color: white;

  color: black;
  font-weight: bold;

  cursor: pointer;
`

const OptionWrapper = styled.div`
  position: absolute;
  top: 2rem;

  width: 100%;

  padding: 0em 0.2rem;

  border: 0;
  border-radius: 0.5rem;

  color: black;

  background-color: white;
  box-shadow: 5px 5px 10px #00000050;
`
