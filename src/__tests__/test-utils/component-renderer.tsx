import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { Provider } from 'react-redux'

import { mockStore } from '../../redux/store'

export const renderComponent = (component: any) =>
  rtlRender(<Provider store={mockStore}>{component}</Provider>)

export const reRenderComponent = ({ component, rerender }: { component: any; rerender: any }) =>
  rerender(<Provider store={mockStore}>{component}</Provider>)
