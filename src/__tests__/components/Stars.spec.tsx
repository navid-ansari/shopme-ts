import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { screen } from '@testing-library/react'

import { renderComponent } from '../test-utils/component-renderer'

import Stars from '../../components/Stars'
import Star from '../../components/Star'

describe('Stars component', () => {
  beforeAll(() => {})
  beforeEach(() => {})
  afterEach(() => {})
  afterAll(() => {})
  test('Should render component', async () => {
    const rating = 3.9
    const wrapper = await renderComponent(
      <MemoryRouter>
        <Stars rating={rating} />
      </MemoryRouter>
    )
    await expect(screen.getByTestId('stars')).not.toBeNull()

    await wrapper.unmount()
  })

  test('should render stars', async () => {
    const starsArray = [0, 1, 2, 3]
    const starsElem = starsArray.map((star) => <Star key={star} />)
    const wrapper = await renderComponent(<MemoryRouter>{starsElem}</MemoryRouter>)
    const stars = screen.queryAllByTestId('star')
    await expect(stars).toHaveLength(4)

    await wrapper.unmount()
  })
})
