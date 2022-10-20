import axios from 'axios'
import { throwError } from '../../utils/throw-error'
import {
  InputError,
  AuthenticationError,
  ForbiddenError,
  NotFoundError,
  InternalServerError,
  BadResponseError
} from '../../utils/error-handler'

import MockedProducts from '../mocks/products'
import { IProduct } from '../types/Product'
import { axiosGet } from '../../utils/axios-rest-client'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

//jest.mock("axios");
//const mocked = jest.mocked;

let mockedProducts = [] as IProduct[]
describe('Axios rest client', () => {
  beforeAll(() => {})
  beforeEach(() => {
    jest.clearAllMocks()
    mockedProducts = MockedProducts()
  })
  afterEach(() => {})
  afterAll(() => {})
  describe('Axios rest Request', () => {
    test('Get request: status 200', async () => {
      const url = 'http://api/test-url'
      const status = 200
      const mockResponse = {
        config: {},
        data: mockedProducts,
        headers: { 'content-type': 'application/json; charset=utf-8' },
        request: {},
        status,
        statusText: ''
      }
      mockedAxios.get.mockResolvedValue(mockResponse)
      const response = await axiosGet(url)
      expect(mockedAxios.get).toHaveBeenCalledWith(url)
      expect(mockedAxios.get).toHaveBeenCalledTimes(3)
      expect(response?.status).toEqual(200)
      expect(response?.data.length).toEqual(3)
    })

    test('Get request: status 400', async () => {
      const url = 'http://api/test-url'
      const errorMessage = 'Bad client request'

      mockedAxios.get.mockRejectedValue({ response: new InputError(errorMessage) })
      let errorResponse
      try {
        return await axiosGet(url)
      } catch (error: any) {
        errorResponse = error
      }
      expect(mockedAxios.get).toHaveBeenCalledWith(url)
      expect(mockedAxios.get).toHaveBeenCalledTimes(1)
      expect(errorResponse.status).toBe(400)
      expect(errorResponse.message).toContain(errorMessage)
      expect(axiosGet(url)).rejects.toThrow(new InputError(errorMessage))
      expect(axiosGet(url)).rejects.toThrowError(errorMessage)
    })

    test('Get request: status 401', async () => {
      const url = 'http://api/test-url'
      const errorMessage = 'Unauthorized request'

      mockedAxios.get.mockRejectedValue({ response: new AuthenticationError(errorMessage) })
      let errorResponse
      try {
        return await axiosGet(url)
      } catch (error: any) {
        errorResponse = error
      }
      expect(mockedAxios.get).toHaveBeenCalledWith(url)
      expect(mockedAxios.get).toHaveBeenCalledTimes(1)
      expect(errorResponse.status).toBe(401)
      expect(errorResponse.message).toContain(errorMessage)
      expect(axiosGet(url)).rejects.toThrow(new AuthenticationError(errorMessage))
      expect(axiosGet(url)).rejects.toThrowError(errorMessage)
    })

    test('Get request: status 403', async () => {
      const url = 'http://api/test-url'
      const errorMessage = 'Forbidden request'

      mockedAxios.get.mockRejectedValue({ response: new ForbiddenError(errorMessage) })
      let errorResponse
      try {
        return await axiosGet(url)
      } catch (error: any) {
        errorResponse = error
      }
      expect(mockedAxios.get).toHaveBeenCalledWith(url)
      expect(mockedAxios.get).toHaveBeenCalledTimes(1)
      expect(errorResponse.status).toBe(403)
      expect(errorResponse.message).toContain(errorMessage)
      expect(axiosGet(url)).rejects.toThrow(new ForbiddenError(errorMessage))
      expect(axiosGet(url)).rejects.toThrowError(errorMessage)
    })

    test('Get request: status 404', async () => {
      const url = 'http://api/test-url'
      const errorMessage = 'Invalid client request url'

      mockedAxios.get.mockRejectedValue({ response: new NotFoundError(errorMessage) })
      let errorResponse
      try {
        return await axiosGet(url)
      } catch (error: any) {
        errorResponse = error
      }
      expect(mockedAxios.get).toHaveBeenCalledWith(url)
      expect(mockedAxios.get).toHaveBeenCalledTimes(1)
      expect(errorResponse.status).toBe(404)
      expect(errorResponse.message).toContain(errorMessage)
      expect(axiosGet(url)).rejects.toThrow(new NotFoundError(errorMessage))
      expect(axiosGet(url)).rejects.toThrowError(errorMessage)
    })

    test('Get request: status 500', async () => {
      const url = 'http://api/test-url'
      const errorMessage = 'Internal server error'

      mockedAxios.get.mockRejectedValue({ response: new InternalServerError(errorMessage) })
      let errorResponse
      try {
        return await axiosGet(url)
      } catch (error: any) {
        errorResponse = error
      }
      expect(mockedAxios.get).toHaveBeenCalledWith(url)
      expect(mockedAxios.get).toHaveBeenCalledTimes(1)
      expect(errorResponse.status).toBe(500)
      expect(errorResponse.message).toContain(errorMessage)
      expect(axiosGet(url)).rejects.toThrow(new InternalServerError(errorMessage))
      expect(axiosGet(url)).rejects.toThrowError(errorMessage)
    })

    test('Get request: status 502', async () => {
      const url = 'http://api/test-url'
      const errorMessage = 'Invalid response from gateway server'

      mockedAxios.get.mockRejectedValue({ response: new BadResponseError(errorMessage) })
      let errorResponse
      try {
        return await axiosGet(url)
      } catch (error: any) {
        errorResponse = error
      }
      expect(mockedAxios.get).toHaveBeenCalledWith(url)
      expect(mockedAxios.get).toHaveBeenCalledTimes(1)
      expect(errorResponse.status).toBe(502)
      expect(errorResponse.message).toContain(errorMessage)
      expect(axiosGet(url)).rejects.toThrow(new BadResponseError(errorMessage))
      expect(axiosGet(url)).rejects.toThrowError(errorMessage)
    })
  })
  describe('Throw error function', () => {
    test('Input error: 400', () => {
      const status = { status: 400 }
      expect(() => {
        throwError(status)
      }).toThrow(new InputError('Bad client request'))
    })

    test('Authentication error: 401', () => {
      const status = { status: 401 }
      expect(() => {
        throwError(status)
      }).toThrow(new InputError('Unauthorized request'))
    })

    test('Forbidden error: 403', () => {
      const status = { status: 403 }
      expect(() => {
        throwError(status)
      }).toThrow(new InputError('Forbidden request'))
    })

    test('Not found error: 404', () => {
      const status = { status: 404 }
      expect(() => {
        throwError(status)
      }).toThrow(new InputError('Invalid client request url'))
    })

    test('Internal server error: 500', () => {
      const status = { status: 500 }
      expect(() => {
        throwError(status)
      }).toThrow(new InputError('Internal server error'))
    })

    test('Bad response error: 502', () => {
      const status = { status: 502 }
      expect(() => {
        throwError(status)
      }).toThrow(new InputError('Invalid response from gateway server'))
    })
  })
})
