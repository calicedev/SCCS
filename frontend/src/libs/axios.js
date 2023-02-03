import axios from 'axios'
import api from 'constants/api'
import store from 'redux/store'
import { setUserInfo } from 'redux/userSlice'
import { redirect } from 'react-router-dom'

/*
서버에 요청을 날리는 axios instance
https://yamoo9.github.io/axios/guide/api.html#%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4-%EC%83%9D%EC%84%B1
*/

const apiRequest = axios.create({
  baseURL: 'http://sccs.kr:8200', // 서버 주소

  withCredentials: true,
})

// request 인터셉터
apiRequest.interceptors.request.use(
  (config) => {
    const state = store.getState()
    const accessToken = state.token.accessToken
    // accessToken이 없을 경우 헤더 없이 요청
    if (!accessToken) return config
    // accessToken이 있을 경우 Authorization헤더에 추가해서 요청
    return {
      ...config,
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  },
  (error) => {
    return Promise.reject(error)
  },
)

// response 인터셉터
apiRequest.interceptors.response.use(
  (response) => {
    return response
  },
  // accesstoken 재발급 로직
  (error) => {
    // const { originalConfig, response } = error
    // if (response.errCode === 403) {
    //   // accessToken 재발급 요청
    //   const [url, method] = api('refreshToken')
    //   const config = { url, method }
    //   axios(config)
    //     // accessToken 재발급 성공
    //     .then((res) => {
    //       const newAccessToken = res.data.accessToken
    //       store.dispatch(setUserInfo(res.data))
    //       originalConfig.headers.Authorization = `Bearer ${newAccessToken}`
    //       // 기존 요청을 새로운 accessToken으로 재요청
    //       return apiRequest(originalConfig)
    //     })
    //     // accessToken 재발급 실패
    //     .catch(() => {
    //       alert('다시 로그인 해주세요')
    //       return redirect('/auth/login')
    //     })
    // }
    return Promise.reject(error)
  },
)

export default apiRequest
