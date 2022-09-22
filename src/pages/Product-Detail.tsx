import React, { useEffect } from 'react'

// router
import { useParams } from 'react-router-dom'

// redux
import { useSelector, useDispatch } from 'react-redux'
import { selectedProduct } from '../redux/actions/productAction'

// component
import Detail from '../components/Detail'

import { axiosGet } from '../utils/axios-rest-client'
import { IStore } from '../types/Store'

const ProductDetail = () => {
  const { productId } = useParams()
  const product = useSelector((state: IStore) => state.product)
  const dispatch = useDispatch()

  const getProductDetail = async () => {
    return new Promise((resolve, reject) => {
      const url = `https://fakestoreapi.com/products/${productId}`
      axiosGet(url)
        .then((response: any) => {
          resolve(response)
        })
        .catch((error: any) => {
          reject(error)
        })
    })
  }

  useEffect(() => {
    getProductDetail()
      .then((response: any) => {
        dispatch(selectedProduct(response.data))
      })
      .catch((error: any) => {
        //console.log(error)
      })

    // clear product when component destroys
    /*return () => {
      dispatch(clearSelectedProduct())
    }*/
  }, [productId])

  return (
    <div className="detail-page" data-testid="detail-page">
      <div className="container">
        <Detail product={product} />
      </div>
    </div>
  )
}

export default ProductDetail
