import { createSlice } from '@reduxjs/toolkit'

const expSlice = createSlice({
  name: 'expSlice',
  initialState: null,
  reducers: {
    setExpiration: (state, action) => {
      return action.payload
    },
  },
})

export default expSlice

export const { setExpiration } = expSlice.actions
