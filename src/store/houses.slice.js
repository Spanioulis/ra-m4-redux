/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { urls } from '../constants'

export const fetchHouses = createAsyncThunk(
  'houses/fetchHouses',
  async (name, { rejectWithValue }) => {
    const response = await fetch(urls.houses)
    const data = await response.json()
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(data)
    }
    return data
  },
)

const initialState = {
  byId: {},
  allIds: [],
  cities: [],
  types: [],
  showHouses: 9,
  houseFilter: {
    filterCity: '',
    filterType: '',
  },
}

export const housesSlice = createSlice({
  name: 'houses',
  initialState,
  reducers: {
    setFilterCity: (state, action) => {
      state.filterCity = action.payload
    },
    setFilterType: (state, action) => {
      state.filterType = action.payload
    },
    setShowHouses: (state, action) => {
      state.showHouses = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHouses.pending, (state, action) => {
        console.log('fetchHouses.pending')
      })
      .addCase(fetchHouses.fulfilled, (state, action) => {
        action.payload.forEach((house) => {
          state.byId[house.id] = house
          if (!state.allIds.includes(house.id)) {
            state.allIds.push(house.id)
          }
          if (!state.cities.includes(house.city)) {
            state.cities.push(house.city)
          }
          if (!state.types.includes(house.type)) {
            state.types.push(house.type)
          }
        })
        console.log('fetchHouses.fullfiled')
      })
      .addCase(fetchHouses.rejected, (state, action) => {
        console.log('fetchHouses.rejected')
      })
  },
})

export const { setFilterCity, setFilterType, setShowHouses } =
  housesSlice.actions

export default housesSlice.reducer