//import axios from "axios";
import { get, throwError } from '../../utils/rest-client'
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

//jest.mock("axios");
//const mocked = jest.mocked;

let mockedProducts = [] as IProduct[]
describe('Rest client', () => {
  beforeAll(() => {})
  beforeEach(() => {
    jest.clearAllMocks()
    mockedProducts = MockedProducts()
  })
  afterEach(() => {})
  afterAll(() => {})
  describe('Get Request', () => {
    test('Get request: status 200', async () => {
      const url = 'http://api/test-url'
      const status = 200
      const mockResponse = {
        json: () => Promise.resolve(mockedProducts),
        status,
        ok: true
      }

      const fetchMock = jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(mockResponse as Response))
      const response = await get({ url })
      const data = await response?.json()
      expect(fetchMock).toHaveBeenCalledWith(url)
      expect(fetchMock).toHaveBeenCalledTimes(1)
      expect(response?.ok).toBe(true)
      expect(response?.status).toEqual(200)
      expect(data.length).toEqual(3)
    })

    test('Get request: status 400', async () => {
      const url = 'http://api/test-url'
      const errorMessage = 'Bad client request'
      const status = 400

      // with tyr...catch
      const fetchMock = jest
        .spyOn(global, 'fetch')
        .mockImplementation(() => Promise.reject({ response: new InputError(errorMessage) }))
      await expect(get({ url })).rejects.toThrow(errorMessage)
      expect(fetchMock).toHaveBeenCalledWith(url)
      expect(fetchMock).toHaveBeenCalledTimes(1)
    })

    test('Get request: status 401', async () => {
      const url = 'http://api/test-url'
      const errorMessage = 'Unauthorized request'
      const status = 401
      const fetchMock = jest
        .spyOn(global, 'fetch')
        .mockImplementation(() => Promise.reject({ response: new AuthenticationError(errorMessage) }))
      await expect(get({ url })).rejects.toThrow(errorMessage)
      expect(fetchMock).toHaveBeenCalledWith(url)
      expect(fetchMock).toHaveBeenCalledTimes(1)
    })

    test('Get request: status 403', async () => {
      const url = 'http://api/test-url'
      const errorMessage = 'Forbidden request'

      const fetchMock = jest
        .spyOn(global, 'fetch')
        .mockImplementation(() => Promise.reject({ response: new ForbiddenError(errorMessage) }))
      await expect(get({ url })).rejects.toThrow(errorMessage)
      expect(fetchMock).toHaveBeenCalledWith(url)
      expect(fetchMock).toHaveBeenCalledTimes(1)
    })

    test('Get request: status 404', async () => {
      const url = 'http://api/test-url'
      const errorMessage = 'Invalid client request url'

      const fetchMock = jest
        .spyOn(global, 'fetch')
        .mockImplementation(() => Promise.reject({ response: new NotFoundError(errorMessage) }))
      await expect(get({ url })).rejects.toThrow(errorMessage)
      expect(fetchMock).toHaveBeenCalledWith(url)
      expect(fetchMock).toHaveBeenCalledTimes(1)
    })

    test('Get request: status 500', async () => {
      const url = 'http://api/test-url'
      const errorMessage = 'Internal server error'

      const fetchMock = jest
        .spyOn(global, 'fetch')
        .mockImplementation(() => Promise.reject({ response: new InternalServerError(errorMessage) }))
      await expect(get({ url })).rejects.toThrow(errorMessage)
      expect(fetchMock).toHaveBeenCalledWith(url)
      expect(fetchMock).toHaveBeenCalledTimes(1)
    })

    test('Get request: status 502', async () => {
      const url = 'http://api/test-url'
      const errorMessage = 'Invalid response from gateway server'

      const fetchMock = jest
        .spyOn(global, 'fetch')
        .mockImplementation(() => Promise.reject({ response: new BadResponseError(errorMessage) }))
      await expect(get({ url })).rejects.toThrow(errorMessage)
      expect(fetchMock).toHaveBeenCalledWith(url)
      expect(fetchMock).toHaveBeenCalledTimes(1)
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
