import { axiosGet } from '../utils/axios-rest-client'

const getProductDetail = async (productId: string) => {
  return new Promise((resolve, reject) => {
    const url = `https://fakestoreapi.com/products/${productId}`
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
