import { ActionTypes } from '../constants/action-types'

const defaultItem = (favorites: any, payload: any) => {
  return [payload, ...favorites]
}

const findItem = (favorites: any, payload: any) => {
  const idx = favorites.findIndex((favorite: any) => favorite.id === payload.id)
  if (idx !== -1) {
    return favorites.filter((favorite: any) => favorite.id !== payload.id)
  } else {
    return [payload, ...favorites]
  }
}

export const toggleFavoriteReducer = (
  state = [],
  { type, payload }: { type: any; payload: any }
) => {
  switch (type) {
    case ActionTypes.FAVOURITE_PRODUCTS:
      return state.length === 0
        ? defaultItem(state, payload)
        : findItem(state, payload)
    default:
      return state
  }
}
