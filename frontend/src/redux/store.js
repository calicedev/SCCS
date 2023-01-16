import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'

const store = configureStore({
  reducer: {
    // 실제 store에 저장되는 이름
    user: userSlice.reducer,
  },
})
export default store
