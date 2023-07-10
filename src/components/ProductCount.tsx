import React from 'react'

const ProductCount = () => {
  return (
    <div className="quantity-box">
      <button className="decrease-quantity">
        <i className="ri-subtract-line"></i>
      </button>
      <div className="quantity-count">5</div>
      <button className="increase-quantity">
        <i className="ri-add-line"></i>
      </button>
    </div>
  )
}

export default ProductCount
