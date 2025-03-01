import { Box, Card, CardActions, CardHeader, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import { Delete } from '@mui/icons-material';
import CreateFoodCategoryFrom from './CreateFoodCategoryFrom';
import { store } from '../../State/store';
import { getRestaurantCategory } from '../../State/Restaurant/Action';
import { fetchRestaurantOrder } from '../../State/Restaurant Order/Action';
import { useDispatch, useSelector } from 'react-redux';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const FoodCategoryTable = () => {
  const{restaurant}=useSelector((store)=>store);
  const dispatch=useDispatch()
  const jwt =localStorage.getItem("jwt");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // console.log("Restaurant Details",restaurant);

  useEffect(() => {
    if (restaurant?.userRestaurant?.id) {
      dispatch(
        getRestaurantCategory({
          jwt,
          restaurantId: restaurant.userRestaurant.id,
        })
      );
      dispatch(fetchRestaurantOrder({
        jwt,
        restaurantId: restaurant.userRestaurant.id,
      }));
    }
  }, [dispatch, jwt, restaurant?.userRestaurant?.id]);
  


  return (
    <Box>
      <Card className='mt-0'>
        <CardHeader
        action={
            <IconButton onClick={handleOpen} aria-label="settings">
              <CreateIcon />
            </IconButton>
          }
        title={"Food Category"}
        sx={{pt:2,alignItems:"center"}}/>
       
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">id</TableCell>
            <TableCell align="left">name</TableCell>
            

          </TableRow>
        </TableHead>
        <TableBody>
  {restaurant.categories && restaurant.categories.length > 0 ? (
    restaurant.categories.map((item, index) => (
      <TableRow key={item.id || index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row">{index + 1}</TableCell> {/* Display index number */}
        <TableCell align="left">{item.name}</TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={2} align="center">No Categories Available</TableCell>
    </TableRow>
  )}
</TableBody>

      </Table>
    </TableContainer>
      </Card>

     <Modal
       open={open}
       onClose={handleClose}
       aria-labelledby="modal-modal-title"
       aria-describedby="modal-modal-description"
      >
      <Box sx={style}>
        <CreateFoodCategoryFrom/>
      </Box>
      </Modal>
    </Box>
  )
}
