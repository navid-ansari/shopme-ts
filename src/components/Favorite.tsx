import React from 'react'
import PropTypes from 'prop-types'

// component
import Detail from './Detail'
import { IProduct } from '../types/Product'

const Favorite = ({ favorite }: { favorite: IProduct }) => {
  return <Detail {...favorite} />
}

export default Favorite

Favorite.prototype = {
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
