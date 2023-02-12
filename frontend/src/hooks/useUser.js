import getUserInfo from 'libs/getUserInfo'
import { useSelector } from 'react-redux'
import checkLogin from 'libs/checkLogin'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default async function useUser() {
  // 리액트 훅 관련 함수 정의
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const isLogin = checkLogin()

  useEffect(() => {
    // 1. 로그인이 만료되었을 경우
    if (!isLogin) {
      alert('다시 로그인 해주세요')
      navigate('/auth/login')
      return
    }
    // 2. 로그인이 유효하지만, 유저정보가 없을 경우
    if (!user) {
      getUserInfo('refrehsed')
      return
    }
  }, [])

  // 3. 유저 정보가 있을 경우 해당 유저 정보를 반환
  if (user) return user // 해당 정보를 바로 반환
  return {}
}
