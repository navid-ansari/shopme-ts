import React, { useState, useEffect } from 'react'

// router
import { useParams, useLocation } from 'react-router-dom'

// redux
import { useSelector, useDispatch } from 'react-redux'
import {
  selectedProduct,
  clearSelectedProduct
} from '../redux/actions/productAction'

// component
import Detail from '../components/Detail'

import { get } from '../utils/rest-client'
import { axiosGet } from '../utils/axios-rest-client'
import { IStore } from '../types/Store'
import parseResponse from '../utils/parse-response'

const ProductDetail = () => {
  const { productId } = useParams()
  const product = useSelector((state: IStore) => state.product)
  const dispatch = useDispatch()

  useEffect(() => {
    const getProductDetail = async () => {
      const url = `https://fakestoreapi.com/products/${productId}`
      const response: any = await axiosGet(url)
      //console.log(response.data)
      //const data = await parseResponse(await get({ url }))
      //const data = await parseResponse(response)
      dispatch(selectedProduct(response.data))
      return response
    }
    //if (productId && productId !== '') {
    getProductDetail()
    //}

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
