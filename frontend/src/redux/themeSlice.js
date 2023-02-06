import { createSlice } from '@reduxjs/toolkit'

// theme을 저장하는 Slice
const themeSlice = createSlice({
  name: 'themeSlice',
  initialState: 'light',
  reducers: {
    toggleTheme: (state, paylaod) => {
      if (state === 'light') return 'dark'
      return 'light'
    },
  },
})

export default themeSlice

export const { toggleTheme } = themeSlice.actions
