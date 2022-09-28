import nock from 'nock'
import { MemoryRouter as Router } from 'react-router-dom'
import MockedProducts from '../../mocks/products'
import { renderComponent } from '../../test-utils/component-renderer'
import ProductList from '../../../pages/Product-List'

nock.disableNetConnect()

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
    nock.restore()
  })
  test('Fetch all products: 200', async () => {
    const fakeResponse = MockedProducts()
    nock(url)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'Content-Type': 'application/json',
        'access-control-allow-credentials': 'true'
      })
      .get('')
      .reply(200, fakeResponse)
    const wrapper = renderComponent(
      <Router>
        <ProductList />
      </Router>
    )
    // assertion pending
    wrapper.unmount()
  })

  test('Failed to fetch all products: 404', async () => {
    nock(url)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'Content-Type': 'application/json',
        'access-control-allow-credentials': 'true'
      })
      .get('')
      .reply(404)

    const wrapper = renderComponent(
      <Router>
        <ProductList />
      </Router>
    )
    // assertion pending
    wrapper.unmount()
  })

  /*test('Fetch all products: 200', async () => {
    const partialUrl = '/products'
    const fakeResponse = MockedProducts()
    nocked('GET', 200, baseApiUrl, fakeResponse, partialUrl)
    const response = (await get({ url })) as any
    console.log(response)
    //console.log(nocked)
    //expect(response.body.length).toEqual(fakeResponse.length)
    expect(response.status).toEqual(200)
  })*/
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
