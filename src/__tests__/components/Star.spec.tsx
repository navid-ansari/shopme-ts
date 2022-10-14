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
    const wrapper = await renderComponent(
      <MemoryRouter>
        <Star />
      </MemoryRouter>
    )
    await expect(screen.getByTestId('star')).not.toBeNull()

    await wrapper.unmount()
  })

  test('Check if Star icon is rendered', async () => {
    const wrapper = await renderComponent(
      <MemoryRouter>
        <Star />
      </MemoryRouter>
    )
    await expect(screen.getByTestId('ri-star-fill')).not.toBeNull()
    const star = screen.queryAllByTestId('ri-star-fill')
    await expect(star).toHaveLength(1)

    await wrapper.unmount()
  })
})
