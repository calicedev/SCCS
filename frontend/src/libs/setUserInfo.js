import store from 'redux/store'
import { setUserInfo } from 'redux/userSlice'
import axios from 'libs/axios'
import api from 'apis/api'

export default function getSetUserInfo(id) {
  const [url, method] = api('getUserInfo', { id })
  const config = { method }
  axios(url, config)
    .then((res) => {
      store.dispatch(setUserInfo(res.data))
    })
    .catch((err) => {
      console.log(err)
      store.dispatch(
        setUserInfo({
          id: 'ssafy05',
          name: '김이박뉴',
          nickname: '별명뉴',
          email: 'afdsdfsd@newnaver.com',
          score: 1000,
          joinDatetime: '2021-12-31 10:10:00',
          profileImage: '',
        }),
      )
    })
}
