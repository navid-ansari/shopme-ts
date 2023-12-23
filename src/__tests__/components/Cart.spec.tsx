import { screen } from '@testing-library/react'
import { MemoryRouter as Router } from 'react-router-dom'

import { renderComponent } from '../test-utils/component-renderer'

import Cart from '../../components/Cart'

// mocks
import mockedproduct from '../mocks/product'
import { IProduct } from '../types/Product'

describe('Cart component', () => {
  let mockedProduct = {} as IProduct

  beforeAll(() => {})
  beforeEach(() => {
    mockedProduct = mockedproduct()
  })
  afterEach(() => {})
  afterAll(() => {})

  test.only('Check if component is rendered', async () => {
    const wrapper = await renderComponent(
      <Router>
        <Cart product={mockedProduct} />
      </Router>
    )
    expect(screen.getByTestId('product-detail')).not.toBeNull()
    const product = screen.queryAllByTestId('cart-item')
    expect(product).toHaveLength(1)

    await wrapper.unmount()
  })

  test('Check cart component values', async () => {
    const wrapper = await renderComponent(
      <Router>
        <Cart product={mockedProduct} />
      </Router>
    )

    // images
    const productImage = screen.getByTestId('product-image')
    expect(productImage).toHaveAttribute('src', mockedProduct.image)

    // title
    const productTitle = screen.getByTestId('product-title')
    expect(productTitle).toHaveTextContent(mockedProduct.title)

    // description
    const descriptionTitle = screen.getByTestId('decription-title')
    expect(descriptionTitle).toHaveTextContent('Description:')
    const descriptionText = screen.getByTestId('decription-text')
    expect(descriptionText).toHaveTextContent(mockedProduct.description)

    /*// rating
    const ratingTitle = screen.getByTestId('rating-title')
    expect(ratingTitle).toHaveTextContent('Rating:')

    // review
    const reviewsTitle = screen.getByTestId('reviews-title')
    expect(reviewsTitle).toHaveTextContent('Reviews:')
    const reviewsTCount = screen.getByTestId('reviews-count')
    expect(reviewsTCount).toHaveTextContent(mockedProduct.rating.count.toString())*/

    // price
    const priceTitle = screen.getByTestId('price-title')
    expect(priceTitle).toHaveTextContent('Price:')
    const priceValue = screen.getByTestId('price-value')
    expect(priceValue).toHaveTextContent(mockedProduct.price.toString())

    await wrapper.unmount()
  })
})
