import { screen } from '@testing-library/react'
import { MemoryRouter as Router } from 'react-router-dom'

import { renderComponent } from '../test-utils/component-renderer'

import CartList from '../../pages/Cart-List'
import Cart from '../../components/Cart'

// mocks
import MockedFavorites from '../mocks/favorites'
import { IProduct } from '../types/Product'

describe('Cart List page', () => {
  let mockedCart = [] as IProduct[]
  beforeAll(() => {})
  beforeEach(() => {
    mockedCart = MockedFavorites()
  })
  afterEach(() => {})
  afterAll(() => {})
  test('Check if page is rendered', () => {
    renderComponent(
      <Router>
        <CartList />
      </Router>
    )
    expect(screen.getByTestId('cart-page')).not.toBeNull()
  })

  test('Check if cart list is rendered', () => {
    const cartsElem = mockedCart.map((product: IProduct) => (
      <Cart key={product.id} product={product} />
    ))
    renderComponent(<Router>{cartsElem}</Router>)

    const favoriteItems = screen.getAllByTestId('product')
    expect(favoriteItems).toHaveLength(2)
  })
})
