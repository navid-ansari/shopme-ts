import React, { ReactNode } from 'react'
import { render as rtlRender } from '@testing-library/react'
import { Provider } from 'react-redux'

//import { mockStore } from '../../redux/store'
//import mockStore from '../test-utils/redux/mock-store'
//import configureStore from 'redux-mock-store'
import mockStore from './redux/mock-store'

/*const mockStore = configureStore()
const initialState = { products: [], product: {}, favorites: [], cart: [] }
const store = mockStore(initialState)*/
const store = mockStore()

export const renderComponent = (component: ReactNode, testStore: any = store) =>
  rtlRender(<Provider store={testStore}>{component}</Provider>)

/*export const renderComponenWithStoret = (component: any, store: any) =>
  rtlRender(<Provider store={store}>{component}</Provider>)*/

export const reRenderComponent = ({ component, rerender }: { component: ReactNode; rerender: any }) =>
  rerender(<Provider store={store}>{component}</Provider>)
