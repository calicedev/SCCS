import { createSlice } from '@reduxjs/toolkit'
import defaultProfileImg from 'assets/img/default_profile_img.jpg'

// 유저 정보를 저장하는 Slice
const userSlice = createSlice({
  name: 'userSlice',
  initialState: null,
  reducers: {
    // 유저 정보 업데이트
    setUserInfo: (state, action) => {
      const userInfo = action.payload
      if (!userInfo.profileImage) userInfo.profileImage = defaultProfileImg
      return action.payload
    },
    deleteUserInfo: (state, action) => {
      console.log(1)
      return null
    },
  },
})

export default userSlice

export const { setUserInfo, deleteUserInfo } = userSlice.actions
