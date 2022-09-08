import nock from 'nock'
import MockedProducts from '../../mocks/products'
import { get } from '../../../utils/rest-client'
import nocked from '../../test-utils/nocked'

type NockResponse = {
  status?: number
  ok?: boolean
  statusText?: string
  url?: string
}

const baseApiUrl = 'http://fakestoreapi.com'
const url = 'http://fakestoreapi.com/products'

describe('Product list page: Integration', () => {
  beforeEach(() => {
    nock.cleanAll()
  })
  test('Fetch all products: 200', async () => {
    const partialUrl = '/products'
    const fakeResponse = MockedProducts()
    nocked('GET', 200, baseApiUrl, fakeResponse, partialUrl)
    const response = (await get({ url })) as any
    //console.log(response)
    //console.log(nocked)
    //expect(response.body.length).toEqual(fakeResponse.length)
    expect(response.status).toEqual(200)
  })
  /*test.skip('Failed to fetch all products: 404', async () => {
    const partialUrl = '/products'
    const errorResponse = {
      response: new NotFoundError('Invalid client request url')
    }
    nocked('GET', 404, baseApiUrl, errorResponse, partialUrl)
    const response = (await get({ url })) as any
    //console.log(response)
    //console.log(nocked)
    //expect(response.body.length).toEqual(fakeResponse.length)
    expect(response.status).toEqual(404)
  })*/
})
