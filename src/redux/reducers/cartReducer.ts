import { ActionTypes } from '../constants/action-types'

const defaultCart = (cartItems: any, payload: any) => {
  return [payload, ...cartItems]
}

const toggleCart = (cartItems: any, payload: any) => {
  const idx = cartItems.findIndex((item: any) => item.id === payload.id)
  if (idx !== -1) {
    return cartItems.filter((product: any) => product.id !== payload.id)
  } else {
    return [payload, ...cartItems]
  }
}

export const cartReducer = (
  state = [],
  { type, payload }: { type: any; payload: any }
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
