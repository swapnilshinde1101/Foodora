import React from 'react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from '../../State/Authentication/Action'; // Ensure the logout action is imported
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Dispatch the logout action to clear the user data
    dispatch(logout());

    // After logout, redirect the user to the home page (or login page)
    navigate('/');
  };

  return (
    <div className='min-h-[80vh] flex flex-col justify-center items-center text-center'>
      <div className='flex flex-col items-center justify-center'>
        <AccountBoxIcon sx={{ fontSize: "9rem" }} />
        <h1 className='py-5 text-2xl font-semibold'>Foodora</h1>
        <p>Email: foodora@gmail.com</p>
        <Button variant='contained' onClick={handleLogout} sx={{ margin: "2rem 0rem" }}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
