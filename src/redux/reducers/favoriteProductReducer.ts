import { IProduct } from '../../types/Product'
import { ActionTypes } from '../constants/action-types'

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

export const toggleFavoriteReducer = (
  state = [],
  { type, payload }: { type: string; payload: IProduct }
) => {
  switch (type) {
    case ActionTypes.FAVOURITE_PRODUCTS:
      return state.length === 0 ? defaultItem(state, payload) : findItem(state, payload)
    default:
      return state
  }
}
