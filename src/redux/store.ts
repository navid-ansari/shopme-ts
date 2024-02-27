import { configureStore } from '@reduxjs/toolkit'
import productsSlice from './slices/productsSlice'
import cartSlice from './slices/cartSlice'
import favoriteSlice from './slices/favoriteSlice'
import productDetailsSlice from './slices/productDetailsSlice'

const store = configureStore({
  reducer: {
    products: productsSlice,
    product: productDetailsSlice,
    cart: cartSlice,
    favorites: favoriteSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
