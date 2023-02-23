import { createSlice } from '@reduxjs/toolkit'

const roomSlice = createSlice({
  name: 'expSlice',
  initialState: {},
  reducers: {
    setReduxRoomInfo: (state, action) => {
      return { state, ...action.payload }
    },
    setReduxMembers: (state, action) => {
      state.members = action.payload
    },
    setReduxProblems: (state, action) => {
      state.problems = action.payload
    },
    setReduxPresenter: (state, action) => {
      state.presenter = action.payload
    },
    setReduxIsScreenShare: (state, action) => {
      state.isScreenShare = action.payload
    },
    setReduxMainStreamManager: (state, action) => {
      state.mainStreamManager = action.payload
    },
    setReduxFinished: (state, action) => {
      state.finished = action.payload
    },
    setReduxFinishedObject: (state, action) => {
      state.finishedObject = action.payload
    },
    deleteRoom: (state, action) => {
      return {}
    },
  },
})

export default roomSlice

export const {
  setReduxRoomInfo,
  setReduxMembers,
  setReduxProblems,
  setReduxPresenter,
  setReduxIsScreenShare,
  setReduxMainStreamManager,
  deleteRoom,
  setReduxFinished,
  setReduxFinishedObject,
} = roomSlice.actions
