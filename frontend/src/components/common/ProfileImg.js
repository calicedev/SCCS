import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import defaultProfileImg from 'assets/img/default_profile_img.jpg'

/*
프로필 이미지(원형) 컴포넌트

imgUrl: 이미지 url 주소 string
type: 이미지 사이즈(프로필 화면용 > 채팅방 용)
*/

export default function ProfileImg({ imgUrl, type }) {
  const size = type === 'profile' ? '8rem' : '2rem'
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
  overflow: hidden;
  height: ${({ size }) => size};
  width: ${({ size }) => size};
  border-radius: 50%;
  background-image: ${({ imgUrl }) => `url(${imgUrl})`};
  background-size: cover;
  background-position: center;
`
