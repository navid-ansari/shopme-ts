import { renderHook } from '@testing-library/react'
//import axios from "axios";
import { Provider } from 'react-redux'
//import createStore from "redux-mock-store";
import axios from 'axios'

// mocks
import MockedProducts from '../mocks/products'
import useProductActionHook from '../../hooks/useProductActionHook'

//import { mockStore } from "../../redux/store";
import { NotFoundError } from '../../utils/error-handler'

//import { createStore } from "redux";
//import { reducers } from "../../redux/reducers";

//import { mockedStore } from '../test-utils/reset-store'
import { IProduct } from '../types/Product'
//import mockedInitialState from '../test-utils/redux/mocked-initial-state'

import { setProducts } from '../../redux/actions/productAction'
import testStore from '../test-utils/redux/test-store'

jest.mock('axios')

describe('Product action hook', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  let mockedProducts = [] as IProduct[]
  let store: any
  const url = 'https://fakestoreapi.com/products'

  beforeAll(() => {})
  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
    mockedProducts = MockedProducts()
    store = testStore()
  })
  afterEach(() => {})
  afterAll(() => {})

  test('fetch products from if products are not present in store: 200', async () => {
    const mAxiosResponse = {
      data: mockedProducts,
      status: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      statusText: '',
      config: {
        url: 'https://fakestoreapi.com/products'
      }
    }
    mockedAxios.get.mockResolvedValueOnce(mAxiosResponse)

    const wrapper = ({ children }: { children: any }) => <Provider store={store}>{children}</Provider>
    const hook = await renderHook(
      () => {
        useProductActionHook()
      },
      { wrapper }
    )

    expect(mockedAxios.get).toHaveBeenCalledWith(url)
    expect(mockedAxios.get).toHaveBeenCalledTimes(1)

    const unsubscribe = store.subscribe(() => {
      expect(store.getState()['products'].length).toBe(3)
    })

    unsubscribe()
    await hook.unmount()
  })

  test('do not fetch products if products are already present in store', async () => {
    const mAxiosResponse = {
      data: mockedProducts,
      status: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      statusText: '',
      config: {
        url: 'https://fakestoreapi.com/products'
      }
    }
    mockedAxios.get.mockResolvedValueOnce(mAxiosResponse)

    await store.dispatch(setProducts(mockedProducts))

    const wrapper = ({ children }: { children: any }) => <Provider store={store}>{children}</Provider>
    const hook = await renderHook(
      () => {
        useProductActionHook()
      },
      { wrapper }
    )

    expect(mockedAxios.get).not.toHaveBeenCalledWith(url)
    expect(mockedAxios.get).toHaveBeenCalledTimes(0)

    const unsubscribe = store.subscribe(() => {
      expect(store.getState()['products'].length).toBeGreaterThan(0)
      expect(store.getState()['products']).toBe(mockedProducts)
    })

    unsubscribe()
    await hook.unmount()
  })

  test('failed to fetch products from api: 404', async () => {
    mockedAxios.get.mockRejectedValue(new NotFoundError('failed to fetch product from api'))

    const wrapper = ({ children }: { children: any }) => <Provider store={store}>{children}</Provider>

    const hook = await renderHook(
      () => {
        useProductActionHook()
      },
      { wrapper }
    )

    expect(mockedAxios.get).toHaveBeenCalledWith(url)
    expect(mockedAxios.get).toHaveBeenCalledTimes(1)
    expect(mockedAxios.get).rejects.toThrow(new NotFoundError('failed to fetch product from api'))
    expect(mockedAxios.get).rejects.toThrowError('failed to fetch product from api')

    await hook.unmount()
  })

  test('failed to fetch products from api => mockImplementation: 404', async () => {
    mockedAxios.get.mockImplementation(() => Promise.reject(new NotFoundError('failed to fetch product from api')))

    const wrapper = ({ children }: { children: any }) => <Provider store={store}>{children}</Provider>

    const hook = await renderHook(
      () => {
        useProductActionHook()
      },
      { wrapper }
    )

    expect(mockedAxios.get).toHaveBeenCalledWith(url)
    expect(mockedAxios.get).toHaveBeenCalledTimes(1)
    expect(mockedAxios.get).rejects.toThrow(new NotFoundError('failed to fetch product from api'))
    expect(mockedAxios.get).rejects.toThrowError('failed to fetch product from api')

    await hook.unmount()
  })
})
