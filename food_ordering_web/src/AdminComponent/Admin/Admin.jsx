import React, { useEffect } from 'react'
import { AdminSideBar } from './AdminSideBar';
import { Routes, Route } from 'react-router-dom';
import { Dashboard } from '@mui/icons-material';
import { Orders } from '../Orders/Orders';
import { RestaurantDashboard } from '../Dashboard/Dashboard';
import { Menu } from '../Menu/Menu';
import { FoodCategory } from '../FoodCategory/FoodCategory';
import { Ingredients } from '../Ingredients/Ingredients';
import {  RestaurantDetails } from './RestarantDetails';
import { Events } from '../Events/Events';
import CreateMenuFrom from '../Menu/CreateMenuForm';
import { store } from '../../State/store';
import { getRestaurantById, getRestaurantCategory } from '../../State/Restaurant/Action';
import { fetchRestaurantOrder } from '../../State/Restaurant Order/Action';
import { useDispatch, useSelector } from 'react-redux';


export const Admin = () => {
   const dispatch=useDispatch()
   const jwt =localStorage.getItem("jwt");
   const{restaurant}=useSelector((store)=>store);
   const handleClose=()=>{
    }
    useEffect(()=>{
      dispatch(
        getRestaurantCategory({
          jwt,
          restaurantId: restaurant.userRestaurant?.id,
        })
      );
      dispatch(fetchRestaurantOrder({
        jwt,
        restaurantId: restaurant.userRestaurant?.id,
      }))
      // dispatch(getMenuItemsByRestaurantId());
      // dispatch(getRestaurantById());
    },[])
  return (
    <div>
        <div className='lg:flex justify-between'>
           <div>
            <AdminSideBar handleClose={handleClose}/>
           </div>
           <div className='lg:w-[80%]'>
            <Routes>
                < Route path='/' element={<RestaurantDashboard/>}/>
                < Route path='/orders' element={<Orders/>}/>
                < Route path='/menu' element={<Menu/>}/>
                < Route path='/category' element={<FoodCategory/>}/>
                < Route path='/ingredients' element={<Ingredients/>}/>
                < Route path='/details' element={<RestaurantDetails/>}/>
                <Route path='/add-menu' element={<CreateMenuFrom/>}/>


            </Routes>

           </div>
        </div>
    </div>
  )
}
