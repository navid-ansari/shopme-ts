import { createStore } from 'redux'
//import { reducers } from "./reducers";
import { rootReducer } from './reducers'
import { useDispatch } from 'react-redux'
import { resetStoreAction } from './actions/resetStoreAction'
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(
  rootReducer,
  //{},
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  composeWithDevTools()
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
