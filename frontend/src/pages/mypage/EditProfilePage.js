import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import api from 'constants/api'
import axios from 'libs/axios'
import getUserInfo from 'libs/getUserInfo'
import Button from 'components/common/Button'
import ProfileInput from 'components/mypage/ProfileInput'
import OutlineButton from 'components/common/OutlineButton'
import ProfileImgInput from 'components/mypage/ProfileImgInput'
import { useProfileInput } from 'hooks/useProfileInput'

export default function ProfileEdit() {
  // 리액트 훅관련 함수 정의
  const navigate = useNavigate()

  // 리덕스에서 사용자 정보 읽어오기
  const user = useSelector((state) => state.user)

  // 커스텀 훅 useProfileInput(타입, 초깃값, 정규식검사여부, 서버검사여부)
  const [nickname, setNickname, nicknameMsg, nicknameIsChanged] =
    useProfileInput('nickname', user.nickname, true, true)
  const [email, setEmail, emailMsg, emailIsChanged] = useProfileInput(
    'email',
    user.email,
    true,
    true,
  )
  const [img, setImg] = useState(user.profileImage)

  // 서버에서 받은 정보는 img url이 string값 그대로지만, edit시에는 파일이 업로드 됨으로 url 주소를 추출
  const imgUrl = useMemo(() => {
    if (img === null) {
      return img
    }
    if (typeof img === 'string') {
      return img
    }
    return URL.createObjectURL(img[0])
  }, [img])

  // 정보수정 서버요청
  const save = () => {
    // 데이터가 변하지 않은 경우, 해당 항목을 null값으로 보냄
    const data = {
      nickname: nicknameIsChanged ? nickname : null,
      email: emailIsChanged ? email : null,
      mfile: typeof img === 'string' || img === null ? null : img[0],
    }
    const headers = { 'Content-Type': 'multipart/form-data' }
    const [url, method] = api('updateUserInfo')
    const config = { url, method, data, headers }
    axios(config)
      .then((res) => {
        getUserInfo()
        navigate('/mypage/profile')
      })
      .catch((err) => {})
  }

  // 회원탈퇴 서버 요청
  const withdrawl = () => {
    const data = {
      id: user.id,
    }
    const [url, method] = api('login')
    const config = { url, method, data }
    axios(config)
      .then((res) => {})
      .catch((err) => {})
  }

  return (
    <Container>
      <h1>Edit Profile</h1>

      <TapWrapper>
        <Button value="기본정보" type="primary" size="small"></Button>
        <Button
          value="비밀번호"
          type="secondary"
          size="small"
          onClick={() => {
            navigate('/mypage/profile/editpassword')
          }}
        ></Button>
      </TapWrapper>

      <ProfileContainer>
        <ProfileImgInput
          src={imgUrl}
          onChange={(e) => setImg(e.target.files)}
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

      <Flexbox>
        <OutlineButton
          value="회원탈퇴"
          type="danger"
          onClick={withdrawl}
        ></OutlineButton>
        <TapWrapper>
          <OutlineButton
            value="Cancel"
            type="gray"
            onClick={() => {
              navigate('/mypage/profile')
            }}
          ></OutlineButton>
          <OutlineButton value="Save" onClick={save}></OutlineButton>
        </TapWrapper>
      </Flexbox>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;

  width: 100%;
  max-width: 700px;

  padding: 2rem;
`

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;

  position: absolute;
  top: 3.5rem;
  right: 2rem;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin: 2rem 0rem;
`

const Flexbox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`

const TapWrapper = styled.div`
  display: flex;
  justify-content: start;
  gap: 15px;
`
