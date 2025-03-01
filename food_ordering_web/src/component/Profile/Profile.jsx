import React, { useState } from 'react';
import ProfileNavigation from './ProfileNavigation';
import { Route, Routes } from 'react-router-dom';
import UserProfile from './UserProfile';
import { Address } from './Address';
import { Favorites } from './Favorites';
import { Events } from './Events';
import Orders from './Orders';

const Profile = () => {
  const [openSideBar, setOpenSideBar] = useState(false);

  const handleToggleSidebar = () => setOpenSideBar(!openSideBar);

  return (
    <div className='lg:flex justify-between'>
      <div className='sticky h-[80vh] lg:w-[25%]'>
        <ProfileNavigation open={openSideBar} handleClose={handleToggleSidebar} />
      </div>
      <div className='lg:w-[75%]'>
        <Routes>
            <Route path='/' element={<UserProfile/>}/>
            <Route path='/orders' element={<Orders/>}/>
            <Route path='/address' element={<Address/>}/>
            <Route path='/favorites' element={<Favorites/>}/>     
            <Route path='/events' element={<Events/>}/>     
        </Routes>
   
      </div>
    </div>
  );
};

export default Profile;

