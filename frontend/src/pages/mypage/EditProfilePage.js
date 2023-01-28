import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import ProfileInput from 'components/mypage/ProfileInput'
import Button from 'components/common/Button'
import OutlineButton from 'components/common/OutlineButton'
import ProfileImgInput from 'components/mypage/ProfileImgInput'
import { useNavigate } from 'react-router-dom'
import { useAuthInput } from 'hooks/useAuthInput'
import { useSelector } from 'react-redux'

export default function ProfileEdit() {
  // 리액트 훅관련 함수 정의
  const navigate = useNavigate()

  // 리덕스 -> 사용자 정보 읽어오기
  const user = useSelector((state) => state.user)

  // 커스텀 훅 useAuthInput(타입, 초깃값, 정규식검사여부, 서버검사여부)
  const [nickname, setNickname, nicknameMsg] = useAuthInput(
    'nickname',
    user.nickname,
    true,
    true,
  )
  const [email, setEmail, emailMsg] = useAuthInput(
    'email',
    user.email,
    true,
    false,
  )
  // useState
  const [img, setImg] = useState(user.profileImage)

  // useMemo
  // // 서버에서 받은 정보는 img url이 string값 그대로지만, edit시에는 파일이 업로드 됨으로 url 주소를 추출
  const imgUrl = useMemo(() => {
    if (typeof img === 'string') {
      return img
    }
    return URL.createObjectURL(img[0])
  }, [img])

  // 수정 정보 저장 서버요청
  const save = () => {}

  // 회원탈퇴 서버요청
  const withdrawl = () => {}

  return (
    <ProfileContent>
      <h1>Edit Profile</h1>

      <EditBtns>
        <Button value="기본정보" type="primary"></Button>
        <Button
          value="비밀번호"
          type="secondary"
          onClick={() => {
            navigate('/mypage/profile/editpassword')
          }}
        ></Button>
      </EditBtns>

      <ProfileContainer>
        <ProfileImgInput
          imgUrl={imgUrl}
          onChange={(e) => setImg(e.target.files)}
          onDelete={() => setImg('')}
        ></ProfileImgInput>
      </ProfileContainer>

      <InputContainer>
        <ProfileInput type="id" value={user.id} disabled={true}></ProfileInput>
        <Flexbox>
          <ProfileInput
            type="name"
            value={user.name}
            disabled={true}
          ></ProfileInput>
          <ProfileInput
            type="nickname"
            message={nicknameMsg}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          ></ProfileInput>
        </Flexbox>
        <ProfileInput
          type="email"
          value={email}
          message={emailMsg}
          onChange={(e) => setEmail(e.target.value)}
        ></ProfileInput>
      </InputContainer>

      <Buttons>
        <OutlineButton
          value="회원탈퇴"
          type="danger"
          onClick={withdrawl}
        ></OutlineButton>
        <div>
          <OutlineButton
            value="Cancel"
            type="secondary"
            onClick={() => {
              navigate('/mypage/profile')
            }}
          ></OutlineButton>
          <Button value="Save" onClick={save}></Button>
        </div>
      </Buttons>
    </ProfileContent>
  )
}

const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;

  margin: 5rem 5rem;
  max-width: 700px;

  width: 100%;
`

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;

  position: absolute;
  top: 2rem;
  right: 0rem;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin: 2rem 0rem;
`

const Flexbox = styled.div`
  display: flex;
`

const EditBtns = styled.div`
  display: flex;
  justify-content: start;
`

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`
