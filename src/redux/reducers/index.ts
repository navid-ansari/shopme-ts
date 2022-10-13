import { combineReducers } from 'redux'

import { ActionTypes } from '../constants/action-types'
import { productReducer, selectedProductReducer } from './productReducer'
import { toggleFavoriteReducer } from './favoriteProductReducer'

import { cartReducer } from './cartReducer'

const reducers = combineReducers({
  products: productReducer,
  product: selectedProductReducer,
  favorites: toggleFavoriteReducer,
  cart: cartReducer
})

const appReducer = combineReducers({
  /* your app’s top-level reducers */
  products: productReducer,
  product: selectedProductReducer,
  favorites: toggleFavoriteReducer,
  cart: cartReducer
})

const rootReducer = (state: any, action: any) => {
  if (action.type === ActionTypes.RESET_STORE) {
    return appReducer(undefined, action)
  }

  return appReducer(state, action)
}

export { rootReducer, reducers }
