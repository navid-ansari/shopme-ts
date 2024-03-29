export const getApiUrl = (route: string) => {
  const env = process.env.REACT_APP_ENV
  let url: any
  if (env == 'DEV') {
    url = devUrlMap(route)
  } else {
    //(env == 'PROD')
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
  const baseUrl = 'http://localhost:5001'
  const url = `${baseUrl}${urlMap.get(route)}`
  return url
}

const prodUrlMap = (route: string) => {
  const urlMap = new Map()
  urlMap.set('products', '/api/allproducts')
  urlMap.set('productDetails', '/api/productDetails')
  urlMap.set('signIn', '/api/signin')
  urlMap.set('signUp', '/api/signup')
  urlMap.set('roles', '/api/roles')
  const baseUrl = 'https://shopme-node-backend.onrender.com'
  const url = `${baseUrl}${urlMap.get(route)}`
  return url
}
