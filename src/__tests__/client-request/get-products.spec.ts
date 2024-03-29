import '@testing-library/jest-dom'

import axios from 'axios'
import { NotFoundError } from '../../utils/error-handler'
import getProducts from '../../client-request/get-products'
import { getApiUrl } from '../../utils/get-api-url'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('Client request: get products', () => {
  const productId = 123
  const url = `${getApiUrl('products')}`

  beforeAll(() => {})
  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })
  afterEach(() => {})
  afterAll(() => {})

  test('Check if all products failed to fetch from api: 404', async () => {
    mockedAxios.get.mockRejectedValue({
      response: new NotFoundError('failed to fetch product from api')
    })
    let axiosError
    try {
      const response = await getProducts()
    } catch (error: any) {
      axiosError = error
    }
    expect(mockedAxios.get).toHaveBeenCalledWith(url)
    expect(mockedAxios.get).toHaveBeenCalledTimes(1)
    expect(axiosError.status).toBe(404)
    expect(axiosError.message).toContain('Invalid client request url')
  })
})
