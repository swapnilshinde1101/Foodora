import React from 'react'
import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useDispatch, useSelector } from 'react-redux';
import { updateRestaurantStatus } from '../../State/Restaurant/Action';

export const RestaurantDetails = () => {
  const{restaurant}=useSelector((store)=>store);
  const dispatch=useDispatch()
//  console.log("restaurant Details",restaurant);
 

  const handleRestaurantStatus = () => {
    const updatedStatus = !restaurant.userRestaurant?.open;  // Toggle the status
    dispatch(updateRestaurantStatus({
      restaurantId: restaurant.userRestaurant.id,
      jwt: localStorage.getItem("jwt"),
    }));
  
    // Update the UI state if needed
    restaurant.userRestaurant.open = updatedStatus;
  };
  

  return (
    <div className='lg:px-20 px-5 pb-10'>
      <div className='py-5 flex justify-center items-center gap-5'>
        <h1 className='text-2xl lg:text-7xl text-center font-bold p-5'>
          {restaurant.userRestaurant?.name}
        </h1>
        <div>
         <Button 
         color={!restaurant.userRestaurant?.open ? "primary":"error"} 
          className='py-[1rem] px=[2rem]'
          variant='contained' 
          onClick={handleRestaurantStatus} 
          size='large'>
          {restaurant.userRestaurant?.open ?"close":"open"}
         </Button>
        </div>

      </div>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title={<samp className="text-gray-300">Restaurant</samp>} />
            <CardContent>
              <div className='space-y-4 text-gray-200'>
                <div className='flex'>
                  <p className='w-48'>Owner</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.userRestaurant?.owner.fullName}
                  </p>
                </div>

                <div className='flex'>
                  <p className='w-48'>Restaurant Name</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.userRestaurant?.name}
                  </p>
                </div>

                <div className='flex'>
                  <p className='w-48'>Cuisine Type</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.userRestaurant?.cuisineType}
                  </p>
                </div>

                <div className='flex'>
                  <p className='w-48'>Opening Houres</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.userRestaurant?.openingHours}
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Status</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                  {restaurant.userRestaurant?.open?<span className='px-5 py-2 rounded-full bg-green-400 text-gray-900'>
                    Open</span>:<span className='px-5 py-2 rounded-full bg-red-400 text-gray-900'>
                    Closed</span>}
                  </p>
                </div>

              </div>
            </CardContent>
          </Card>

        </Grid>

        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader title={<samp className="text-gray-300">Address</samp>} />
            <CardContent>
              <div className='space-y-4 text-gray-200'>
                <div className='flex'>
                  <p className='w-48'>Country</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.userRestaurant?.address?.country}
                  </p>
                </div>

                <div className='flex'>
                  <p className='w-48'>city</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.userRestaurant?.address?.city}
                  </p>
                </div>

                <div className='flex'>
                  <p className='w-48'>Postal code</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.userRestaurant?.address?.postalCode}
                  </p>
                </div>

                <div className='flex'>
                  <p className='w-48'>Street Address</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.userRestaurant?.address?.street}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

        </Grid>


 <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader title={<samp className="text-gray-300">Contact</samp>} />
            <CardContent>
              <div className='space-y-4 text-gray-200'>
                <div className='flex'>
                  <p className='w-48'>Email</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.userRestaurant?.contactInformation?.email}
                  </p>
                </div>

                <div className='flex'>
                  <p className='w-48'>Mobaile</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.userRestaurant?.contactInformation?.mobile}
                  </p>
                </div>

                <div className='flex'>
                  <p className='w-48'>Social</p>
                 <div className='flex text-gray-400 items-center pb-3 gap-5'>
                  <span className='pr-5'>-</span>              
                  <a href={restaurant.userRestaurant?.contactInformation?.instagram}>
                  <InstagramIcon sx={{fontSize:"2rem"}}/>
                  </a>
                  <a href={restaurant.userRestaurant?.contactInformation?.twitter}>
                  <XIcon sx={{fontSize:"2rem"}}/>
                  </a><a href={restaurant.userRestaurant?.contactInformation?.facebook}>
                  <FacebookIcon sx={{fontSize:"2rem"}}/>
                  </a>
                 </div>
                </div>
              </div>
            </CardContent>
          </Card>

        </Grid>



      </Grid>
    </div>
  )
}
