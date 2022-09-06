import { IProduct } from '../../types/Product'
import { ActionTypes } from '../constants/action-types'

export const cartAction = (product: IProduct) => {
  return {
    type: ActionTypes.CART,
    payload: product
  }
}
