export const getApiUrl = (route: string) => {
  const env = process.env.REACT_APP_ENV
  let url: any
  if (env == 'DEV') {
    url = devUrlMap(route)
  }
  if (env == 'PROD') {
    url = prodUrlMap(route)
  }
  return url
}

const devUrlMap = (route: string) => {
  const urlMap = new Map()
  urlMap.set('products', '/api/allproducts')
  urlMap.set('productDetails', '/api/productDetails')
  const url = `${process.env.REACT_APP_BASE_URL}${urlMap.get(route)}`
  return url
}

const prodUrlMap = (route: string) => {
  const urlMap = new Map()
  urlMap.set('products', '/products')
  urlMap.set('productdetails', '/products/')
  const url = `${process.env.REACT_APP_BASE_URL}${urlMap.get(route)}`
  return url
}
