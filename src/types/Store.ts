import { IProduct } from './Product'

export type IStore = {
  products: IProduct[]
  product: IProduct
  favorites: IProduct[]
  cart: IProduct[]
}
