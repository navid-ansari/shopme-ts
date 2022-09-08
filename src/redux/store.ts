import { createStore, compose } from 'redux'
//import { reducers } from "./reducers";
import { rootReducer } from './reducers'
import { resetStoreAction } from './actions/resetStoreAction'

export const composeEnhancers = window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

const store = createStore(
  rootReducer,
  //initial state
  //{},
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  //composeWithDevTools()
  ///composeEnhancers

  (window &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) ||
    compose
)

export default store

export const mockStore = createStore(rootReducer)

export const resetStore = async () => {
  store.dispatch(resetStoreAction())
}

/*export const persistor = persistStore(store);

export const resetStore = async () => {
  await persistor.purge();
  store.dispatch(resetStore());
  await persistor.flush();
};*/
