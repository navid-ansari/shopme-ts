import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IProduct } from '../../types/Product'

const initialState: IProduct[] = []

const defaultCart = (cartItems: IProduct[], payload: IProduct) => {
  return [payload, ...cartItems]
}

const toggleCart = (cartItems: IProduct[], payload: IProduct) => {
  const idx = cartItems.findIndex((item: IProduct) => item.id === payload.id)
  if (idx !== -1) {
    return cartItems.filter((product: IProduct) => product.id !== payload.id)
  } else {
    return [payload, ...cartItems]
  }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<IProduct>) => {
      return state.length === 0 ? defaultCart(state, action.payload) : toggleCart(state, action.payload)
    }
  }
})

export const { setCart } = cartSlice.actions

export default cartSlice.reducer
