import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {},
  reducers: {
    setUserInfo: (state, action) => {
      state = action.payload
    },
  },
})

export default userSlice

export const { setUserinfo } = userSlice.actions
