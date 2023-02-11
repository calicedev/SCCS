import getUserInfo from 'libs/getUserInfo'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import checkLogin from 'libs/checkLogin'
import { useNavigate } from 'react-router-dom'

export default function useUser() {
  // 리액트 훅 관련 함수 정의
  const navigate = useNavigate()

  // 1. 리덕스에 유저 정보가 있을 경우
  const user = useSelector((state) => state.user)
  if (user) return user // 해당 정보를 바로 반환

  // 2. 리덕스에 유저 정보가 없을 경우
  const isLogin = checkLogin()
  // 2-1. 로그인이 만료된 사용자는 재로그인
  if (!isLogin) {
    alert('재로그인 해주세요')
    navigate('/auth/login')
    return
  }
  // 2-2. 로그인이 만료되지 않은 사용자는 서버로 유저정보 재요청해서 반환
  getUserInfo('refrehsed')
  return {}
}
