import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import store from './redux/store'
import { Auth0Provider } from '@auth0/auth0-react'
import axios from 'axios'

// For GET requests
axios.interceptors.request.use(
  (req) => {
    // Add configurations here
    console.log(req)
    document.body.classList.add('spinner')
    return req
  },
  (err) => {
    return Promise.reject(err)
  }
)

// For POST requests
axios.interceptors.response.use(
  (res) => {
    // Add configurations here
    document.body.classList.remove('spinner')
    if (res.status === 201) {
      console.log('POST Response => ' + res)
    }
    return res
  },
  (err) => {
    return Promise.reject(err)
  }
)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Auth0Provider
    domain="navideng.auth0.com"
    clientId="SznAHzdIfsuxCC4HvxOoSK0blVmyETFa"
    redirectUri={window.location.origin}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </Auth0Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
