import '@testing-library/jest-dom'

import axios from 'axios'

import mockedproduct from '../__tests__/mocks/product'
import getProductDetail from './get-product-detail'

jest.mock('axios')

jest.mock('./get-product-detail', () => jest.fn().mockResolvedValue(mockedproduct()))

const mockedAxios = axios as jest.Mocked<typeof axios>

describe('Product detail page helper for fn tests 2', () => {
  beforeAll(() => {})
  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })
  afterEach(() => {})
  afterAll(() => {})
  it('Check if Product details are fetched from api with mock fn - method 2: 200', async () => {
    const productId = '123'
    let mockedProduct = {}
    mockedProduct = mockedproduct()
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(mockedProduct))

    await getProductDetail(productId)

    expect(getProductDetail).toHaveBeenCalledWith(productId)
    expect(getProductDetail).toHaveBeenCalledTimes(1)
  })
})
