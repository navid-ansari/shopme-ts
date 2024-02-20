import React, { ReactNode } from 'react'
import { render as rtlRender } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from '../../redux/store'

export const renderComponent = (component: ReactNode, testStore: any = store) =>
  rtlRender(<Provider store={testStore}>{component}</Provider>)

/*export const renderComponenWithStoret = (component: any, store: any) =>
  rtlRender(<Provider store={store}>{component}</Provider>)*/

export const reRenderComponent = ({ component, rerender }: { component: ReactNode; rerender: any }) =>
  rerender(<Provider store={store}>{component}</Provider>)
