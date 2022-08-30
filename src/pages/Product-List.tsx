import React from "react";

// component
import Product from "../components/Product";

// custom hook
import useProductActionHook from "../hooks/useProductActionHook";

import { IProduct } from "../types/Product";

const ProductList = () => {
 const { products, toggleFavorite, toggleCart } = useProductActionHook();

 const productsElem = products.map((product: IProduct) => (
  <Product
   key={product.id}
   product={product}
   toggleFavorite={() => toggleFavorite(product)}
   toggleCart={() => toggleCart(product)}
  />
 ));

 return (
  <div className="productlist-page">
   <div className="container">
    <div className="gallery" data-testid="gallery">
     {productsElem}
    </div>
   </div>
  </div>
 );
};

export default ProductList;
