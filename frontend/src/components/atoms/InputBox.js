import React, { useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import userLogo from 'assets/img/user_logo.png'


const InputBox = ({ label, logo, placeHolder, value, onChange, result, isValid }) => {

  return (
    <div>
      <Label>{label}</Label>
      <ImgWrapper>
        <Img src={logo} alt="로그인 이미지" />
        {/* src={'/public_assets/logo512.png'} */}
        <Input placeholder={placeHolder} value={value} onChange={onChange} />
      </ImgWrapper>

      <Result isValid={isValid}>{result}</Result>



    </div>
  )
}

InputBox.propTypes = {
  label: PropTypes.string,
  logo: PropTypes.string,
  placeHolder: PropTypes.string,
  onChange: PropTypes.func,
  isValid: PropTypes.bool,
}

InputBox.defaultProps = {
  label: 'label',
  logo: userLogo,
  placeHolder: '값을 입력하세요',
  onChange: undefined,
  isValid: false
}

const ImgWrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid gray;
  padding: 0.4rem 0rem;
  margin-bottom: 0.7rem;
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
  margin-top: 1rem;
`
const Result = styled.div`
  color: ${(props) => (props.isValid ? '#2677C2' : '#EF0A0A')};
  font-size: 0.8rem;
`



export default InputBox
