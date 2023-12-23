import React from 'react'
import { screen, fireEvent } from '@testing-library/react'

import Header from '../../components/Header'

import { MemoryRouter, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { renderComponent } from '../test-utils/component-renderer'
import testStore from '../test-utils/redux/test-store'
import { toggleFavoriteProduct } from '../../redux/actions/favoriteProductsAction'
import { Provider } from 'react-redux'
import ProductData from '../mocks/data/Product'
import { cartAction } from '../../redux/actions/cartAction'

describe('Header component', () => {
  let store: any
  beforeAll(() => {})
  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
    store = testStore()
  })
  afterEach(() => {})
  afterAll(() => {})
  test('Render brand name in header', async () => {
    const wrapper = await renderComponent(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )
    expect(screen.getByText('Shop Me')).toBeInTheDocument()

    await wrapper.unmount()
  })

  test('background color should be #eb3b65', async () => {
    const wrapper = await renderComponent(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )
    expect(screen.getByTestId('header')).toHaveStyle('background-color: #eb3b65)')

    await wrapper.unmount()
  })

  test('check if click on bag icon is redirects to home route', async () => {
    const history = createMemoryHistory()
    history.push = jest.fn()
    const wrapper = await renderComponent(
      <HistoryRouter history={history}>
        <Header />
      </HistoryRouter>
    )
    const { getAllByRole } = wrapper
    expect(getAllByRole('link')[0]).toHaveAttribute('href', '/')
    fireEvent.click(getAllByRole('link')[0])
    expect(history.location.pathname).toBe('/')

    await wrapper.unmount()
  })

  test('check line heart icon is rendered if no product is added to favorite', async () => {
    const wrapper = await renderComponent(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )
    const { container } = wrapper
    expect(container.getElementsByClassName('ri-heart-line').length).toBe(1)
    expect(container.getElementsByClassName('ri-heart-fill').length).toBe(0)

    await wrapper.unmount()
  })

  test('check fill heart icon is rendered if product is added to favorite', async () => {
    const component = (
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    const wrapper = await renderComponent(component)
    const { container, rerender } = wrapper
    expect(container.getElementsByClassName('ri-heart-line').length).toBe(1)
    expect(container.getElementsByClassName('ri-heart-fill').length).toBe(0)

    await store.dispatch(toggleFavoriteProduct(ProductData()))

    const wrapperRerender = await rerender(<Provider store={store}>{component}</Provider>)

    expect(screen.getByTestId('heart-fill-icon')).toHaveClass('ri-heart-fill')
    expect(screen.getByTestId('heart-fill-icon')).not.toHaveClass('ri-heart-line')

    await wrapper.unmount()
  })

  test('check if click on line heart icon is redirects to favorite route', async () => {
    const history = createMemoryHistory()
    history.push = jest.fn()
    const wrapper = await renderComponent(
      <HistoryRouter history={history}>
        <Header />
      </HistoryRouter>
    )
    const { getAllByRole } = wrapper
    fireEvent.click(getAllByRole('link')[1])
    expect(getAllByRole('link')[1]).toHaveAttribute('href', '/favorite')
    expect(history.push).toHaveBeenCalledWith(
      {
        hash: '',
        pathname: '/favorite',
        search: ''
      },
      undefined
    )
    await wrapper.unmount()
  })

  test('check line cart icon is rendered if no product is added to cart', async () => {
    const wrapper = await renderComponent(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )
    const { container } = wrapper
    expect(container.getElementsByClassName('ri-shopping-cart-line').length).toBe(1)
    expect(container.getElementsByClassName('ri-shopping-cart-fill').length).toBe(0)

    await wrapper.unmount()
  })

  test('check fill cart icon is rendered if product is added to cart', async () => {
    const component = (
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    const wrapper = await renderComponent(component)
    const { container, rerender } = wrapper
    expect(container.getElementsByClassName('ri-shopping-cart-line').length).toBe(1)
    expect(container.getElementsByClassName('ri-shopping-cart-fill').length).toBe(0)

    await store.dispatch(cartAction(ProductData()))

    const wrapperRerender = await rerender(<Provider store={store}>{component}</Provider>)

    expect(screen.getByTestId('cart-fill-icon')).toHaveClass('ri-shopping-cart-fill')
    expect(screen.getByTestId('cart-fill-icon')).not.toHaveClass('ri-shopping-cart-line')

    await wrapper.unmount()
  })

  test('check if click on line cart icon is redirects to cart route', async () => {
    const history = createMemoryHistory()
    history.push = jest.fn()
    const wrapper = await renderComponent(
      <HistoryRouter history={history}>
        <Header />
      </HistoryRouter>
    )
    const { getAllByRole } = wrapper
    fireEvent.click(getAllByRole('link')[2])
    expect(getAllByRole('link')[2]).toHaveAttribute('href', '/cart')
    expect(history.push).toHaveBeenCalledWith(
      {
        hash: '',
        pathname: '/cart',
        search: ''
      },
      undefined
    )

    await wrapper.unmount()
  })
})
