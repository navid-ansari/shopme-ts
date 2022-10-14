import { createStore, combineReducers, compose } from 'redux'
import { productReducer, selectedProductReducer } from '../../../redux/reducers/productReducer'
import { toggleFavoriteReducer } from '../../../redux/reducers/favoriteProductReducer'
import { cartReducer } from '../../../redux/reducers/cartReducer'

const testStore = () => {
  const store = createStore(
    combineReducers({
      products: productReducer,
      product: selectedProductReducer,
      favorites: toggleFavoriteReducer,
      cart: cartReducer
    }),
    {},
    (window &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) ||
      compose
  )
  return store
}

export default testStore
