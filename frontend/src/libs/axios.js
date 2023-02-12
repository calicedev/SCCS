import axios from 'axios'
import api from 'constants/api'
import { redirect } from 'react-router-dom'

/*
서버에 요청을 날리는 axios instance
https://yamoo9.github.io/axios/guide/api.html#%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4-%EC%83%9D%EC%84%B1
*/

const apiRequest = axios.create({
  baseURL: 'https://sccs.kr', // 서버 주소
  withCredentials: true, // 쿠키 사용을 위해 설정
})

// request 인터셉터
apiRequest.interceptors.request.use(
  (config) => {
    // // accessToken이 있을 경우 Authorization헤더에 추가해서 요청
    // const state = store.getState()
    // const accessToken = state.token.accessToken
    // if (!accessToken) return config
    // config.headers.Authorization = `Bearer ${accessToken}`
    // return {
    //   ...config,
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// response 인터셉터
apiRequest.interceptors.response.use(
  (response) => {
    console.log('response', response)
    return response
  },
  async (error) => {
    console.log('error', error)
    const originalConfig = error.config // 기존 요청 정보 저장
    const response = error.response // 에러 정보 추출
    // accesstoken 재발급 로직
    if (
      response.status === 400 &&
      response.data.errorMessage === 'accessToken expired'
    ) {
      console.log('accessToken 재발급 요청 보냄')
      // accessToken 재발급 요청
      const [url, method] = api('refreshToken')
      const config = { url, method }
      await axios
        .request(config)
        .then((res) => {
          console.log('accessToken 재발급 요청 response', res)
          // accessToken 재발급 성공 시, 새로운 accessToken으로 기존 요청 반복
          return apiRequest(originalConfig)
        })
        .catch((err) => {
          console.log('accessToken 재발급 요청 error', err)
          // accessToken 재발급 실패 시, 로그인 페이지로 사용자 이동
          alert('다시 로그인 해주세요')
          return redirect('/auth/login')
        })
    }
    return Promise.reject(error)
  },
)

export default apiRequest
