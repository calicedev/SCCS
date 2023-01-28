import React, { useMemo } from 'react'
import styled from 'styled-components'
import ProfileInput from 'components/mypage/ProfileInput'
import Button from 'components/common/Button'
import OutlineButton from 'components/common/OutlineButton'
import ProfileImg from 'components/common/ProfileImg'
import { useNavigate } from 'react-router-dom'
import { useAuthInput } from 'hooks/useAuthInput'
import { useConfirmPwd } from 'hooks/useConfirmPwd'
import { useSelector } from 'react-redux'

export default function PasswordEdit() {
  // 리액트 훅관련 함수 정의
  const navigate = useNavigate()

  // 리덕스 -> 사용자 정보 읽어오기
  const user = useSelector((state) => state.user)

  // 커스텀 훅 useAuthInput(타입, 초깃값, 정규식검사여부, 서버검사여부)
  const [password, setPassword] = useAuthInput('password', '')
  const [newPassword, setNewPassword, newPwdMsg] = useAuthInput('password', '')
  // 커스텀 훅 useConrimPwd(초깃값, 비교할 비밀번호 값)
  const [confirmPassword, setConfirmPassword, confirmPwdMsg] = useConfirmPwd(
    '',
    newPassword,
  )

  // 가입 일자 YYYY-MM-DD
  const joinDate = useMemo(() => {
    return user.joinDatetime.slice(0, 10)
  }, [user])

  // 수정 정보 저장
  const save = () => {}

  return (
    <ProfileContent>
      <h1>Edit Profile</h1>

      <EditBtns>
        <Button
          value="기본정보"
          type="secondary"
          onClick={() => {
            navigate('/mypage/profile/edit')
          }}
        ></Button>
        <Button value="비밀번호"></Button>
      </EditBtns>

      <ProfileContainer>
        <ProfileImg />
        <p className="semi-bold">Joined at: {joinDate}</p>
      </ProfileContainer>

      <InputContainer>
        <ProfileInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></ProfileInput>
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
      </InputContainer>

      <ButtonContainer>
        <OutlineButton
          value="Cancel"
          type="secondary"
          onClick={() => {
            navigate('/mypage/profile')
          }}
        ></OutlineButton>
        <Button value="Save" onClick={save}></Button>
      </ButtonContainer>
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

const EditBtns = styled.div`
  display: flex;
  justify-content: start;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`
