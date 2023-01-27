import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import defaultProfileImg from 'assets/img/default_profile_img.jpg'

export default function ProfileImg({ imgUrl, type }) {
  const size = type === 'profile' ? '6rem' : '2rem'
  return <ImgContainer size={size} imgUrl={imgUrl} />
}

ProfileImg.propTypes = {
  imgUrl: PropTypes.string,
  type: PropTypes.string,
}

ProfileImg.defaultProps = {
  imgUrl: defaultProfileImg,
  type: 'profile',
}

const ImgContainer = styled.div`
  height: ${({ size }) => size};
  width: ${({ size }) => size};
  overflow: hidden;
  border-radius: 50%;
  background-image: ${({ imgUrl }) => `url(${imgUrl})`};
  background-size: cover;
  background-position: center;
`
