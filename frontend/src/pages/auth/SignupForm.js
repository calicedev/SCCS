import styled from 'styled-components'
import Button from 'components/atoms/Button'
import AuthInput from 'components/atoms/AuthInput'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthInput } from 'hooks/useAuthInput'
import { useConfirmPwd } from 'hooks/useConfirmPwd'
import Typo, { TypoCss } from 'styles/Typo'
import axios from 'libs/axios'
import api from 'apis/api'

export default function SignupForm() {
  const navigate = useNavigate()

  // useAuthInput(타입, 초깃값, 정규식검사, 서버검사)
  const [id, setId, idMsg] = useAuthInput('id', '', true, true)
  const [name, setName, nameMsg] = useAuthInput('name', '', true, false)
  const [nickname, setNickname, nicknameMsg] = useAuthInput(
    'nickname',
    '',
    true,
    true,
  )
  const [email, setEmail, emailMsg] = useAuthInput('email', '', true, false)
  const [password, setPassword, passwordMsg] = useAuthInput(
    'password',
    '',
    true,
    false,
  )
  const [confirmPwd, setConfirmPwd, confirmPwdMsg] = useConfirmPwd('', password)

  // 회원가입 서버 요청
  const signup = () => {
    if (
      !idMsg.isValid ||
      !nameMsg.isValid ||
      !nicknameMsg.isValid ||
      !emailMsg.isValid ||
      !passwordMsg.isValid ||
      !confirmPwdMsg.isValid
    ) {
      alert('입력 양식을 모두 유효하게 입력해주세요')
      return
    }
    const data = {
      id,
      name,
      nickname,
      email,
      password,
    }
    const [url, method] = api('signup')
    const config = { method, data }
    axios(url, config)
      .then((res) => {
        navigate('/main')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Flexbox>
      <Typo className="h1">Signup</Typo>
      <Typo>If you already have an account</Typo>
      <TypoLink to="/auth/login" className="pass" weight="500">
        Login here!
      </TypoLink>
      <Form>
        <AuthInput
          type="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          message={idMsg}
        ></AuthInput>
        <AuthInput
          type="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          message={nameMsg}
        ></AuthInput>
        <AuthInput
          type="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          message={nicknameMsg}
        ></AuthInput>
        <AuthInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          message={emailMsg}
        ></AuthInput>
        <AuthInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          message={passwordMsg}
        ></AuthInput>
        <AuthInput
          type="confirmPassword"
          value={confirmPwd}
          onChange={(e) => setConfirmPwd(e.target.value)}
          message={confirmPwdMsg}
        ></AuthInput>
      </Form>
      <Button size="medium" onClick={signup} value="회원가입"></Button>
    </Flexbox>
  )
}

const Flexbox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0rem 8rem;
`

const Form = styled.div`
  margin: 3em 0rem;
`

const TypoLink = styled(Link)`
  ${TypoCss}
`
