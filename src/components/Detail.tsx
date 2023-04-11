import React from 'react'
import PropTypes from 'prop-types'

// component
import Stars from '../components/Stars'
import { IProduct } from '../types/Product'
import CartButton from './CartButton'

export const Detail = ({ category, description, id, image, price, rating, title }: IProduct) => {
  const { rate, count } = rating || {}

  return (
    <div className="product" data-testid="product">
      <div className="left-column">
        <img src={image} alt="" data-testid="product-image" />
      </div>
      <div className="right-column">
        <h2 className="product-title" data-testid="product-title">
          {title}
        </h2>
        <div className="product-description">
          <span className="decription" data-testid="decription-title">
            Description:
          </span>
          <span className="description-text" data-testid="decription-text">
            {description}
          </span>
        </div>
        <div className="product-rating">
          <span className="rating" data-testid="rating-title">
            Rating:
          </span>
          {rate && (
            <span className="rating-stars">
              <Stars rating={rate} />
            </span>
          )}
        </div>
        <div className="product-review">
          <span className="reviews" data-testid="reviews-title">
            Reviews:
          </span>
          <span className="total-reviews" data-testid="reviews-count">
            {count} reviews
          </span>
        </div>
        <div className="product-price">
          <span className="price" data-testid="price-title">
            Price:
          </span>
          <span className="total-price" data-testid="price-value">
            &#x20b9; {price}
          </span>
        </div>
      </div>
      <div className="action-column">
        <div className="quantity-box">
          <button className="decrease-quantity">
            <i className="ri-subtract-line"></i>
          </button>
          <div className="quantity-count">5</div>
          <button className="increase-quantity">
            <i className="ri-add-line"></i>
          </button>
        </div>
        <CartButton></CartButton>
      </div>
    </div>
  )
}

export default Detail

Detail.prototype = {
  category: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.number,
  image: PropTypes.string,
  price: PropTypes.number,
  rating: PropTypes.shape({
    rate: PropTypes.number,
    count: PropTypes.number
  }),
  title: PropTypes.string
}
