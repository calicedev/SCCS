import axios from 'axios'

const apiRequest = axios.create({
  baseURL: 'http://localhost:3000',
})

apiRequest.interceptors.request.use(
  (config) => {
    return {
      ...config,
      // headers: { Authorization: null },
    }
  },
  (error) => {
    return Promise.reject(error)
  },
)

apiRequest.interceptors.response.use(
  (response) => {
    // 그 함수
    return response
  },
  (error) => {
    return Promise.reject(error.message)
  },
)

export default apiRequest
