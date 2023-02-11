import store from 'redux/store'

/*
refresh토큰의 만료시점을 조회하여 로그인 여부 판단
*/

export default function checkLogin() {
  const state = store.getState()
  const expiration = state.expiration // 리덕스에서 토큰 만료 시점 조회

  // 토큰 만료시점 정보가 있을 경우
  if (expiration) {
    return expiration > new Date().getTime() ? true : false // 토큰만료시점과 현재시간을 비교하여 로그인 여부 판단
  }

  // 토큰 만료시점 정보가 없을 경우
  return false
}
