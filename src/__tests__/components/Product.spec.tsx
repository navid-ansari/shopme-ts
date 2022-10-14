import { screen, fireEvent } from '@testing-library/react'
//import { userEvent } from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { MemoryRouter, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import { renderComponent } from '../test-utils/component-renderer'
import { reRenderComponent } from '../test-utils/component-renderer'

import Product from '../../components/Product'

// mocks
import MockedProduct from '../mocks/product'
import { IProduct } from '../types/Product'

const mockOnClick = jest.fn()

describe('Product component', () => {
  let mockedProduct = {} as IProduct
  beforeAll(() => {})
  beforeEach(() => {
    jest.clearAllMocks()
    mockedProduct = MockedProduct()
  })
  afterEach(() => {})
  afterAll(() => {})
  test('Should render component', async () => {
    const wrapper = await renderComponent(
      <MemoryRouter>
        <Product product={mockedProduct} />
      </MemoryRouter>
    )
    expect(screen.getByTestId('content')).not.toBeNull()

    await wrapper.unmount()
  })

  test('check product prop', async () => {
    let actualProduct = {}

    const mockOnClick = (mockedProduct: IProduct) => {
      actualProduct = mockedProduct
    }

    const wrapper = await renderComponent(
      <MemoryRouter>
        <Product product={mockedProduct} toggleCart={mockOnClick} />
      </MemoryRouter>
    )

    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(actualProduct).not.toBeNull()
    expect(actualProduct).not.toBe({})
    //expect(actualProduct.title).toBe(mockedProduct.title);
    expect(actualProduct).toEqual(mockedProduct)

    await wrapper.unmount()
  })

  test('check rendered product values', async () => {
    const wrapper = await renderComponent(
      <MemoryRouter>
        <Product product={mockedProduct} />
      </MemoryRouter>
    )

    // image assertion
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg')

    // product heading
    const heading = screen.getByTestId('product-title')
    expect(heading).toHaveTextContent('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops')

    // product description
    const description = screen.getByTestId('product-description')
    expect(description).toHaveTextContent(
      'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday'
    )

    // price
    const price = screen.getByTestId('product-price')
    expect(price).toHaveTextContent(String(109.95))

    // add to cart button
    const button = screen.getByTestId('add-to-cart-btn')
    expect(button).toHaveTextContent('Add To Cart')

    await wrapper.unmount()
  })

  test('add to cart button', async () => {
    // before click
    const wrapper = await renderComponent(
      <MemoryRouter>
        <Product product={mockedProduct} toggleCart={mockOnClick} toggleFavorite={mockOnClick} />
      </MemoryRouter>
    )

    const addToCartBtn = screen.getByTestId('add-to-cart-btn')
    expect(addToCartBtn).toHaveTextContent('Add To Cart')

    // after click
    mockedProduct = {
      ...MockedProduct(),
      isAddedToCart: true
    }
    const component = (
      <MemoryRouter>
        <Product product={mockedProduct} toggleCart={mockOnClick} toggleFavorite={mockOnClick} />
      </MemoryRouter>
    )
    const { rerender } = wrapper
    const componentRerendered = await reRenderComponent({ component, rerender })

    const addToCartBtnClick = screen.getByTestId('add-to-cart-btn')
    fireEvent.click(addToCartBtnClick)
    expect(mockOnClick).toHaveBeenCalledTimes(1)
    expect(addToCartBtnClick).toHaveTextContent('Remove From Cart')

    await wrapper.unmount()
  })

  test('remove from cart button', async () => {
    mockedProduct = MockedProduct({ isAddedToCart: true })
    // before click
    const wrapper = await renderComponent(
      <MemoryRouter>
        <Product product={mockedProduct} toggleCart={mockOnClick} />
      </MemoryRouter>
    )

    const removeFromCartBtn = screen.getByTestId('add-to-cart-btn')
    expect(removeFromCartBtn).toHaveTextContent('Remove From Cart')

    // after click
    mockedProduct = {
      ...MockedProduct(),
      isAddedToCart: false
    }

    const component = (
      <MemoryRouter>
        <Product product={mockedProduct} toggleCart={mockOnClick} toggleFavorite={mockOnClick} />
      </MemoryRouter>
    )

    const { rerender } = wrapper
    const componentRerendered = await reRenderComponent({ component, rerender })

    const removeFromCartBtnClick = screen.getByTestId('add-to-cart-btn')
    fireEvent.click(removeFromCartBtnClick)
    expect(mockOnClick).toHaveBeenCalledTimes(1)
    expect(removeFromCartBtnClick).toHaveTextContent('Add To Cart')

    await wrapper.unmount()
  })

  test('add to favorite button', async () => {
    // before click
    const wrapper = await renderComponent(
      <MemoryRouter>
        <Product product={mockedProduct} toggleFavorite={mockOnClick} />
      </MemoryRouter>
    )

    const heartIconLine = screen.getByTestId('toggle-favorite-line')
    expect(heartIconLine).toHaveClass('ri-heart-line')

    // after click
    mockedProduct = {
      ...MockedProduct(),
      isFavorite: true
    }

    const component = (
      <MemoryRouter>
        <Product product={mockedProduct} toggleCart={mockOnClick} toggleFavorite={mockOnClick} />
      </MemoryRouter>
    )

    const { rerender } = wrapper
    const componentRerendered = await reRenderComponent({ component, rerender })
    const toggleFavoriteBtnClick = screen.getByTestId('add-to-cart-btn')
    fireEvent.click(toggleFavoriteBtnClick)
    expect(mockOnClick).toHaveBeenCalledTimes(1)
    const heartIconFill = screen.getByTestId('toggle-favorite-fill')
    expect(heartIconFill).toHaveClass('ri-heart-fill')

    await wrapper.unmount()
  })

  test('remove from favorite button', async () => {
    mockedProduct = {
      ...MockedProduct(),
      isFavorite: true
    }

    // before click
    const wrapper = await renderComponent(
      <MemoryRouter>
        <Product product={mockedProduct} toggleFavorite={mockOnClick} />
      </MemoryRouter>
    )

    const heartIconFill = screen.getByTestId('toggle-favorite-fill')
    expect(heartIconFill).toHaveClass('ri-heart-fill')

    mockedProduct = {
      ...MockedProduct(),
      isFavorite: false
    }

    // after click
    const component = (
      <MemoryRouter>
        <Product product={mockedProduct} toggleCart={mockOnClick} toggleFavorite={mockOnClick} />
      </MemoryRouter>
    )
    const { rerender } = wrapper
    const componentRerendered = await reRenderComponent({ component, rerender })
    const toggleFavoriteBtnClick = screen.getByTestId('add-to-cart-btn')
    fireEvent.click(toggleFavoriteBtnClick)
    expect(mockOnClick).toHaveBeenCalledTimes(1)
    const heartIconLine = screen.getByTestId('toggle-favorite-line')
    expect(heartIconLine).toHaveClass('ri-heart-line')

    await wrapper.unmount()
  })

  test('check router redirect to product detail on product click', async () => {
    const history = createMemoryHistory()
    history.push = jest.fn()
    let actualProduct = {}
    const mockOnClick = (mockedProduct: IProduct) => {
      actualProduct = mockedProduct
    }
    const wrapper = await renderComponent(
      /*<Router location={history.location} navigator={history}>
        <Product product={mockedProduct} toggleCart={mockOnClick} />
      </Router>*/
      <HistoryRouter history={history}>
        <Product product={mockedProduct} toggleCart={mockOnClick} />
      </HistoryRouter>
    )
    const { getByRole } = wrapper
    fireEvent.click(getByRole('link'))
    expect(screen.getByRole('link')).toHaveAttribute('href', `/product/1`)
    expect(history.push).toHaveBeenCalledWith(
      {
        hash: '',
        pathname: '/product/1',
        search: ''
      },
      undefined
    )
    await wrapper.unmount()
  })
})
