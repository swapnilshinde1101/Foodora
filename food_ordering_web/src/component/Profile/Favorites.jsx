import React from 'react'
import RestaurantCard from '../Restaurant/RestaurantCard'
import { useSelector } from 'react-redux'
import { store } from '../../State/store'

export const Favorites = () => {
  const { auth } = useSelector(store => store)

  return (
    <div>
      <h1 className='py-5 text-xl font-semibold text-center'>My Favorites</h1>
      {/* Check if there are no favorites */}
      {auth.Favorites.length === 0 ? (
        <p className="text-center text-lg text-gray-500">You haven't added any favorites yet.</p>
      ) : (
        <div className='flex flex-wrap gap-3 justify-center'>
          {auth.Favorites.map((item) => <RestaurantCard item={item} />)}
        </div>
      )}
    </div>
  )
}
