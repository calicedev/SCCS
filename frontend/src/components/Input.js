import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import dogImg from '../assets/img/crazydog.jpg'

const Input = ({ label, logo, placeHolder, onChange }) => {
  const ImgWrapper = styled.div`
    display: flex;
  `

  const Img = styled.img`
    width: 1rem;
    height: 1rem;
  `

  return (
    <div>
      {label}
      <br />
      <ImgWrapper>
        <Img src={logo} alt="로그인 이미지" />
        {/* src={'/public_assets/logo512.png'} */}
        <ElInput />
      </ImgWrapper>
    </div>
  )
}

Input.propTypes = {
  label: PropTypes.string,
  logo: PropTypes.string,
  placeHolder: PropTypes.string,
  onChange: PropTypes.func,
}

Input.defaultProps = {
  label: '마 이게 레이블이다!',
  logo: dogImg,
  placeHolder: '마 이게 플레이스홀더다!',
  onChange: undefined,
}

const ElInput = styled.input`
  border: 1px solid #212121;
  width: 40%;
  height: 10%;
  size: 5
  padding: 0.2rem 0.1rem;
  box-sizing: boder-box;
`

export default Input
