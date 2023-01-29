import axios from 'axios'
import store from 'redux/store'

/*
서버에 요청을 날리는 axios instance
https://yamoo9.github.io/axios/guide/api.html#%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4-%EC%83%9D%EC%84%B1
*/

const apiRequest = axios.create({
  baseURL: 'http://localhost:8080', // 서버 주소
  withCredentials: true,
})

// request 인터셉터
apiRequest.interceptors.request.use(
  (config) => {
    const state = store.getState()
    const accessToken = state.accessToken
    console.log('access', accessToken)
    if (!accessToken) return config
    // token이 있을 경우 헤더에 추가
    return {
      ...config,
      headers: { Authorization: accessToken },
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
  (error) => {
    return Promise.reject(error.message)
  },
)

export default apiRequest
