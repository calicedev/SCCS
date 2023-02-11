import { createSlice } from '@reduxjs/toolkit'

// 유저 정보를 저장하는 Slice
const userSlice = createSlice({
  name: 'userSlice',
  initialState: null,
  reducers: {
    // 유저 정보 업데이트
    setUserInfo: (state, action) => {
      return action.payload
    },
    deleteUserInfo: (state, action) => {
      return null
    },
  },
})

export default userSlice

export const { setUserInfo, deleteUserInfo } = userSlice.actions

// {
//   id: 'ssafy01',
//   nickname: 'ssafy01',
//   email: 'lbh@naver.com',
//   score: 100,
//   joinDate: '2021-12-23',
//   profileImage: defaultProfileImg
// }
