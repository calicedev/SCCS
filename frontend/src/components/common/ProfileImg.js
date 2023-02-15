import React from 'react'
import { useMemo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import defaultProfileImg from 'assets/img/default_profile_img.jpg'

/*
프로필 이미지(원형) 컴포넌트

imgUrl: 이미지 url 주소 string
type: 이미지 사이즈(프로필 화면 용 & 채팅방 용)
*/

export default function ProfileImg({ src, type }) {
  const size = type === 'profile' ? '8rem' : '3rem'

  // null값이 주어질 경우 프론트 단에 저장된 기본 이미지를 사용
  const srcUrl = useMemo(() => {
    if (!src) return defaultProfileImg
    return src
  }, [src])

  return <Container size={size} srcUrl={srcUrl} />
}

ProfileImg.propTypes = {
  src: PropTypes.oneOf(PropTypes.string, PropTypes.number), // null값도 허용
  type: PropTypes.oneOf('profile', 'chat'),
}

ProfileImg.defaultProps = {
  type: 'profile',
}

const Container = styled.div`
  overflow: hidden;
  height: ${({ size }) => size};
  width: ${({ size }) => size};
  border-radius: 50%;
  background-image: ${({ srcUrl }) => `url(${srcUrl})`};
  background-size: cover;
  background-position: center;
`
