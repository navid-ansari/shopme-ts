import { screen } from '@testing-library/react'
import { MemoryRouter as Router } from 'react-router-dom'

import { renderComponent } from '../test-utils/component-renderer'

import Favorite from '../../components/Favorite'

// mocks
import MockedFavorite from '../mocks/favorite'
import { IProduct } from '../types/Product'

describe('Favorite component', () => {
  let mockedFavorite = {} as IProduct
  beforeAll(() => {})
  beforeEach(() => {
    mockedFavorite = MockedFavorite({ isFavorite: true, isAddedToCart: false })
  })
  afterEach(() => {})
  afterAll(() => {})

  test('Check if component is rendered', async () => {
    const wrapper = await renderComponent(
      <Router>
        <Favorite favorite={mockedFavorite} />
      </Router>
    )
    expect(screen.getByTestId('product-detail')).not.toBeNull()
    const product = screen.queryAllByTestId('favorite-item')
    expect(product).toHaveLength(1)

    await wrapper.unmount()
  })

  test('Check cart component values', async () => {
    const wrapper = await renderComponent(
      <Router>
        <Favorite favorite={mockedFavorite} />
      </Router>
    )

    // images
    const productImage = screen.getByTestId('product-image')
    expect(productImage).toHaveAttribute('src', mockedFavorite.image)

    // title
    const productTitle = screen.getByTestId('product-title')
    expect(productTitle).toHaveTextContent(mockedFavorite.title)

    // description
    const descriptionTitle = screen.getByTestId('decription-title')
    expect(descriptionTitle).toHaveTextContent('Description:')
    const descriptionText = screen.getByTestId('decription-text')
    expect(descriptionText).toHaveTextContent(mockedFavorite.description)

    /*// rating
    const ratingTitle = screen.getByTestId('rating-title')
    expect(ratingTitle).toHaveTextContent('Rating:')

    // review
    const reviewsTitle = screen.getByTestId('reviews-title')
    expect(reviewsTitle).toHaveTextContent('Reviews:')
    const reviewsTCount = screen.getByTestId('reviews-count')
    expect(reviewsTCount).toHaveTextContent(mockedFavorite.rating.count.toString())*/

    // price
    const priceTitle = screen.getByTestId('price-title')
    expect(priceTitle).toHaveTextContent('Price:')
    const priceValue = screen.getByTestId('price-value')
    expect(priceValue).toHaveTextContent(mockedFavorite.price.toString())

    await wrapper.unmount()
  })
})
