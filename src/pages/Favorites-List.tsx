import React from 'react'

// redux
import { useSelector } from 'react-redux'

// components
import Favorite from '../components/Favorite'
import { IProduct } from '../types/Product'
import { IStore } from '../types/Store'

const FavoritesList = () => {
  const favorites = useSelector((state: IStore) => state.favorites)
  const favroriteElem = favorites.map((favorite: IProduct) => <Favorite key={favorite.id} favorite={favorite} />)
  return (
    <div className="favorites-page" data-testid="favorites-page">
      <div className="container">{favroriteElem}</div>
    </div>
  )
}

export default FavoritesList
