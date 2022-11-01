import React, { useEffect } from 'react'

// router
import { useParams } from 'react-router-dom'

// redux
import { useSelector, useDispatch } from 'react-redux'
import { selectedProduct } from '../redux/actions/productAction'

// component
import Detail from '../components/Detail'

import { IStore } from '../types/Store'

import { toast, ToastContainer } from 'react-toastify'
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
    <div className="detail-page" data-testid="detail-page">
      <ToastContainer className="foo" data-testid="toast-message" />
      <div className="container">
        <Detail {...product} />
      </div>
    </div>
  )
}

export default ProductDetail
