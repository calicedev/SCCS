import { createSlice } from '@reduxjs/toolkit'

const tokenSlice = createSlice({
  name: 'tokenSlice',
  initialState: {
    accessToken: '',
    refreshToken: '',
  },
  reducers: {
    setTokens: (state, action) => {
      return action.payload
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload
    },
  },
})

export default tokenSlice

export const { setTokens, setAccessToken, setRefreshToken } = tokenSlice.actions
