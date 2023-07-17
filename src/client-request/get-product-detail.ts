import { axiosGet } from '../utils/axios-rest-client'
import { getApiUrl } from '../utils/get-api-url'

const getProductDetail = async (productId: string) => {
  return new Promise((resolve, reject) => {
    //const url = `https://fakestoreapi.com/products/${productId}`
    //const url = `http://localhost:5001/api/productDetails/${productId}`
    //const url = `${process.env.REACT_APP_BASE_URL}/api/productDetails/${productId}`
    const url = `${getApiUrl('productDetails')}/${productId}`
    //console.log('before api call')
    axiosGet(url)
      .then((response: any) => {
        //console.log('inside resolve')
        resolve(response)
      })
      .catch((error: any) => {
        //console.log('inside reject')
        reject(error)
      })
  })
}

export default getProductDetail
