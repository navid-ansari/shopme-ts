import { screen, waitFor, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter, Routes, Route } from 'react-router-dom'

import { renderComponent } from '../test-utils/component-renderer'

import ProductDetail from '../../pages/Product-Detail'

// mocks
import mockedproduct from '../mocks/product'

import axios from 'axios'
import { NotFoundError } from '../../utils/error-handler'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('Product detail page', () => {
  let mockedProduct = {}
  beforeAll(() => {})
  beforeEach(() => {
    mockedProduct = mockedproduct()
  })
  afterEach(() => {})
  afterAll(() => {})

  /*const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return {
   user: userEvent.setup(),
   ...render(ui, { wrapper: BrowserRouter }),
  };
 };

 renderWithRouter(renderComponent(<ProductDetail></ProductDetail>), {
  route: "/product/:productId",
 });*/

  test('Check if Product detail page is rendered', async () => {
    const productId = 123
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(mockedProduct))
    await act(() => {
      renderComponent(
        <MemoryRouter initialEntries={[`/product/${productId}`]}>
          <Routes>
            <Route path="/product/:productId" element={<ProductDetail />}></Route>
          </Routes>
        </MemoryRouter>
      )
    })
    expect(screen.getByTestId('detail-page')).not.toBeNull()
    const page = screen.queryAllByTestId('detail-page')
    expect(page).toHaveLength(1)
  })

  test('Check if Product detail is fetched from api', async () => {
    const productId = 123
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(mockedProduct))

    await act(() => {
      renderComponent(
        <MemoryRouter initialEntries={[`/product/${productId}`]}>
          <Routes>
            <Route path="/product/:productId" element={<ProductDetail />}></Route>
          </Routes>
        </MemoryRouter>
      )
    })

    await expect(mockedAxios.get).toHaveBeenCalledWith(
      `https://fakestoreapi.com/products/${productId}`
    )
    await expect(mockedAxios.get).toHaveBeenCalledTimes(1)
  })

  test('Check if Product detail failed to fetch from api: 400', async () => {
    const productId = 123
    /* mockedAxios.get.mockImplementationOnce(() =>
      Promise.reject(new NotFoundError('failed to fetch product from api'))
    )*/
    mockedAxios.get.mockRejectedValue(new NotFoundError('failed to fetch product from api'))

    await act(() => {
      renderComponent(
        <MemoryRouter initialEntries={[`/product/${productId}`]}>
          <Routes>
            <Route path="/product/:productId" element={<ProductDetail />}></Route>
          </Routes>
        </MemoryRouter>
      )
    })

    expect(mockedAxios.get).toHaveBeenCalledWith(`https://fakestoreapi.com/products/${productId}`)
    expect(mockedAxios.get).toHaveBeenCalledTimes(1)
    await expect(mockedAxios.get).rejects.toThrow(
      new NotFoundError('failed to fetch product from api')
    )
    await expect(mockedAxios.get).rejects.toThrowError('failed to fetch product from api')
  })
})
