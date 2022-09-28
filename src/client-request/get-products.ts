import { axiosGet } from '../utils/axios-rest-client'

const getProducts = () => {
  return new Promise((resolve, reject) => {
    const url = 'https://fakestoreapi.com/products'
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
