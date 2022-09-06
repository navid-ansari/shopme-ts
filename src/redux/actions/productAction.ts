import { IProduct } from '../../types/Product'
import { ActionTypes } from '../constants/action-types'

export const setProducts = (products: IProduct[]) => {
  return {
    type: ActionTypes.SET_PRODUCTS,
    payload: products
  }
}

export const selectedProduct = (product: IProduct) => {
  return {
    type: ActionTypes.SELECTED_PRODUCT,
    payload: product
  }
}

export const clearSelectedProduct = () => {
  return {
    type: ActionTypes.CLEAR_SELECTED_PRODUCTS
  }
}
