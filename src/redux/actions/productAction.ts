import { ActionTypes } from '../constants/action-types'

export const setProducts = (products: any) => {
  return {
    type: ActionTypes.SET_PRODUCTS,
    payload: products
  }
}

export const selectedProduct = (product: any) => {
  return {
    type: ActionTypes.SELECTED_PRODUCT,
    payload: product
  }
}

export const clearSelectedProduct = (products: any) => {
  return {
    type: ActionTypes.CLEAR_SELECTED_PRODUCTS
  }
}
