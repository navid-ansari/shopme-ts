import React, { useEffect } from 'react'

// router
import { useParams } from 'react-router-dom'

// redux
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { clearProductDetails, getProductDetailsAsync } from '../redux/slices/productDetailsSlice'

// component
import Detail from '../components/Detail'

const ProductDetail = () => {
  const productId: string = useParams().productId || ''
  const product = useSelector((state: RootState) => state.product)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getProductDetailsAsync({ productId }))
    /*getProductDetail(productId!)
      .then((response: any) => {
        //dispatch(selectedProduct(response.data))
        //const data: IProduct = response.data
        //dispatch(setProductDetails(data))
        setDetails(response.data)
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
      })*/
    // clear product when component destroys
    return () => {
      dispatch(clearProductDetails())
    }
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
