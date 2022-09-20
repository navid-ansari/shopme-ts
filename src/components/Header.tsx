import React from 'react'

// router
import { Link } from 'react-router-dom'

// redux
import { useSelector } from 'react-redux'
import { IStore } from '../types/Store'

import { useAuth0 } from '@auth0/auth0-react'

const Header = () => {
  const favorites = useSelector((state: IStore) => state.favorites)
  const cart = useSelector((state: IStore) => state.cart)
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0()

  const getFavoriteIcon = () => {
    if (favorites.length > 0) {
      return <i className="ri-heart-fill ri-2x"></i>
    } else {
      return <i className="ri-heart-line ri-2x"></i>
    }
  }

  const getCartIcon = () => {
    if (cart.length > 0) {
      return <i className="ri-shopping-cart-fill ri-2x"></i>
    } else {
      return <i className="ri-shopping-cart-line ri-2x"></i>
    }
  }

  return (
    <div className="header" id="header" data-testid="header">
      <div className="logo">
        <Link className="logo" to="/">
          <i className="ri-shopping-bag-line ri-fw ri-2x brand-logo"></i>
          <span className="brand-name">Shop Me</span>
        </Link>
      </div>
      <div className="checkout-section">
        <div className="favorite">
          <span className="favorite-count"> {favorites.length}</span>
          <Link to="/favorite">{getFavoriteIcon()}</Link>
        </div>
        <div className="cart">
          <span className="cart-count"> {cart.length}</span>
          <Link to="/cart">{getCartIcon()}</Link>
        </div>
        {!isAuthenticated && (
          <div className="login" onClick={() => loginWithRedirect()}>
            <i className="ri-lock-line ri-2x"></i>
          </div>
        )}
        {isAuthenticated && (
          <div className="logout" onClick={() => logout({ returnTo: window.location.origin })}>
            <span>
              {/* <i className="logout__welcome">Welcome</i>{' '} */}
              <i className="logout__username">{user?.name}</i>
            </span>
            <i className="ri-shield-user-line ri-2x"></i>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
