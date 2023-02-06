import store from 'redux/store'
import { setUserInfo } from 'redux/userSlice'
import axios from 'libs/axios'
import api from 'constants/api'

/*
서버로부터 유저 정보를 받아와서 리덕스에 저장하는 라이브러리

INPUT
id: 유저의 아이디
*/

export default function getSetUserInfo(id) {
  // 서버에 사용자 정보 요청
  const [url, method] = api('getUserInfo', { id })
  const config = { method }

  axios(url, config)
    .then((res) => {
      // 리덕스에 사용자 정보 저장
      console.log(res)
      store.dispatch(setUserInfo(res.data.data))
    })
    .catch((err) => {
      console.log(err)
    })
}
