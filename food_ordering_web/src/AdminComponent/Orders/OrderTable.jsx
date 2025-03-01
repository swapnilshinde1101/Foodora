import { Avatar, AvatarGroup, Box, Button, Card, CardHeader, Chip, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurantOrder, updateOrderStatus } from '../../State/Restaurant Order/Action';
import { Ingredients } from '../Ingredients/Ingredients';



const orderStatus=[
  {label:"Pendding", value:"PENDING"},
  {label:"Completed", value:"COMPLETED"},
  {label:"Out For Delivery", value:"OUT_FOR_DELIVERY"},
  {label:"Deliveres", value:"DELIVERES"},


  ]

export const OrderTable = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant,restaurantOrder,ingredients,menu } = useSelector((store) => store);
  
  useEffect(()=>{
    dispatch(fetchRestaurantOrder({
      jwt,
      restaurantId:restaurant.userRestaurant?.id,
    }))
  },[])


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateOrder=(orderId,orderStatus)=>{
    dispatch(updateOrderStatus({orderId,orderStatus,jwt}))
    handleClose();
  }

  return (
    <Box>
      <Card className='mt-2'>
        <CardHeader
        title={"All Orders"}
        sx={{pt:2,alignItems:"center"}}>

        </CardHeader>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell align="right">Image</TableCell>
            <TableCell align="right">Customer</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Ingredients</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">update</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantOrder.orders.map((item) => (
            <TableRow
              key={item.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.id}
              </TableCell>
              <TableCell align="right">
                 <AvatarGroup>
                  {item.items.map((orderItem)=><Avatar src={orderItem.food?.images[0]} />)}
                   
                 </AvatarGroup>
              </TableCell>
              <TableCell align="right">{item.customer?.fullName}</TableCell>
              <TableCell align="right">₹{item.totalAmount}</TableCell>
              <TableCell align="right">
                {item.items.map((orderItem)=><p>{orderItem.food?.name}</p>)}
              </TableCell>
              <TableCell align="right">
               {item.items.map((orderItem) => 
                 <div >
                 {orderItem.ingredients.map((ingredient) => 
                  <Chip label={ingredient} />
                  )}
                 </div>
                  )}
                </TableCell>

              <TableCell align="right">{item.orderStatus}</TableCell>
              <TableCell align="right">
              <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Update
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {orderStatus.map((status)=>
          (<MenuItem onClick={()=>handleUpdateOrder(item.id,status.value)}>
            {status.label}</MenuItem>))}
    
      </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Card>
    </Box>
  )
}
