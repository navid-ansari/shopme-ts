import React from 'react'

// router
import { Link } from 'react-router-dom'

// redux
import { useSelector } from 'react-redux'

import { useAuth0 } from '@auth0/auth0-react'
import { RootState } from '../redux/store'

const Header = () => {
  const favorites = useSelector((state: RootState) => state.favorites)
  const cart = useSelector((state: RootState) => state.cart)
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0()

  const getFavoriteIcon = () => {
    if (favorites && favorites.length > 0) {
      return <i className="ri-heart-fill" data-testid="heart-fill-icon"></i>
    } else {
      return <i className="ri-heart-line" data-testid="heart-line-icon"></i>
    }
  }

  const getCartIcon = () => {
    if (cart && cart.length > 0) {
      return <i className="ri-shopping-cart-fill" data-testid="cart-fill-icon"></i>
    } else {
      return <i className="ri-shopping-cart-line" data-testid="cart-line-icon"></i>
    }
  }

  return (
    <div className="header" id="header" data-testid="header">
      <div className="logo">
        <Link className="logo" to="/">
          <i className="ri-shopping-bag-line ri-fw brand-logo"></i>
          <span className="brand-name">Shop Me</span>
        </Link>
      </div>
      <div className="checkout-section">
        <div className="favorite checkout-section-icon">
          {favorites && favorites.length > 0 && <span className="favorite-count"> {favorites.length}</span>}
          <Link to="/favorite" className="favorite-icon">
            {getFavoriteIcon()}
          </Link>
        </div>
        <div className="cart checkout-section-icon">
          {cart && cart.length > 0 && <span className="cart-count"> {cart.length}</span>}
          <Link to="/cart" className="cart-icon">
            {getCartIcon()}
          </Link>
        </div>
        {!isAuthenticated && (
          <div className="login checkout-section-icon" onClick={() => loginWithRedirect()}>
            <i className="ri-lock-line login-icon"></i>
          </div>
        )}
        {isAuthenticated && (
          <div className="logout checkout-section-icon" onClick={() => logout({ returnTo: window.location.origin })}>
            <span>
              {/* <i className="logout__welcome">Welcome</i>{' '} */}
              <i className="logout__username">{user?.name}</i>
            </span>
            <i className="ri-shut-down-line logout-icon"></i>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
