import React, { useEffect } from 'react'

// router
import { useParams } from 'react-router-dom'

// redux
import { useSelector, useDispatch } from 'react-redux'
import { selectedProduct } from '../redux/actions/productAction'

// component
import Detail from '../components/Detail'

import { IStore } from '../types/Store'

import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import getProductDetail from '../client-request/get-product-detail'

const ProductDetail = () => {
  const { productId } = useParams()
  const product = useSelector((state: IStore) => state.product)
  const dispatch = useDispatch()

  useEffect(() => {
    getProductDetail(productId!)
      .then((response: any) => {
        dispatch(selectedProduct(response.data))
        toast.success('Success Message', {
          position: 'top-right',
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
      })
      .catch((error: AxiosError) => {
        toast.success('Error Message', {
          position: 'top-right',
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
      })

    // clear product when component destroys
    /*return () => {
      dispatch(clearSelectedProduct())
    }*/
  }, [productId])

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="product-detail-page" data-testid="product-detail-page">
          <Detail {...product} />
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
