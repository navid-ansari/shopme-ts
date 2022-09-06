import { IProduct } from '../../types/Product'
import { ActionTypes } from '../constants/action-types'

export const toggleFavoriteProduct = (product: IProduct) => {
  return {
    type: ActionTypes.FAVOURITE_PRODUCTS,
    payload: product
  }
}
