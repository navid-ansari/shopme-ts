import { renderHook, waitFor } from '@testing-library/react'
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

import { mockedStore } from '../test-utils/reset-store'
import { IProduct } from '../types/Product'

let mockedProducts = [] as IProduct[]
/*
// mock config
const mockConfig = {
  products: []
}

// this will mock complete file, we have provided mock implementation
// for useFetch function
const hookData = jest.mock('../../hooks/useProductActionHook', () => ({
  useProductActionHook: () => mockConfig
}))*/
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
describe('Product action hook', () => {
  const url = 'https://fakestoreapi.com/products'
  beforeAll(() => {})
  beforeEach(() => {
    mockedProducts = MockedProducts()
    jest.clearAllMocks()
    jest.resetAllMocks()
  })
  afterEach(() => {})
  afterAll(() => {})

  test('fetch products from api: 200', async () => {
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

    const ReduxProvider = ({ children, reduxStore }: { children: any; reduxStore: any }) => (
      <Provider store={mockedStore()}>{children}</Provider>
    )

    const wrapper = ({ children }: { children: any }) => (
      <ReduxProvider reduxStore={mockedStore()}>{children}</ReduxProvider>
    )
    renderHook(
      () => {
        useProductActionHook()
      },
      { wrapper }
    )
    await expect(mockedAxios.get).toHaveBeenCalledWith(url)
    await expect(mockedAxios.get).toHaveBeenCalledTimes(1)
  })

  test('failed to fetch products from api: 404', async () => {
    mockedAxios.get.mockRejectedValue(new NotFoundError('failed to fetch product from api'))

    const ReduxProvider = ({ children, reduxStore }: { children: any; reduxStore: any }) => (
      <Provider store={mockedStore()}>{children}</Provider>
    )

    const wrapper = ({ children }: { children: any }) => (
      <ReduxProvider reduxStore={mockedStore()}>{children}</ReduxProvider>
    )
    renderHook(
      () => {
        useProductActionHook()
      },
      { wrapper }
    )
    expect(mockedAxios.get).toHaveBeenCalledWith(url)
    expect(mockedAxios.get).toHaveBeenCalledTimes(1)
    await expect(mockedAxios.get).rejects.toThrow(
      new NotFoundError('failed to fetch product from api')
    )
    await expect(mockedAxios.get).rejects.toThrowError('failed to fetch product from api')
  })

  test('failed to fetch products from api => mockImplementation: 404', async () => {
    mockedAxios.get.mockImplementation(() =>
      Promise.reject(new NotFoundError('failed to fetch product from api'))
    )

    const ReduxProvider = ({ children, reduxStore }: { children: any; reduxStore: any }) => (
      <Provider store={mockedStore()}>{children}</Provider>
    )

    const wrapper = ({ children }: { children: any }) => (
      <ReduxProvider reduxStore={mockedStore()}>{children}</ReduxProvider>
    )
    renderHook(
      () => {
        useProductActionHook()
      },
      { wrapper }
    )
    await expect(mockedAxios.get).toHaveBeenCalledWith(url)
    await expect(mockedAxios.get).toHaveBeenCalledTimes(1)
    await expect(mockedAxios.get).rejects.toThrow(
      new NotFoundError('failed to fetch product from api')
    )
    await waitFor(() =>
      expect(mockedAxios.get).rejects.toThrowError('failed to fetch product from api')
    )
  })
})

/*test('failed to fetch products from api: 404', async () => {
    const errorMessage = 'Invalid client request url'
    const mockResponse = {
      json: () => Promise.resolve(new NotFoundError(errorMessage)),
      status: 404,
      ok: false
    }
    const fetchMock = jest
      .spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve(mockResponse as any))

    const ReduxProvider = ({
      children,
      reduxStore
    }: {
      children: any
      reduxStore: any
    }) => <Provider store={mockedStore()}>{children}</Provider>

    const wrapper = ({ children }: { children: any }) => (
      <ReduxProvider reduxStore={mockedStore()}>{children}</ReduxProvider>
    )
    renderHook(
      () => {
        useProductActionHook()
      },
      { wrapper }
    )
    expect(fetchMock).toHaveBeenCalledWith(url)
    expect(fetchMock).toHaveBeenCalledTimes(1)
    //await expect(fetchMock).resolves.toThrow(new NotFoundError(errorMessage))
    //await expect(fetchMock).resolves.toThrowError(errorMessage)
  })*/

