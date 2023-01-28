import { createSlice } from '@reduxjs/toolkit'
import defaultProfileImg from 'assets/img/default_profile_img.jpg'

// 유저 정보를 저장하는 Slice
const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    id: 'ssafy01',
    name: '김이박',
    nickname: '별명',
    email: 'afdsdfsd@naver.com',
    score: 100,
    joinDatetime: '2017-12-31 10:10:00',
    profileImage: defaultProfileImg,
  },
  reducers: {
    // 유저 정보 업데이트
    setUserInfo: (state, action) => {
      return action.payload
    },
  },
})

export default userSlice

export const { setUserInfo } = userSlice.actions
