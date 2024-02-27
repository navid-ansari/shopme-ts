import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IProduct } from '../../types/Product'

const initialState: IProduct[] = []

const defaultItem = (favorites: IProduct[], payload: IProduct) => {
  return [payload, ...favorites]
}

const findItem = (favorites: IProduct[], payload: IProduct) => {
  const idx = favorites.findIndex((favorite: IProduct) => favorite.id === payload.id)
  if (idx !== -1) {
    return favorites.filter((favorite: IProduct) => favorite.id !== payload.id)
  } else {
    return [payload, ...favorites]
  }
}

const favoriteSlice = createSlice({
  name: 'favrite',
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<IProduct>) => {
      return state.length === 0 ? defaultItem(state, action.payload) : findItem(state, action.payload)
    }
  }
})

export const { setFavorites } = favoriteSlice.actions

export default favoriteSlice.reducer
