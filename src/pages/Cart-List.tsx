import React from 'react'

// redux
import { useSelector } from 'react-redux'

// components
import Cart from '../components/Cart'

import { IProduct } from '../types/Product'
import { IStore } from '../types/Store'

const CartList = () => {
  const cart = useSelector((state: IStore) => state.cart)

  const cartElem = cart.map((product: IProduct) => {
    return (
      <div className="cart-product" data-testid="cart-product" key={product.id}>
        <Cart key={product.id} product={product} />
      </div>
    )
  })

  /*return (
    <div className="cart-page" data-testid="cart-page">
      <div className="container">{cartElem}</div>
    </div>
  )*/
  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="cart-page" data-testid="cart-page">
          {cartElem}
        </div>
      </div>
    </div>
  )
}

export default CartList
