import { act, fireEvent, screen } from '@testing-library/react'
import { MemoryRouter as Router } from 'react-router-dom'

import { renderComponent } from '../test-utils/component-renderer'

import ProductList from '../../pages/Product-List'
import Product from '../../components/Product'

// mocks
import MockedProducts from '../mocks/products'
import { IProduct } from '../types/Product'
import axios from 'axios'
import { getApiUrl } from '../../utils/get-api-url'
import { Provider } from 'react-redux'
import store from '../../redux/store'

jest.mock('axios')

describe('Product List page', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  let mockedProducts = [] as IProduct[]
  beforeAll(() => {})
  beforeEach(() => {
    mockedProducts = MockedProducts()
  })
  afterEach(() => {})
  afterAll(() => {})
  test('Check if Product List page is rendered', async () => {
    const wrapper = await renderComponent(
      <Router>
        <ProductList />
      </Router>
    )
    expect(screen.getByTestId('product-list-page')).not.toBeNull()

    await wrapper.unmount()
  })

  test('Check if product list is rendered', async () => {
    const mockOnClick = jest.fn()
    const productsElem = mockedProducts.map((product) => (
      <Product key={product.id} product={product} toggleFavorite={mockOnClick} toggleCart={mockOnClick} />
    ))
    const wrapper = await renderComponent(<Router>{productsElem}</Router>)

    const productItems = screen.getAllByTestId('product')
    expect(productItems).toHaveLength(3)

    await wrapper.unmount()
  })

  test('check add to cart button', async () => {
    const mAxiosResponse = {
      data: mockedProducts,
      status: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      statusText: '',
      config: {
        url: getApiUrl('products')
      }
    }
    mockedAxios.get.mockResolvedValueOnce(mAxiosResponse)
    const wrapper = await act(async () =>
      renderComponent(
        <Provider store={store}>
          <Router>
            <ProductList />
          </Router>
        </Provider>
      )
    )

    const { getAllByTestId } = wrapper
    const buttons = getAllByTestId('add-to-cart-btn')
    expect(buttons).toHaveLength(3)
    expect(getAllByTestId('add-to-cart-btn')[0].innerHTML).toBe('Add To Cart')
    await act(async () => fireEvent.click(buttons[0]))
    expect(getAllByTestId('add-to-cart-btn')[0].innerHTML).toBe('Remove From Cart')
    wrapper.unmount()
  })
})
