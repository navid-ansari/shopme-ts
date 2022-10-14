import { screen, act } from '@testing-library/react'
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
    jest.clearAllMocks()
    jest.resetAllMocks()
  })
  afterEach(() => {})
  afterAll(() => {})

  test('Check if Product detail page is rendered', async () => {
    const productId = 123
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(mockedProduct))
    const wrapper = await renderComponent(
      <MemoryRouter initialEntries={[`/product/${productId}`]}>
        <Routes>
          <Route path="/product/:productId" element={<ProductDetail />}></Route>
        </Routes>
      </MemoryRouter>
    )
    expect(screen.getByTestId('detail-page')).not.toBeNull()
    const page = screen.queryAllByTestId('detail-page')
    expect(page).toHaveLength(1)

    await wrapper.unmount()
  })

  test('Check if Product detail is fetched from api', async () => {
    const productId = 123
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(mockedProduct))

    const wrapper = await renderComponent(
      <MemoryRouter initialEntries={[`/product/${productId}`]}>
        <Routes>
          <Route path="/product/:productId" element={<ProductDetail />}></Route>
        </Routes>
      </MemoryRouter>
    )

    expect(mockedAxios.get).toHaveBeenCalledWith(`https://fakestoreapi.com/products/${productId}`)
    expect(mockedAxios.get).toHaveBeenCalledTimes(1)

    await wrapper.unmount()
  })

  test('Check if Product detail failed to fetch from api: 404', async () => {
    const productId = 123

    mockedAxios.get.mockRejectedValue({
      response: new NotFoundError('failed to fetch product from api')
    })
    const wrapper = await renderComponent(
      <MemoryRouter initialEntries={[`/product/${productId}`]}>
        <Routes>
          <Route path="/product/:productId" element={<ProductDetail />}></Route>
        </Routes>
      </MemoryRouter>
    )

    expect(mockedAxios.get).toHaveBeenCalledWith(`https://fakestoreapi.com/products/${productId}`)
    expect(mockedAxios.get).toHaveBeenCalledTimes(1)
    expect(await screen.findByText('Error Message')).toBeInTheDocument()

    await wrapper.unmount()
  })
})
