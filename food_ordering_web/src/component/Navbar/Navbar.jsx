import { Avatar, Badge, Box, IconButton } from '@mui/material';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { pink } from '@mui/material/colors';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { store } from '../../State/store';

export const Navbar = () => {
  const { auth, cart } = useSelector(state => state);
  const navigate=useNavigate()

   const handleAvaterClick=()=>{
    if(auth.user?.role==="ROLE_CUSTOMER"){
      navigate("/my-profile")
    }
    else{
      navigate("/admin/restaurant")
    }
   }
  return (
    <Box className="px-5 sticky top-0 z-50 py-[.8rem]   bg-[#e91e63] lg:px-20 flex justify-between">
      {/* Logo Section */}
      <div className="lg:mr-10 cursor-pointer flex items-center space-x-4">
        <div onClick={()=>navigate("/")} className=" logo font-semibold text-gray-300 text-2xl">
          Foodora
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2 lg:space-x-10">
        <div className=''>
        <IconButton>
          <SearchIcon sx={{ fontSize: "1.5rem"}} />
        </IconButton>
        </div>

      <div className=''>
      {auth.user? (
         <Avatar onClick={handleAvaterClick} sx={{ bgcolor: "white", color: pink.A400, width: 32, height: 32, fontSize: "1.25rem" }}>
       {auth.user?.fullName ? auth.user.fullName[0].toUpperCase() : "?"}
        </Avatar>):(
        <IconButton onClick={()=>navigate("/account/login")}>
          <PersonIcon/>
        </IconButton>)}
      </div>

        <div className=''>
        <IconButton onClick={()=>navigate("/cart")}>
        <Badge badgeContent={cart.cart?.items.length} color="primary">
            <ShoppingCartIcon sx={{ fontSize: "1.5rem", color: "#fff" }} />
          </Badge>
        </IconButton>
        </div>
      </div>
    </Box>
  );
};

export default Navbar;
