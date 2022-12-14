import { screen } from '@testing-library/react'
import { MemoryRouter as Router } from 'react-router-dom'

import { renderComponent } from '../test-utils/component-renderer'

import ProductList from '../../pages/Product-List'
import Product from '../../components/Product'

// mocks
import MockedProducts from '../mocks/products'
import { IProduct } from '../types/Product'

describe('Product List page', () => {
  let mockedProducts = [] as IProduct[]
  beforeAll(() => {})
  beforeEach(() => {
    mockedProducts = MockedProducts()
    /*const renderWithRouter = (ui, { route = "/" } = {}) => {
   window.history.pushState({}, "Test page", route);

   return render(ui, { wrapper: BrowserRouter });
  };
  renderWithRouter(<Product />);*/
  })
  afterEach(() => {})
  afterAll(() => {})
  test('Check if Product List page is rendered', async () => {
    const wrapper = await renderComponent(
      <Router>
        <ProductList />
      </Router>
    )
    expect(screen.getByTestId('gallery')).not.toBeNull()

    await wrapper.unmount()
  })

  test('Check if product list is rendered', async () => {
    const mockOnClick = jest.fn()
    const productsElem = mockedProducts.map((product) => (
      <Product key={product.id} product={product} toggleFavorite={mockOnClick} toggleCart={mockOnClick} />
    ))
    const wrapper = await renderComponent(<Router>{productsElem}</Router>)
    //const content = screen.queryAllByTestId("content");
    //expect(content).toHaveLength(3);

    const productItems = screen.getAllByTestId('content')
    expect(productItems).toHaveLength(3)

    await wrapper.unmount()
  })
})
