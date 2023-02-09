import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import loadingGif from 'assets/gif/loading.gif'

/*
로딩 gif를 보여주는 빈 컴포넌트

width: 컴포넌트의 너비
height: 컴포넌트의 높이
*/

export default function Loading({ width, height }) {
  return <Container width={width} height={height} />
}

Loading.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
}

Loading.defaultProps = {
  width: '100%',
  height: '100%',
}

const Container = styled.div`
  width: ${({ width }) => (width ? width : '100%')};
  height: ${({ height }) => (height ? height : '100%')};

  background-image: url(${loadingGif});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 70px, 70px;
`
