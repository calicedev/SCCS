import getUserInfo from 'libs/getUserInfo'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import checkLogin from 'libs/checkLogin'

export default function useUser() {
  const user = useSelector((state) => state.user)
  const isLogin = checkLogin()

  useEffect(() => {
    if (!user && isLogin) {
      getUserInfo()
    }
  }, [isLogin])

  return user
}
