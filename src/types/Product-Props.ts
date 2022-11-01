import { IProduct } from './Product'

export type ProductProps = {
  product: IProduct
  toggleFavorite(product: IProduct): void
  toggleCart(product: IProduct): void
}
