// redux
import { useSelector, useDispatch } from 'react-redux'
import { getProducts } from '../redux/slices/productsSlice'
import { RootState } from '../redux/store'
import { setCart } from '../redux/slices/cartSlice'
import { setFavorites } from '../redux/slices/favoriteSlice'

// types
import { IProduct } from '../types/Product'

const useProductActionHook = () => {
  const products = useSelector((state: RootState) => state.products)
  const dispatch = useDispatch()

  const toggleFavorite = async (product: IProduct) => {
    const findProduct = products.find((item: IProduct) => item.id === product.id) as IProduct
    dispatch(setFavorites(findProduct))

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
      await dispatch(getProducts(modifiedProducts))
    }
  }

  const toggleCart = async (product: IProduct) => {
    const findProduct = products.find((item: IProduct) => item.id === product.id) as IProduct
    await dispatch(setCart(findProduct))

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
      await dispatch(getProducts(modifiedProducts))
    }
  }

  /*const getProducts = () => {
    return new Promise((resolve, reject) => {
      //const url = 'https://fakestoreapi.com/products'
      const url = 'http://localhost:5001/api/allproducts'
      axiosGet(url)
        .then((response: any) => {
          resolve(response)
        })
        .catch((error: any) => {
          reject(error)
        })
    })
  }*/

  const setAllProducts = async (products: IProduct[]) => {
    await dispatch(getProducts(products))
  }

  const setUserDetails = async (user: any) => {
    console.log(user)
  }

  /*useEffect(() => {
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
          dispatch(setProducts(modifiedProducts))
        })
        .catch((error: any) => {
          //console.log(error) // show error on alert box on UI
        })
    }
  }, [])*/

  return {
    products,
    dispatch,
    toggleFavorite,
    toggleCart,
    //getProducts,
    setAllProducts,
    setUserDetails
  }
}

export default useProductActionHook
