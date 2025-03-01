import { Avatar, Box, Card, CardHeader, Chip, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import { Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFoodAction, getMenuItemsByRestaurantId } from '../../State/Menu/Action';
import { FoodCategory } from '../FoodCategory/FoodCategory';


export const MenuTable = () => {
 const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant,ingredients,menu } = useSelector((store) => store);
  const navigate= useNavigate();

  useEffect(() => {
    if (restaurant?.userRestaurant?.id) {
      dispatch(
        getMenuItemsByRestaurantId({
          jwt,
          restaurantId: restaurant.userRestaurant.id,
          vegetarian: false,
          nonveg: false,
          seasonal: false,
          foodCategory: "",
        })
      );
    }
  }, [dispatch, restaurant?.userRestaurant?.id]);
  
  
  const handleDeleteFood=(foodId)=>{
    dispatch(deleteFoodAction({ foodId, jwt }));
  }
  return (
    <Box>
      <Card className='mt-2'>
        <CardHeader
        action={
            <IconButton onClick={() => navigate("/admin/restaurant/add-menu")}  aria-label="settings">
              <CreateIcon />
            </IconButton>
          }
        title={"Menu"}
        sx={{pt:2,alignItems:"center"}}/>
       
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">image</TableCell>
            <TableCell align="center">title</TableCell>
            <TableCell align="center">ingredients</TableCell>
            <TableCell align="center">price</TableCell>
            <TableCell align="center">Avaibility</TableCell>
            <TableCell align="center">Delete</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {menu.menuItems.map((item) => (
            <TableRow
              key={item.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              <Avatar src={item.images[0]}></Avatar>
              </TableCell>
              <TableCell align="center">{item.name}</TableCell>
              <TableCell align="center">{item.ingredients.map((ingredient)=><Chip label={ingredient.name}/>)}</TableCell>
              <TableCell align="center">₹{item.price}</TableCell>
              <TableCell align="center">{item.available ? "In Stock" : "Out of Stock"}</TableCell>
              <TableCell align="center">
                <IconButton color='primary' onClick={()=>handleDeleteFood(item.id)}>
                  <Delete/></IconButton></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Card>
    </Box>
  )
}
