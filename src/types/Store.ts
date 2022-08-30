import { IProduct } from "./Product";

export interface IStore {
 products: IProduct[];
 product: IProduct;
 favorites: IProduct[];
 cart: IProduct[];
}
