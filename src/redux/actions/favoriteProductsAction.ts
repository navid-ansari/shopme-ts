import { ActionTypes } from '../constants/action-types'

export const toggleFavoriteProduct = (products: any) => {
  return {
    type: ActionTypes.FAVOURITE_PRODUCTS,
    payload: products
  }
}
