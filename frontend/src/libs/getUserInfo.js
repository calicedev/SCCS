import store from 'redux/store'
import getLogin from 'libs/getLogin'
import requestUserInfo from 'libs/requestUserInfo'

/*
유저 정보를 반환해주는 함수
로컬(세션)스토리지에 사용자 정보를 저장하지 않는다.
*/

export default function getUserInfo() {
  // 리덕스에 사용자 정보가 있을 경우, 해당 정보 반환
  const state = store.getState()
  const reduxUser = state.user
  if (reduxUser) return reduxUser

  // 리덕스에 사용자 정보가 없을 경우, 로그인 여부를 확인
  const islogin = getLogin()

  // 로그인 하였을 경우, 사용자 정보를 서버에 재요청 하여 해당 정보 반환
  if (islogin) {
    return requestUserInfo()
  }
  // 로그인 하지 않았을 경우, 사용자 정보를 null로 반환
  return null
}
