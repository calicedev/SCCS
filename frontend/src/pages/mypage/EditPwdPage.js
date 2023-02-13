import React from 'react'
import styled from 'styled-components'
import ProfileInput from 'components/mypage/ProfileInput'
import Button from 'components/common/Button'
import OutlineButton from 'components/common/OutlineButton'
import ProfileImg from 'components/common/ProfileImg'
import { useNavigate } from 'react-router-dom'
import { useAuthInput } from 'hooks/useAuthInput'
import { useConfirmPwd } from 'hooks/useConfirmPwd'
// import useUser from 'hooks/useUser'
import { useSelector } from 'react-redux'
import axios from 'libs/axios'
import api from 'constants/api'

export default function PasswordEdit() {
  // 리액트 훅관련 함수 정의
  const navigate = useNavigate()

  // 리덕스 -> 사용자 정보 읽어오기
  // const user = useSelector((state) => state.user)
  // const user = useUser()
  const user = useSelector((state) => state.user)


  // 커스텀 훅 useAuthInput(타입, 초깃값, 정규식검사여부, 서버검사여부)
  const [password, setPassword] = useAuthInput('password', '')
  const [newPassword, setNewPassword, newPwdMsg] = useAuthInput('password', '')
  // 커스텀 훅 useConrimPwd(초깃값, 비교할 비밀번호 값)
  const [confirmPassword, setConfirmPassword, confirmPwdMsg] = useConfirmPwd(
    '',
    newPassword,
  )

  // 수정 정보 저장
  const save = () => {
    // 모든 정보를 유효하게 입력했는지 확인
    if (!confirmPwdMsg.isValid) {
      alert('입력 양식을 모두 유효하게 입력해주세요')
      return
    }
    const data = {
      newPassword,
    }
    const [url, method] = api('updatePassword')
    const config = { url, method, data }
    axios(config)
      .then((res) => {
        navigate('/mypage/profile')
      })
      .catch((err) => {
        alert('서버와의 통신이 원활하지 않습니다.')
      })
  }

  return (
    <Container>
      <h1>Edit Profile</h1>

      <TapWrapper>
        <Button
          value="기본정보"
          type="secondary"
          onClick={() => {
            navigate('/mypage/profile/edit')
          }}
        ></Button>
        <Button value="비밀번호"></Button>
      </TapWrapper>

      <ProfileContainer>
        <ProfileImg imgUrl={user.profileImage} />
        <p className="semi-bold">가입일: {user.joinDate}</p>
      </ProfileContainer>

      <InputContainer>
        <ProfileInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></ProfileInput>
        <Flexbox>
          <ProfileInput
            type="newPassword"
            value={newPassword}
            message={newPwdMsg}
            onChange={(e) => setNewPassword(e.target.value)}
          ></ProfileInput>
          <ProfileInput
            type="confirmPassword"
            value={confirmPassword}
            message={confirmPwdMsg}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></ProfileInput>
        </Flexbox>
      </InputContainer>

      <ButtonWrapper>
        <OutlineButton
          value="Cancel"
          type="secondary"
          onClick={() => {
            navigate('/mypage/profile')
          }}
        ></OutlineButton>
        <Button value="Save" onClick={save}></Button>
      </ButtonWrapper>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;

  max-width: 700px;
  width: 100%;
  font-family: 'NanumSquareB';
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
const ButtonWrapper = styled.div`
  align-self: end;

  display: flex;
  justify-content: start;
  gap: 15px;
`
