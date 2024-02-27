import React from 'react'

// redux
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

// components
import Favorite from '../components/Favorite'
import { IProduct } from '../types/Product'

const FavoritesList = () => {
  const favorites = useSelector((state: RootState) => state.favorites)
  const favroriteElem = favorites.map((favorite: IProduct) => {
    return (
      <div className="favorite-product" key={favorite.id}>
        <Favorite key={favorite.id} favorite={favorite} />
      </div>
    )
  })
  /*return (
    <div className="favorites-page" data-testid="favorites-page">
      <div className="container">{favroriteElem}</div>
    </div>
  )*/
  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="favorites-page" data-testid="product-list-page">
          {favroriteElem}
        </div>
      </div>
    </div>
  )
}

export default FavoritesList
