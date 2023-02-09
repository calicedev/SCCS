import React from 'react'
import styled from 'styled-components'
import ProfileImg from 'components/common/ProfileImg'
import PropTypes from 'prop-types'

/*
프로필 이미지 수정 컴포넌트

imgUrl: 현재 화면에 표시할 이미지 url
onChange: 사진 선택 시 동작할 함수
onDelete: 쓰레기통 아이콘 버튼 클릭 시 동작할 함수
*/

export default function ProfileImgInput({ imgUrl, onChange, onDelete }) {
  return (
    <>
      <ProfileImg imgUrl={imgUrl}></ProfileImg>
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
