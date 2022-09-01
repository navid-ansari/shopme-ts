export interface IProduct {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: IRating
  isFavorite: boolean
  isAddedToCart: boolean
}

export interface IRating {
  rate: number
  count: number
}
