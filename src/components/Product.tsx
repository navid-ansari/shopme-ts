import React from 'react'
import PropTypes from 'prop-types'

// router
import { Link } from 'react-router-dom'
import { ProductProps } from '../types/Product-Props'

/*interface IProduct {
  category: string
  description: string
  id: number
  image: string
  price: number
  rating: {
    rate: number
    count: number
  }
  title: string
  isFavorite: boolean
  isAddedToCart: boolean
}

interface ProductProps {
  product: IProduct
  toggleFavorite(product: IProduct): void
  toggleCart(product: IProduct): void
}*/

const Product = ({ product, toggleFavorite, toggleCart }: ProductProps) => {
  const { category, description, id, image, price, rating, title, isFavorite, isAddedToCart } = product

  const getFavoriteIcon = () => {
    if (isFavorite) {
      return (
        <i
          className="ri-heart-fill ri-fw ri-2x"
          data-testid="toggle-favorite-fill"
          onClick={() => toggleFavorite(product)}
        ></i>
      )
    } else {
      return (
        <i
          className="ri-heart-line ri-fw ri-2x"
          data-testid="toggle-favorite-line"
          onClick={() => toggleFavorite(product)}
        ></i>
      )
    }
  }

  const getButtonText = () => {
    if (isAddedToCart) {
      return 'Remove From Cart'
    } else {
      return 'Add To Cart'
    }
  }

  return (
    <div className="content" id="content" data-testid="content">
      <div className="favorite-icon" data-testid="favorite-icon">
        {getFavoriteIcon()}
      </div>
      <Link to={`/product/${id}`}>
        <img src={image} style={{ height: '200px' }} alt="" data-testid="product-image" />
        <h3 data-testid="product-title">{title}</h3>
        <p data-testid="product-description">{description}</p>
        <h6 data-testid="product-price">
          <span>&#x20b9;</span>
          {price}
        </h6>
      </Link>
      <button
        className={isAddedToCart ? 'remove-from-cart' : 'add-to-cart'}
        data-testid="add-to-cart-btn"
        onClick={() => toggleCart(product)}
      >
        {getButtonText()}
      </button>
    </div>
  )
}

export default Product

Product.propTypes = {
  product: PropTypes.shape({
    category: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number,
    rating: PropTypes.shape({
      rate: PropTypes.number,
      count: PropTypes.number
    }),
    title: PropTypes.string,
    isFavorite: PropTypes.bool,
    isAddedToCart: PropTypes.bool
    //toggleFavorite: PropTypes.func,
    //toggleCart: PropTypes.func
  }),
  toggleFavorite: PropTypes.func,
  toggleCart: PropTypes.func
}
