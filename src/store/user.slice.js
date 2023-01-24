import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  surnames: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload
    },
    setSurnames: (state, action) => {
      state.surnames = action.payload
    },
  },
})

export const { setName, setSurnames } = userSlice.actions

export default userSlice.reducer
