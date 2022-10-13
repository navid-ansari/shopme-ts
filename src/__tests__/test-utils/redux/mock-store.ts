import configureStore from 'redux-mock-store'

const mockedInitialState = (override = {}) => ({
  products: [],
  product: {},
  favorites: [],
  cart: [],
  ...override
})

const mockStore = (state: any = mockedInitialState) => {
  const mockStore = configureStore()
  const store: any = mockStore(mockedInitialState(state))
  return store
}

export default mockStore
