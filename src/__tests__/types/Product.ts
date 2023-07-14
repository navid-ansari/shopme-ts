export interface IProduct {
  id: string
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: IRating
  isFavorite: boolean
  isAddedToCart: boolean
  //toggleFavorite: any
  //toggleCart: any
}

export interface IRating {
  rate: number
  count: number
}
