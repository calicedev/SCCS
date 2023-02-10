import store from 'redux/store'
import { setUserInfo } from 'redux/userSlice'
import axios from 'libs/axios'
import api from 'constants/api'

/*
서버로부터 유저 정보를 받아와서 리덕스에 저장하고, 반환하는 함수
*/

export default async function requestUserInfo(id) {
  // 서버에 사용자 정보 요청
  const [url, method] = api('getUserInfo')
  const config = { method }

  const userInfo = await axios(url, config)
    .then((res) => {
      // 리덕스에 사용자 정보 저장
      const userInfo = res.data
      store.dispatch(setUserInfo(userInfo))
      return userInfo
    })
    .catch((err) => {
      store.dispatch(
        setUserInfo({
          id: id,
          nickname: id,
          email: 'test@naver.com',
          score: 100,
          joinDate: '2023-01-01',
          profileImage: null,
        }),
      )
    })

  return userInfo
}
