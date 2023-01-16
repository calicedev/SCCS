import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'userSlice',
  initialState: { token: 0 },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    },
  },
})

export default userSlice
