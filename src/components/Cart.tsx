import React from 'react'
import PropTypes from 'prop-types'

// component
import Detail from './Detail'
import { IProduct } from '../types/Product'

const Cart = ({ product }: { product: IProduct }) => {
  return (
    <div className="cart-item" data-testid="cart-item">
      <Detail {...product} />
    </div>
  )
}

export default Cart

Cart.prototype = {
  favorite: PropTypes.shape({
    category: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    image: PropTypes.string,
    price: PropTypes.number,
    rating: PropTypes.shape({
      rate: PropTypes.number,
      count: PropTypes.number
    }),
    title: PropTypes.string,
    isFavorite: PropTypes.bool,
    isAddedToCart: PropTypes.bool
  })
}
