import { screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { renderComponent } from '../test-utils/component-renderer'

import Star from '../../components/Star'

describe('Star component', () => {
  beforeAll(() => {})
  beforeEach(() => {})
  afterEach(() => {})
  afterAll(() => {})

  test('Check if Star component is rendered', async () => {
    renderComponent(
      <MemoryRouter>
        <Star />
      </MemoryRouter>
    )
    await expect(screen.getByTestId('star')).not.toBeNull()
  })

  test('Check if Star icon is rendered', async () => {
    renderComponent(
      <MemoryRouter>
        <Star />
      </MemoryRouter>
    )
    await expect(screen.getByTestId('ri-star-fill')).not.toBeNull()
    const star = screen.queryAllByTestId('ri-star-fill')
    await expect(star).toHaveLength(1)
  })
})
