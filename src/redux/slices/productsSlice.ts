import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IProduct } from '../../types/Product'

const initialState: IProduct[] = []

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProducts: (state, action: PayloadAction<IProduct[]>) => {
      return [...action.payload]
    }
  }
})

export const { getProducts } = productsSlice.actions

export default productsSlice.reducer
