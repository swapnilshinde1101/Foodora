import React, { useEffect } from "react";
import "./Home.css";
import MultiItemCarousel from './MultiItemCarousel';
import RestaurantCard from "../Restaurant/RestaurantCard";
import { Auth } from "../Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurantsAction } from "../../State/Restaurant/Action";
import { store } from '../../State/store';
import { useNavigate } from "react-router-dom";
import { findCart } from "../../State/Cart/Action";

const restaurants=[1,1,1,1,1,1,1,1,1]
const Home = () => {
   const dispatch=useDispatch()
   const jwt=localStorage.getItem("jwt")
   const {restaurant}=useSelector(store=>store)
   const navigate=useNavigate()

   console.log("restaurant",restaurant);
   

   useEffect(()=>{
    dispatch(getAllRestaurantsAction(jwt))
    // dispatch(findCart(jwt))
   },[])

  
  return (
    <div className="relative pb-10">
      {/* Banner Section */}
      <section className="banner relative flex flex-col justify-center items-center">
        <div className="w-[80vw] lg:w-[50vw] text-center z-10">
          <p className="text-2xl lg:text-6xl font-bold text-white py-5">
            Foodora
          </p>
          <p className="z-10 text-xl lg:text-4xl text-gray-300">
            Savor the Taste, Anytime, Anywhere.
          </p>
        </div>
        <div className="cover absolute top-0 left-0 right-0 bottom-0"></div>
      </section>

      <section className="p-10 lg:py-10 lg:px-20" >
        <p className="text-2xl font-semibold text-gray-400 py-3 pb-10"> Top Meals</p>
        <MultiItemCarousel/>
      </section>

      <section className="px-5 lg:px-20 pt-10">
        <h1 className="text-2xl  font-semibold text-gray-400 pd-5">Order From Our Handpicked Favorites</h1>
       
        <div className="flex flex-wrap items-center justify-around gap-5 pt-8">
          {
            restaurant.restaurants.map((item) => <RestaurantCard item={item} />)
          }
        </div>
     
      </section>
     
    </div>
  )
}

export default Home;
