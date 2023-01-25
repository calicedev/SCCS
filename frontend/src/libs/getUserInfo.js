import axios from 'libs/axios'
import api from 'apis/api'
import { setUserInfo } from 'redux/userSlice'
import { useDispatch } from 'react-redux'

export default function getUserInfo(id) {
  const dispatch = useDispatch()

  const [url, method] = api('getUserInfo')
  const config = { method }
  axios(url, config)
    .then((res) => {
      dispatch(setUserInfo(res.data))
    })
    .catch((err) => {
      alert('회원정보를 불러오지 못했습니다.')
    })
}
