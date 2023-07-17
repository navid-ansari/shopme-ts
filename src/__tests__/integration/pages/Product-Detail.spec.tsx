import nock from 'nock'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { renderComponent } from '../../test-utils/component-renderer'

import ProductDetail from '../../../pages/Product-Detail'
import { screen } from '@testing-library/react'
import { getApiUrl } from '../../../utils/get-api-url'

nock.disableNetConnect()

//import { NotFoundError } from '../../../utils/error-handler'

//import MockAdapter from 'axios-mock-adapter'

//const url = 'https://fakestoreapi.com/products/123'
//const url = `${process.env.REACT_APP_BASE_URL}/api/productDetails/123`
//const productId = 123

const productId = 123
const url = `${getApiUrl('productDetails')}/${productId}`

//const mock = new MockAdapter(axios)
describe('Product detail page: Integration', () => {
  beforeEach(() => {
    nock.cleanAll()
    //nock.restore()
    //mock.restore()
    //mock.resetHandlers()
    //mock.reset()
  })

  test('Fetch selected product by id: 200', async () => {
    nock(url)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'Content-Type': 'application/json',
        'access-control-allow-credentials': 'true'
      })
      .get('')
      .reply(200)

    const wrapper = await renderComponent(
      <MemoryRouter initialEntries={[`/product/${productId}`]}>
        <Routes>
          <Route path="/product/:productId" element={<ProductDetail />}></Route>
        </Routes>
      </MemoryRouter>
    )
    expect(await wrapper.findByText('Success Message')).toBeInTheDocument()
    wrapper.unmount()
  })

  test('Failed to fetch selected product by id: 404', async () => {
    nock(url)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'Content-Type': 'application/json',
        'access-control-allow-credentials': 'true'
      })
      .get('')
      .reply(404)
    const wrapper = await renderComponent(
      <MemoryRouter initialEntries={[`/product/${productId}`]}>
        <Routes>
          <Route path="/product/:productId" element={<ProductDetail />}></Route>
        </Routes>
      </MemoryRouter>
    )
    expect(await screen.findByText('Error Message')).toBeInTheDocument()
    wrapper.unmount()
  })
})
