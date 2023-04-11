import React, { useEffect } from 'react'
import { axiosGet } from '../utils/axios-rest-client'
import InlineError from './Inline-Error'
import InlineLoading from './Inline-loading'

interface IService {
  showLoading?: boolean
  showError?: boolean
  loadingComponent?: JSX.Element
  errorComponent?: JSX.Element
  url: string
}

const DataLoader: React.FC<IService> = (props: IService) => {
  const { url } = props
  const getProducts = () => {
    return new Promise((resolve, reject) => {
      //const url = 'https://fakestoreapi.com/products'
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
    getProducts()
      .then((response: any) => {
        const { data } = response
        console.log(data)
      })
      .catch((error: any) => {
        console.log(error)
      })
  })

  return <div>Service Data</div>
}

export default DataLoader

DataLoader.defaultProps = {
  showLoading: true,
  showError: false,
  loadingComponent: <InlineLoading />,
  errorComponent: <InlineError />
}
