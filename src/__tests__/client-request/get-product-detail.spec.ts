import '@testing-library/jest-dom'

import axios from 'axios'
import { NotFoundError } from '../../utils/error-handler'
import getProductDetail from '../../client-request/get-product-detail'
import { getApiUrl } from '../../utils/get-api-url'
import mockedproduct from '../mocks/product'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('Product detail page helper', () => {
  beforeAll(() => {})
  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })
  afterEach(() => {})
  afterAll(() => {})

  test('Check if Product detail failed to fetch from api: 404', async () => {
    const productId = 123
    const url = `${getApiUrl('productDetails')}/${productId}`
    mockedAxios.get.mockRejectedValue({
      response: new NotFoundError('failed to fetch product from api')
    })
    let axiosError
    try {
      const response = await getProductDetail('123')
    } catch (error: any) {
      axiosError = error
    }
    expect(mockedAxios.get).toHaveBeenCalledWith(url)
    expect(mockedAxios.get).toHaveBeenCalledTimes(1)
    expect(axiosError.status).toBe(404)
    expect(axiosError.message).toContain('Invalid client request url')
  })

  test('Check if Product details are fetched from api: 200', async () => {
    let mockedProduct = {}
    mockedProduct = mockedproduct()
    const productId = '123'

    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(mockedProduct))

    expect(await getProductDetail(productId)).toEqual(mockedProduct)
  })

  test('Check if Product details are fetched from api with .then method: 200', async () => {
    let mockedProduct = {}
    mockedProduct = mockedproduct()
    const productId = '123'
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(mockedProduct))
    await getProductDetail(productId).then((data) => expect(data).toEqual(mockedProduct))
  })

  test('Check if Product details are fetched from api with mock fn - method 1 : 200', async () => {
    const productId = '123'
    let mockedProduct = {}
    mockedProduct = mockedproduct()
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(mockedProduct))
    jest.mock('../../client-request/get-product-detail', () => () => mockedProduct)

    expect(await getProductDetail(productId)).toEqual(mockedProduct)
  })
})
