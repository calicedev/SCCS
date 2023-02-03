import { createSlice } from '@reduxjs/toolkit'

const tokenSlice = createSlice({
  name: 'tokenSlice',
  initialState: {
    accessToken: '',
    refreshToken: '',
  },
  reducers: {
    setTokens: (state, action) => {
      console.log('setTokens', action.payload)
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
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
