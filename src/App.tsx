import React from 'react'

// router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'

//import './scss/common.scss'
//import './scss/header.scss'
//import './scss/footer.scss'

// pages
import ProductList from './pages/Product-List'
import ProductDetail from './pages/Product-Detail'
import FavoritesList from './pages/Favorites-List'

// components
import Header from './components/Header'
//import Footer from './components/Footer'
import NotFound from './components/NotFound'
import CartList from './pages/Cart-List'
import ServiceData from './pages/Service-Data'
import SignIn from './pages/Sign-In'
import SignUp from './pages/Sign-Up'
import Footer from './components/Footer'

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<ProductList />}></Route>
          <Route path="/sign-in" element={<SignIn />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="/product/:productId" element={<ProductDetail />}></Route>
          <Route path="/favorite" element={<FavoritesList />}></Route>
          <Route path="/cart" element={<CartList />}></Route>
          <Route path="/service-data" element={<ServiceData />}></Route>
          <Route path="*" element={<NotFound />}>
            404 Not Found
          </Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
