import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Star from './Star'

const Stars = ({ rating }: { rating: number }) => {
  const [starCount, setStarCount] = useState<number[]>([])

  const generateStars = (rating: number) => {
    const stars = Math.ceil(rating)
    const array = []
    for (let i = 0; i < stars; i++) {
      array.push(i)
    }
    return array
  }

  useEffect(() => {
    const totalStars = generateStars(rating)
    setStarCount([...totalStars])
  }, [rating])

  const starElem = starCount.map((star) => <Star key={star} />)

  return (
    <span className="stars" data-testid="stars">
      {starElem}
    </span>
  )
}

export default Stars

Stars.prototype = {
  rating: PropTypes.number
}
