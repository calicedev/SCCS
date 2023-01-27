import axios from 'axios'

// https://yamoo9.github.io/axios/guide/api.html#%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4-%EC%83%9D%EC%84%B1

const apiRequest = axios.create({
  baseURL: 'http://localhost:8080',
})

apiRequest.interceptors.request.use(
  (config) => {
    return {
      ...config,
      withCredentials: true,
      // headers: { Authorization: null },
    }
  },
  (error) => {
    return Promise.reject(error)
  },
)

apiRequest.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error.message)
  },
)

export default apiRequest
