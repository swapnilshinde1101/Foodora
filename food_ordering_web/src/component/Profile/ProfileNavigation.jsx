import React from 'react';
import { Divider, Drawer, useMediaQuery } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../State/Authentication/Action';

const menu = [
  { title: "Orders", icon: <ShoppingBagIcon /> },
  { title: "Favorites", icon: <FavoriteIcon /> },
  { title: "Address", icon: <HomeIcon /> },
  { title: "Payments", icon: <AccountBalanceWalletIcon /> },
  { title: "Notification", icon: <NotificationsActiveIcon /> },
  { title: "Events", icon: <EventIcon /> },
  { title: "Logout", icon: <LogoutIcon /> }
];

export const ProfileNavigation = ({ open, handleClose }) => {
  const isSmallScreen = useMediaQuery('(max-width:900px)');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = (item) => {
    if (item.title === "Logout") {
      dispatch(logout());
      navigate("/"); // Navigate to home after logout
      return; // Prevent further processing
    }
    
    // For other menu items, navigate to profile section
    navigate(`/my-profile/${item.title.toLowerCase()}`);
  };

  return (
    <Drawer
      variant={isSmallScreen ? "temporary" : "permanent"}
      onClose={handleClose}
      open={isSmallScreen ? open : true}
      anchor="left"
      sx={{ zIndex: -1, position: "sticky" }}
    >
      <div className='w-full lg:w-[24vw] h-full flex flex-col justify-start pt-14 gap-6 text-xl py-2 mt-10 mb-5'>
        {menu.map((item, i) => (
          <React.Fragment key={item.title}>
            <div onClick={() => handleNavigate(item)} className='px-5 flex items-center space-x-5 cursor-pointer py-1'>
              {item.icon}
              <span>{item.title}</span>
            </div>
            {i !== menu.length && <Divider />}
          </React.Fragment>
        ))}
      </div>
    </Drawer>
  );
};

export default ProfileNavigation;
