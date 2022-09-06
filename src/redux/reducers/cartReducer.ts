import { IProduct } from '../../types/Product'
import { ActionTypes } from '../constants/action-types'

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

export const cartReducer = (
  state = [],
  { type, payload }: { type: string; payload: IProduct }
) => {
  switch (type) {
    case ActionTypes.CART:
      return state.length === 0
        ? defaultCart(state, payload)
        : toggleCart(state, payload)
    default:
      return state
  }
}
