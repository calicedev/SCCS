import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ProfileImg from 'components/common/ProfileImg'

/*
프로필 이미지 수정 컴포넌트

src: 현재 화면에 표시할 이미지 url
onChange: 사진 선택 시 동작할 함수
onDelete: 쓰레기통 아이콘 버튼 클릭 시 동작할 함수
*/

export default function ProfileImgInput({ src, onChange, onDelete }) {
  return (
    <>
      <ProfileImg src={src}></ProfileImg>
      <Flexbox>
        <Input
          name="imgUpload"
          type="file"
          accept="image/*"
          onChange={onChange}
        />
      </Flexbox>
    </>
  )
}

ProfileImgInput.propTypes = {
  imgUrl: PropTypes.string,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
}

ProfileImgInput.derfaultProps = {
  imgUrl: '',
  onChange: undefined,
  onDelete: undefined,
}

const Flexbox = styled.div`
  display: flex;
`

const Input = styled.input`
  width: 15rem;
`
