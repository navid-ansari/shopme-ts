import { axiosGet } from '../utils/axios-rest-client'

const getProducts = () => {
  return new Promise((resolve, reject) => {
    //const url = 'https://fakestoreapi.com/products'
    //const baseUrl = process.env.REACT_APP_BASE_URL
    const url = `${process.env.REACT_APP_BASE_URL}/api/allproducts`
    axiosGet(url)
      .then((response: any) => {
        resolve(response)
      })
      .catch((error: any) => {
        reject(error)
      })
  })
}

export default getProducts