// with mocking hook rendering
/*test.skip('fetch products from api: 200', async () => {
    const mockResponse = {
      json: () => Promise.resolve(mockedProducts),
      status: 200,
      ok: true
    }
    const fetchMock = await jest
      .spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve(mockResponse as Response))

    await renderComponent(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    )

    expect(fetchMock).toHaveBeenCalledWith(url)
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  test('failed to fetch products from api: 404', async () => {
    const errorMessage = 'Invalid client request url'
    const fetchMock = await jest
      .spyOn(global, 'fetch')
      .mockImplementation(() =>
        Promise.reject({ response: new NotFoundError(errorMessage) })
      )

    await renderComponent(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    )

    expect(fetchMock).toHaveBeenCalledWith(url)
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock).rejects.toThrow(new NotFoundError(errorMessage))
    expect(fetchMock).rejects.toThrowError(errorMessage)
  })*/

// with custom hook rendering
/*test.skip('fetch products from api: 200', async () => {
    const mockResponse = {
      json: () => Promise.resolve(mockedProducts),
      status: 200,
      ok: true
    }
    const fetchMock = jest
      .spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve(mockResponse as Response))

    const ReduxProvider = ({
      children,
      reduxStore
    }: {
      children: any
      reduxStore: any
    }) => <Provider store={mockedStore()}>{children}</Provider>

    const wrapper = ({ children }: { children: any }) => (
      <ReduxProvider reduxStore={mockedStore()}>{children}</ReduxProvider>
    )
    renderHook(
      () => {
        useProductActionHook()
      },
      { wrapper }
    )
    expect(fetchMock).toHaveBeenCalledWith(url)
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })
  test.skip('failed to fetch products from api: 404', async () => {
    const errorMessage = 'Invalid client request url'
    const fetchMock = await jest
      .spyOn(global, 'fetch')
      .mockImplementation(() =>
        Promise.reject({ response: new Error(errorMessage) })
      )

    const ReduxProvider = ({
      children,
      reduxStore
    }: {
      children: any
      reduxStore: any
    }) => <Provider store={mockedStore()}>{children}</Provider>

    const wrapper = ({ children }: { children: any }) => (
      <ReduxProvider reduxStore={mockedStore()}>{children}</ReduxProvider>
    )

    renderHook(
      () => {
        useProductActionHook()
      },
      { wrapper }
    )

    expect(fetchMock).toBeCalledWith(url)
    expect(fetchMock).toBeCalledTimes(1)
    await expect(fetchMock).rejects.toThrow(new NotFoundError(errorMessage))
    await expect(fetchMock).rejects.toThrowError(errorMessage)
  })

  test.skip('failed to fetch products from api - mockRejectedValue: 404', async () => {
    const mocked = jest.mocked
    const fetchMock = jest.spyOn(global, 'fetch')

    mocked(fetchMock).mockRejectedValue({
      response: new Error('failed to fetch product from api')
    })

    const ReduxProvider = ({
      children,
      reduxStore
    }: {
      children: any
      reduxStore: any
    }) => <Provider store={mockedStore()}>{children}</Provider>

    const wrapper = ({ children }: { children: any }) => (
      <ReduxProvider reduxStore={mockedStore()}>{children}</ReduxProvider>
    )

    renderHook(
      () => {
        useProductActionHook()
      },
      { wrapper }
    )

    await waitFor(() => expect(fetchMock).toBeCalledWith(url))
    await waitFor(() => expect(fetchMock).toBeCalledTimes(1))

    await waitFor(() =>
      expect(fetchMock).rejects.toThrow(
        new NotFoundError('failed to fetch product from api')
      )
    )
    await waitFor(() =>
      expect(fetchMock).rejects.toThrowError('failed to fetch product from api')
    )
  })*/
