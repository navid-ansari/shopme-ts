//export type Product = {};

import { rating } from './Rating'

export type IProduct = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: rating
  isFavorite: boolean
  isAddedToCart: boolean
}
