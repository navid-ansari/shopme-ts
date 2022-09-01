import React from 'react'
import { render as rtlRender, screen } from '@testing-library/react'

import { Provider } from 'react-redux'

import { mockStore } from '../../redux/store'

import Header from '../../components/Header'

import { MemoryRouter } from 'react-router-dom'

import { renderComponent } from '../test-utils/component-renderer'

describe('Header component', () => {
  test('Render brand name in header', () => {
    renderComponent(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )
    expect(screen.getByText('Shop Me')).toBeInTheDocument()
  })

  test('background color should be #eb3b65', () => {
    renderComponent(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )
    expect(screen.getByTestId('header')).toHaveStyle(
      `background-color: #eb3b65)`
    )
  })
})
