import React, { useEffect } from 'react'

// redux
import getProducts from '../client-request/get-products'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

// component
import Product from '../components/Product'

// custom hook
import useProductActionHook from '../hooks/useProductActionHook'

// types
import { IProduct } from '../types/Product'

const ProductList = () => {
  const products = useSelector((state: RootState) => state.products)
  const { toggleFavorite, toggleCart, setAllProducts } = useProductActionHook()

  useEffect(() => {
    if (products.length == 0) {
      getProducts()
        .then((response: any) => {
          const { data } = response
          const modifiedProducts = data.map((product: IProduct) => {
            return {
              ...product,
              isAddedToCart: false,
              isFavorite: false
            }
          })
          // dispatch data to store
          setAllProducts(modifiedProducts)
        })
        .catch((error: any) => {
          //console.log(error) // show error on alert box on UI
        })
    }
  }, [])

  const productsElem = products.map((product: IProduct) => (
    <Product
      key={product.id}
      product={product}
      toggleFavorite={() => toggleFavorite(product)}
      toggleCart={() => toggleCart(product)}
    />
  ))

  /*return (
    <div className="productlist-page">
      <div className="container">
        <div className="gallery" data-testid="gallery">
          {productsElem}
        </div>
      </div>
    </div>
  )*/
  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="product-list-page" data-testid="product-list-page">
          {productsElem}
        </div>
      </div>
    </div>
  )
}

export default ProductList
