import React from 'react'
import CreateRestaurantFrom from '../AdminComponent/CreateRestaurantFrom/CreateRestaurantFrom';
import { Admin } from '../AdminComponent/Admin/Admin';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { store } from '../State/store';


export const AdminRoute = () => {
  const{restaurant}=useSelector(store=>store)
  return (
    <div>
        <Routes>
            <Route path='/*' element={
              !restaurant.userRestaurant ?<CreateRestaurantFrom />:<Admin/>}>

            </Route>
        </Routes>
    </div>
  )
}
