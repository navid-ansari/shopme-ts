import React from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ProductList from '../pages/Product-List'
import { renderComponent } from './test-utils/component-renderer'
import { screen } from '@testing-library/react'
import ProductDetail from '../pages/Product-Detail'
import FavoritesList from '../pages/Favorites-List'
import CartList from '../pages/Cart-List'
import NotFound from '../components/NotFound'
import axios from 'axios'
// mocks
import MockedProducts from './mocks/products'
import { IProduct } from '../types/Product'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('App component', () => {
  let mockedProducts = [] as IProduct[]
  const mockedProduct = {} as IProduct[]
  /*let header: any
  let footer: any*/
  beforeAll(() => {})
  beforeEach(() => {
    mockedProducts = MockedProducts()
    jest.clearAllMocks()
    /*header = await renderComponent(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )
    footer = await renderComponent(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )*/
  })
  afterEach(() => {
    /*await header.unmount()
    await footer.unmount()*/
  })
  afterAll(() => {})

  test('check if product list route is rendered', async () => {
    const mAxiosResponse = {
      data: mockedProducts,
      status: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      statusText: '',
      config: {
        url: 'https://fakestoreapi.com/products'
      }
    }
    mockedAxios.get.mockResolvedValueOnce(mAxiosResponse)
    const wrapper = await renderComponent(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<ProductList />}></Route>
        </Routes>
      </MemoryRouter>
    )
    const { container } = wrapper
    expect(container.getElementsByClassName('productlist-page').length).toBe(1)
    expect(container.getElementsByClassName('detail-page').length).toBe(0)
    expect(container.getElementsByClassName('favorites-page').length).toBe(0)
    expect(container.getElementsByClassName('cart-page').length).toBe(0)
    expect(container.getElementsByClassName('notfound-page').length).toBe(0)
    await wrapper.unmount()
  })

  test('check if product detail route is rendered', async () => {
    const productId = 123
    const mAxiosResponse = {
      data: mockedProduct,
      status: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      statusText: '',
      config: {
        url: `https://fakestoreapi.com/products/${productId}`
      }
    }
    mockedAxios.get.mockResolvedValueOnce(mAxiosResponse)
    const wrapper = await renderComponent(
      <MemoryRouter initialEntries={[`/product/${productId}`]}>
        <Routes>
          <Route path="/product/:productId" element={<ProductDetail />}></Route>
        </Routes>
      </MemoryRouter>
    )
    const { container } = wrapper
    expect(container.getElementsByClassName('productlist-page').length).toBe(0)
    expect(container.getElementsByClassName('detail-page').length).toBe(1)
    expect(container.getElementsByClassName('favorites-page').length).toBe(0)
    expect(container.getElementsByClassName('cart-page').length).toBe(0)
    expect(container.getElementsByClassName('notfound-page').length).toBe(0)
    await wrapper.unmount()
  })

  test('check if product favorite route is rendered', async () => {
    const wrapper = await renderComponent(
      <MemoryRouter initialEntries={[`/favorite`]}>
        <Routes>
          <Route path="/favorite" element={<FavoritesList />}></Route>
        </Routes>
      </MemoryRouter>
    )
    const { container } = wrapper
    expect(container.getElementsByClassName('productlist-page').length).toBe(0)
    expect(container.getElementsByClassName('detail-page').length).toBe(0)
    expect(container.getElementsByClassName('favorites-page').length).toBe(1)
    expect(container.getElementsByClassName('cart-page').length).toBe(0)
    expect(container.getElementsByClassName('notfound-page').length).toBe(0)
    await wrapper.unmount()
  })

  test('check if product cart route is rendered', async () => {
    const wrapper = await renderComponent(
      <MemoryRouter initialEntries={[`/cart`]}>
        <Routes>
          <Route path="/cart" element={<CartList />}></Route>
        </Routes>
      </MemoryRouter>
    )
    const { container } = wrapper
    expect(container.getElementsByClassName('productlist-page').length).toBe(0)
    expect(container.getElementsByClassName('detail-page').length).toBe(0)
    expect(container.getElementsByClassName('favorites-page').length).toBe(0)
    expect(container.getElementsByClassName('cart-page').length).toBe(1)
    await wrapper.unmount()
  })

  test('check if product not found route is rendered', async () => {
    const wrapper = await renderComponent(
      <MemoryRouter initialEntries={[`/invalid-route`]}>
        <Routes>
          <Route path="/*" element={<NotFound />}></Route>
        </Routes>
      </MemoryRouter>
    )
    const { container } = wrapper
    expect(container.getElementsByClassName('productlist-page').length).toBe(0)
    expect(container.getElementsByClassName('detail-page').length).toBe(0)
    expect(container.getElementsByClassName('favorites-page').length).toBe(0)
    expect(container.getElementsByClassName('cart-page').length).toBe(0)
    expect(container.getElementsByClassName('notfound-page').length).toBe(1)
    expect(screen.getByText('404 - Url Not Found')).toBeInTheDocument()
    await wrapper.unmount()
  })
})
