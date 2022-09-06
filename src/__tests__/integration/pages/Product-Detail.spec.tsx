import nock from 'nock'
import { IProduct } from '../../../types/Product'
import MockedProduct from '../../mocks/product'
import { get } from '../../../utils/rest-client'
import nocked from '../../test-utils/nocked'
import { NotFoundError } from '../../../utils/error-handler'
import { axiosGet } from '../../../utils/axios-rest-client'
import ProductData from '../../../data/Product-data'

const baseApiUrl = 'http://integration-test-api.com'
const url = 'http://integration-test-api.com/products/1'

describe('Product list page: Integration', () => {
  beforeEach(() => {
    nock.cleanAll()
  })
  test('Fetch selected product by id: 200', async () => {
    const partialUrl = '/products'
    const id = 1
    const fakeResponse = ProductData()
    nocked('GET', 200, baseApiUrl, fakeResponse, `${partialUrl}/${id}`)
    const response = (await axiosGet(url)) as any
    expect(response.status).toEqual(200)
    expect(response.data).toEqual(fakeResponse)
  })

  /*test.only('Failed to fetch selected product by id: 404', async () => {
    const partialUrl = '/products'
    const id = 1
    const errorResponse = {
      response: new NotFoundError('Invalid client request url')
    }
    var errRes = {
      statusCode: 404,
      error: 'Not Found',
      message: 'The user does not exist.',
      errorCode: 'inexistent_user'
    }

    //nocked('GET', 404, baseApiUrl, errorResponse, `${partialUrl}/${id}`)
    nock('http://integration-test-api.com')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'Content-Type': 'application/json',
        'access-control-allow-credentials': 'true'
      })
      .get('/products/1')
      .reply(404)
    const response = (await axiosGet(url)) as any
    //const response = (await get({ url })) as any
    console.log(response)
    //expect(response.status).toEqual(404)
  })*/
})

/**
 * expect(response.code).to.equal(200);
   expect(JSON.parse(response.body)).to.deep.equal({ itemKey: ITEM_KEY });
   expect(response.message).to.not.exist;
   expect(response.detail).to.not.exist;
 */
