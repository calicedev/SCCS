import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

/*
프로필 이미지(원형) 컴포넌트

imgUrl: 이미지 url 주소 string
type: 이미지 사이즈(프로필 화면 용 > 채팅방 용)
*/

export default function ProfileImg({ imgUrl, type }) {
  const size = type === 'profile' ? '8rem' : '2rem'
  return <Container size={size} imgUrl={imgUrl} />
}

ProfileImg.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  type: PropTypes.string,
}

ProfileImg.defaultProps = {
  type: 'profile',
}

const Container = styled.div`
  overflow: hidden;
  height: ${({ size }) => size};
  width: ${({ size }) => size};
  border-radius: 50%;
  background-image: ${({ imgUrl }) => `url(${imgUrl})`};
  background-size: cover;
  background-position: center;
`
