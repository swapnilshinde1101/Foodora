import React, { useEffect } from "react";
import { ThemeProvider, CssBaseline, useMediaQuery } from "@mui/material";
import { lightTheme, darkTheme } from "./Theme/Theme";
import { Navbar } from "./component/Navbar/Navbar";
import Home from "./component/Home/Home";
import RestaurantDetails from "./component/Restaurant/RestaurantDetails";
import Cart from "./component/Cart/Cart";
import Profile from "./component/Profile/Profile";
import { store } from "./State/store";
import { Auth } from './component/Auth/Auth';
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./State/Authentication/Action";
import { CustomerRoute } from "./Routers/CustomerRoute";
import { findCart } from "./State/Cart/Action";
import { RouterProvider } from "react-router-dom";
import Routers from "./Routers/Routers";
import { getRestaurantsByUserId } from "./State/Restaurant/Action";



function App() {
  
  // Detect if the user prefers dark mode
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  // Select the theme based on user preference
  const selectedTheme = prefersDarkMode ? darkTheme : lightTheme;

  const dispatch=useDispatch()
  const jwt=localStorage.getItem("jwt")
  const {auth}=useSelector((store)=>store)
  
  useEffect(()=>{
    dispatch(getUser(auth.jwt || jwt))
    dispatch(findCart(jwt))
  },[auth.jwt]);

  useEffect(() => {   
         dispatch(getRestaurantsByUserId(auth.jwt || jwt));
  }, [auth.user]);

  return (
    <ThemeProvider theme={selectedTheme}>
      {/* CssBaseline ensures consistent styling across light/dark themes */}
      <CssBaseline />
      {/* <Navbar /> */}
      {/* <Home /> */}
      {/* <RestaurantDetails/> */}
      {/* <Cart/> */}
      {/* <Profile/> */}
      {/* <CustomerRoute/> */}
      <Routers />

      
    </ThemeProvider>
  );
}

export default App;
