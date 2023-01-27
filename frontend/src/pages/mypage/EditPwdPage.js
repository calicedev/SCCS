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
  // 리덕스
  const user = useSelector((state) => state.user)

  const [password, setPassword] = useAuthInput('password', '')
  const [newPassword, setNewPassword, newPwdMsg] = useAuthInput('password', '')
  const [confirmPassword, setConfirmPassword, confirmPwdMsg] = useConfirmPwd(
    '',
    newPassword,
  )

  const joinDate = useMemo(() => {
    return user.joinDatetime.slice(0, 10)
  }, [user])

  const navigate = useNavigate()

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
        가입일: {joinDate}
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

      <Buttons>
        <OutlineButton
          value="Cancel"
          onClick={() => {
            navigate('/mypage/profile')
          }}
        ></OutlineButton>
        <Button value="Save" onClick={save}></Button>
      </Buttons>
    </ProfileContent>
  )
}

const ProfileContainer = styled.div`
  position: absolute;
  top: 2rem;
  right: 0rem;
`
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 0rem;
`

const ProfileContent = styled.div`
  display: flex;
  position: absolute;
  border-radius: 10px;
  flex-direction: column;
  min-height: 100%;
  width: 70%;
`

const EditBtns = styled.div`
  display: flex;
  justify-content: start;
`

const Buttons = styled.div`
  align-self: start;
`
