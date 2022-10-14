import { screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { renderComponent } from '../test-utils/component-renderer'

import Detail from '../../components/Detail'

// mocks
import mockedproduct from '../mocks/product'
import { IProduct } from '../types/Product'

describe('Detail component', () => {
  let mockedProduct = {} as IProduct
  beforeAll(() => {})
  beforeEach(() => {
    mockedProduct = mockedproduct()
    /*const renderWithRouter = (ui, { route = "/" } = {}) => {
    window.history.pushState({}, "Test page", route);
 
    return render(ui, { wrapper: BrowserRouter });
   };
   renderWithRouter(<Product />);*/
  })
  afterEach(() => {})
  afterAll(() => {})

  test('Check if Detail component is rendered', async () => {
    const wrapper = await renderComponent(
      <MemoryRouter>
        <Detail product={mockedProduct} />
      </MemoryRouter>
    )
    expect(screen.getByTestId('product')).not.toBeNull()
    const product = screen.queryAllByTestId('product')
    expect(product).toHaveLength(1)

    await wrapper.unmount()
  })

  test('Check Detail component values', async () => {
    const wrapper = await renderComponent(
      <MemoryRouter>
        <Detail product={mockedProduct} />
      </MemoryRouter>
    )

    // title
    const productTitle = screen.getByTestId('product-title')
    expect(productTitle).toHaveTextContent(mockedProduct.title)

    // description
    const descriptionTitle = screen.getByTestId('decription-title')
    expect(descriptionTitle).toHaveTextContent('Description:')
    const descriptionText = screen.getByTestId('decription-text')
    expect(descriptionText).toHaveTextContent(mockedProduct.description)

    // rating
    const ratingTitle = screen.getByTestId('rating-title')
    expect(ratingTitle).toHaveTextContent('Rating:')

    // review
    const reviewsTitle = screen.getByTestId('reviews-title')
    expect(reviewsTitle).toHaveTextContent('Reviews:')
    const reviewsTCount = screen.getByTestId('reviews-count')
    expect(reviewsTCount).toHaveTextContent(mockedProduct.rating.count.toString())

    // price
    const priceTitle = screen.getByTestId('price-title')
    expect(priceTitle).toHaveTextContent('Price:')
    const priceValue = screen.getByTestId('price-value')
    expect(priceValue).toHaveTextContent(mockedProduct.price.toString())

    await wrapper.unmount()
  })
})
