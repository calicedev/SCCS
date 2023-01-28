import { Cookies } from 'react-cookie'

/*
쿠키 관리를 위한 라이브러리
*/

const cookies = new Cookies()

export const setCookie = (name, value, options) => {
  return cookies.set(name, value, { ...options })
}

export const getCookie = (name) => {
  return cookies.get(name)
}

export const removeCookie = (name) => {
  return cookies.remove(name)
}
