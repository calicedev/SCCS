import getUserInfo from 'libs/getUserInfo'
import { useSelector } from 'react-redux'

export default function useUser() {
  const user = useSelector((state) => state.user)

  if (!user) {
    getUserInfo()
  }

  return user
}
