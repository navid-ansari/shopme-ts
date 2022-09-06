import { ActionTypes } from '../constants/action-types'

export const cartAction = (product: any) => {
  return {
    type: ActionTypes.CART,
    payload: product
  }
}
