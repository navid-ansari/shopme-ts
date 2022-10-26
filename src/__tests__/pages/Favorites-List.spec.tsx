import { screen } from '@testing-library/react'
import { MemoryRouter as Router } from 'react-router-dom'

import { renderComponent } from '../test-utils/component-renderer'

import FavoritesList from '../../pages/Favorites-List'
import Favorite from '../../components/Favorite'

// mocks
import MockedFavorites from '../mocks/favorites'
import { IProduct } from '../types/Product'

describe('Product List page', () => {
  let mockedFavorites = [] as IProduct[]
  beforeAll(() => {})
  beforeEach(() => {
    mockedFavorites = MockedFavorites()
  })
  afterEach(() => {})
  afterAll(() => {})
  test('Check if page is rendered', async () => {
    const wrapper = renderComponent(
      <Router>
        <FavoritesList />
      </Router>
    )
    expect(screen.getByTestId('favorites-page')).not.toBeNull()

    await wrapper.unmount()
  })

  test('Check if favorites list is rendered', async () => {
    const favoritesElem = mockedFavorites.map((favorite) => <Favorite key={favorite.id} favorite={favorite} />)
    const wrapper = await renderComponent(<Router>{favoritesElem}</Router>)

    const favoriteItems = screen.getAllByTestId('product')
    expect(favoriteItems).toHaveLength(2)

    await wrapper.unmount()
  })
})
