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
  urlMap.set('signIn', '/api/signin')
  urlMap.set('signUp', '/api/signup')
  urlMap.set('roles', '/api/roles')
  const url = `${process.env.REACT_APP_BASE_URL}${urlMap.get(route)}`
  return url
}

const prodUrlMap = (route: string) => {
  const urlMap = new Map()
  urlMap.set('products', '/products')
  urlMap.set('productDetails', '/products')
  const url = `${process.env.REACT_APP_BASE_URL}${urlMap.get(route)}`
  return url
}
