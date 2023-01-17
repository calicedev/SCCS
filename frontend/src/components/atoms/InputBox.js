import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import userLogo from 'assets/img/user_logo.png'

const InputBox = ({ label, logo, placeHolder, value, onChange, result }) => {
  return (
    <div>
      <Label>{label}</Label>
      <ImgWrapper>
        <Img src={logo} alt="로그인 이미지" />
        {/* src={'/public_assets/logo512.png'} */}
        <Input placeholder={placeHolder} value={value} onChange={onChange} />
      </ImgWrapper>
      <div>{result}</div>
    </div>
  )
}

InputBox.propTypes = {
  label: PropTypes.string,
  logo: PropTypes.string,
  placeHolder: PropTypes.string,
  onChange: PropTypes.func,
}

InputBox.defaultProps = {
  label: 'label',
  logo: userLogo,
  placeHolder: '값을 입력하세요',
  onChange: undefined,
}

const ImgWrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid gray;
  padding: 0.4rem 0rem;
  margin-bottom: 2rem;
`

const Img = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  filter: opacity(60%);
  margin-right: 0.8rem;
`

const Input = styled.input`
  font-size: 1.5rem;
  padding: 0.2rem 0.1rem;
  box-sizing: boder-box;
`
const Label = styled.div`
  font-size: 1.5rem;
  color: gray;
`

export default InputBox
