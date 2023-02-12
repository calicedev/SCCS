import { redirect } from 'react-router-dom'
import store from 'redux/store'
import checkLogin from './checkLogin'
import getUserInfo from './getUserInfo'

/*
refresh토큰의 만료시점을 조회하여 로그인 여부 판단
*/

export default async function getUser() {
  const state = store.getState()
  const user = state.user
  const isLogin = checkLogin()
  // 1. 리덕스에 유저 정보가 있을 경우
  if (user) return user
  // 2. 로그인이 만료되었을 경우
  if (!isLogin) {
    alert('다시 로그인 해주세요')
    return redirect('/auth/login')
  }
  // 3. 로그인이 유효하지만, 유저정보가 없을 경우
  const requestedUser = await getUserInfo('refrehsed')
  console.log('getUser', requestedUser)
  return requestedUser
}
