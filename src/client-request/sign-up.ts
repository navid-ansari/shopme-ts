import { axiosPost } from '../utils/axios-rest-client'
import { getApiUrl } from '../utils/get-api-url'

const signUp = (body: any) => {
  return new Promise((resolve, reject) => {
    //const url = 'https://fakestoreapi.com/products'
    //const baseUrl = process.env.REACT_APP_BASE_URL
    //const url = `${process.env.REACT_APP_BASE_URL}/api/allproducts`
    const url = getApiUrl('signUp')
    axiosPost(url, body)
      .then((response: any) => {
        resolve(response)
      })
      .catch((error: any) => {
        reject(error)
      })
  })
}

export default signUp
