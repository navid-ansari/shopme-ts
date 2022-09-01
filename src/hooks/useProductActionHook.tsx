import { useEffect } from 'react'

// redux
import { useSelector, useDispatch } from 'react-redux'
import { setProducts } from '../redux/actions/productAction'
import { toggleFavoriteProduct } from '../redux/actions/favoriteProductsAction'
import { cartAction } from '../redux/actions/cartAction'

// axios
//import axios from "axios";

import { NotFoundError } from '../utils/error-handler'

import { get, throwError } from '../utils/rest-client'
import { IStore } from '../types/Store'
import { IProduct } from '../types/Product'

const useProductActionHook = () => {
  const products = useSelector((state: IStore) => state.products)
  const dispatch = useDispatch()

  const toggleFavorite = async (product: IProduct) => {
    const findProduct = products.find(
      (item: IProduct) => item.id === product.id
    )

    await dispatch(toggleFavoriteProduct(findProduct))

    if (findProduct) {
      const modifiedProducts = products.map((product: IProduct) => {
        if (product.id === findProduct.id) {
          return {
            ...product,
            isFavorite: !findProduct.isFavorite
          }
        } else {
          return product
        }
      })
      await dispatch(setProducts(modifiedProducts))
    }
  }

  const toggleCart = async (product: IProduct) => {
    const findProduct = products.find(
      (item: IProduct) => item.id === product.id
    )

    await dispatch(cartAction(findProduct))

    if (findProduct) {
      const modifiedProducts = products.map((product: IProduct) => {
        if (product.id === findProduct.id) {
          return {
            ...product,
            isAddedToCart: !findProduct.isAddedToCart
          }
        } else {
          return product
        }
      })
      await dispatch(setProducts(modifiedProducts))
    }
  }

  const getProducts = async () => {
    const url = 'https://fakestoreapi.com/products'
    try {
      const data = await get({ url })
      const modifiedProducts = data.map((product: IProduct) => {
        return {
          ...product,
          isAddedToCart: false,
          isFavorite: false
        }
      })
      // dispatch data to store
      dispatch(setProducts(modifiedProducts))
      return modifiedProducts
    } catch (error: any) {
      console.log('api failed to fetch')
      console.log(error)
      throwError({ status: error.response.status })
    }
  }

  useEffect(() => {
    ;(async () => {
      if (products.length === 0) {
        await getProducts()
      }
    })()
  }, [])

  return {
    products,
    dispatch,
    toggleFavorite,
    toggleCart,
    getProducts
  }
}

export default useProductActionHook
