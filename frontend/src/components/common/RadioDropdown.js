import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FaCaretDown } from 'react-icons/fa'
import Radio from 'components/common/Radio'
import IconButton from 'components/common/IconButton'

/*
Dropbox 우측의 아래 버튼 아이콘 클릭 시, 라디오버튼 옵션들이 보여지는 컴포넌트

name: 라디오 버튼들의 그룹 이름
opitions: {key: value}형태의 옵션
    체크 박스 요소들의 id = 'key-value'
    체크 박스 요소들으 label ='value'
    체크 박스 요소들의 value = 'value'
selectedKey: 기본 defualt 요소의 key
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
            key={key + '-' + options[key].toString()}
            name={name}
            id={key + '-' + options[key].toString()}
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
  selectedKey: PropTypes.string.isRequired,
  onChange: PropTypes.func,
}

RadioDropdown.defaultProps = {
  onChange: undefined,
}

const Container = styled.div`
  position: relative;
`

const StyledDiv = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;

  padding: 0rem 0.5rem;

  border: 0;
  border-radius: 0.5rem;

  background-color: white;

  color: black;
  font-weight: bold;
  white-space: nowrap;

  cursor: pointer;
`

const OptionWrapper = styled.div`
  position: absolute;
  top: 2rem;

  width: 100%;

  padding: 0em 0.2rem;

  border: 0;
  border-radius: 0.5rem;

  background-color: white;
  box-shadow: 5px 5px 10px #00000050;

  color: black;
`
