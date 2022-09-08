import createStore from 'redux-mock-store'

/*declare function createMockStore<S, DispatchExts = {}>(middlewares?: Redux.Middleware[]): MockStoreCreator<S, DispatchExts>;

export default createMockStore;*/
export const mockedStore = () => {
  const mockStore = createStore({
    reducer: {
      products: [],
      product: {},
      favorites: [],
      cart: []
    }
  } as any)

  const initialState = {
    products: [],
    product: {},
    favorites: [],
    cart: []
  }

  const store = mockStore(initialState)
  return store
}
