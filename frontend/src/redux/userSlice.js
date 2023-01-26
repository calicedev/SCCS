import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    id: 1,
    name: '김이박',
    nickname: '별명',
    email: 'afdsdfsd@naver.com',
    score: 100,
    join_date: '2017-12-31 10:10:00',
    profile_image: 'url',
  },
  reducers: {
    setUserInfo: (state, action) => {
      state = action.payload
    },
  },
})

export default userSlice

export const { setUserinfo } = userSlice.actions
