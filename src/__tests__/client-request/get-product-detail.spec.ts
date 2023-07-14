import '@testing-library/jest-dom'

import axios from 'axios'
import { NotFoundError } from '../../utils/error-handler'
import getProductDetail from '../../client-request/get-product-detail'

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

  test('Check if Product detail failed to fetch from api: 4040', async () => {
    const productId = 123
    mockedAxios.get.mockRejectedValue({
      response: new NotFoundError('failed to fetch product from api')
    })
    let axiosError
    try {
      const response = await getProductDetail('123')
    } catch (error: any) {
      axiosError = error
    }
    expect(mockedAxios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BASE_URL}/api/productDetails/${productId}`)
    expect(mockedAxios.get).toHaveBeenCalledTimes(1)
    expect(axiosError.status).toBe(404)
    expect(axiosError.message).toContain('Invalid client request url')
  })
})
