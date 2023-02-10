import store from 'redux/store'

export default function getLogin() {
  const state = store.getState()
  const expiration = state.expiration // 리덕스에서 토큰 만료 시점 조회
  const isLogin = expiration > new Date().getTime() ? true : false // 토큰만료시점과 현재시간을 비교하여 로그인 여부 판단

  return isLogin // Boolean 값으로 로그인 여부 반환
}
