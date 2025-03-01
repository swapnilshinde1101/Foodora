import React from 'react'
import { Card, CardActions, CardContent, CardMedia, Icon, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const EventCard = () => {
  return (
    <div>
        <Card sx={{width:300}}>
         <CardMedia 
         sx={{height:300}}
         image='https://img.freepik.com/premium-photo/spicy-potatoes-with-bread-lemon_740787-2.jpg?ga=GA1.1.1883891981.1731411935&semt=ais_hybrid_sidr'/>
         
         <CardContent>
            <Typography variant='h5' >
                Indian Fast Food
            </Typography>
            <Typography variant='body2' >
                50% off on your first order
            </Typography>
            <div className='py-2 space-y-2'>
                <p>{"mumbai"}</p>
                <p className='text-sm text-blue-500'>February 5, 2025 12:00 AM</p>
                <p className='text-sm text-red-500'>February 10, 2025 12:00 AM</p>

            </div>
         </CardContent>

      {false &&   <CardActions>
            <IconButton>
                <DeleteIcon/>
            </IconButton>
         </CardActions>}
        </Card>
    </div>
  )
}
