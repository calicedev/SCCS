import React from 'react'
import LogoImg from 'assets/img/Logo.png'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'

/*
프로젝트 로고 컴포넌트

width: 로고 너비,
height: 로고 높이,
*/

export default function Logo({ width, height }) {
  const navigate = useNavigate()

  return (
    <Container
      onClick={() => {
        navigate('/')
      }}
      width={width}
      height={height}
    />
  )
}

Logo.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
}

Logo.defaultProps = {
  width: '9rem',
  height: '4rem',
}

const Container = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};

  background-image: url(${LogoImg});
  background-size: contain;
  background-repeat: no-repeat;

  cursor: pointer;
`
