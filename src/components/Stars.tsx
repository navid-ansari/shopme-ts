import React, { useState, useEffect } from 'react'

import Star from './Star'

const Stars = (props: Props) => {
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
    /*;(async () => {
      const totalStars: number[] = await generateStars(props.rating)
      setStarCount([...totalStars])
    })()*/
    const totalStars = generateStars(props.rating)
    setStarCount([...totalStars])
  }, [props.rating])

  const starElem = starCount.map(star => <Star key={star} />)

  return (
    <span className="stars" data-testid="stars">
      {starElem}
    </span>
  )
}

export default Stars

type Props = {
  rating: number
}
