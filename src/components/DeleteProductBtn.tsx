import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
//import { IProduct } from '../types/Product'

/*type IDeleteProductBtnProps = {
  removeProduct(product: IProduct): void
}*/

interface DeleteProductBtnProps {
  toggleFavorite: () => void
  toggleCart: () => void
  //removeProduct: (params: any) => any
  //toggleFavorite: (params: any) => any
  //toggleCart: (params: any) => any
  //removeProduct(product: IProduct): void
  //removeProduct: (product: IProduct) => void
}

const DeleteProductBtn = ({ toggleFavorite, toggleCart }: DeleteProductBtnProps) => {
  const location = useLocation()
  const { pathname } = location

  //let clickEvent: (params: any) => void
  let clickEvent: any

  if (pathname == '/cart') {
    clickEvent = toggleCart
  } else if (pathname == '/favorite') {
    clickEvent = toggleFavorite
  }

  return (
    <button className="delete-cart-item" data-testid="delete-cart-item" onClick={clickEvent}>
      <i className="ri-delete-bin-line"></i>
    </button>
  )
}

export default DeleteProductBtn

DeleteProductBtn.propTypes = {
  toggleFavorite: PropTypes.func,
  toggleCart: PropTypes.func
}
