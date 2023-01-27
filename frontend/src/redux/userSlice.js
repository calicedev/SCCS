import { createSlice } from '@reduxjs/toolkit'
import defaultProfileImg from 'assets/img/default_profile_img.jpg'

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
    setUserInfo: (state, action) => {
      state = action.payload
    },
  },
})

export default userSlice

export const { setUserinfo } = userSlice.actions
