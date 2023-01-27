import React, { useState } from 'react'
import styled from 'styled-components'
import ProfileImg from 'components/atoms/ProfileImg'
import IconButton from 'components/atoms/IconButton'
import { FaTrash } from 'react-icons/fa'

export default function ProfileImgInput({ imgUrl, onChange, onDelete }) {
  //파일 미리볼 url을 저장해줄 state
  // const [fileImage, setFileImage] = useState('')

  // // 파일 저장
  // const saveFileImage = (e) => {
  //   setFileImage(URL.createObjectURL(e.target.files[0]))
  // }

  // // 파일 삭제
  // const deleteFileImage = () => {
  //   URL.revokeObjectURL(fileImage)
  //   setFileImage('')
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
        <IconButton icon={<FaTrash />} onClick={onDelete} />
      </Flexbox>
    </>
  )
}

const Flexbox = styled.div`
  display: flex;
`

const Input = styled.input`
  width: 15rem;
`
