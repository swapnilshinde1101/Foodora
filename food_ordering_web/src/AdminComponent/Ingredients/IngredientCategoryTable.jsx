import { Box, Card, CardHeader, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import { Delete } from '@mui/icons-material';
import CreateIngredientCategoryForm from './CreateIngredientCategoryForm';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientCategory } from '../../State/Ingredients/Action';


const orders=[1,1,1,1,1,1]
const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export const IngredientCategoryTable = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch=useDispatch()
  const { restaurant, ingredients } = useSelector((store) => store);
  const ingredientCategories = ingredients.category || []; // ✅ Fix to correctly access category list
  
  const jwt=localStorage.getItem("jwt")

  useEffect(() => {
    if (restaurant?.userRestaurant?.id) {
      dispatch(getIngredientCategory({ id: restaurant.userRestaurant.id, jwt }));
    }
  }, [dispatch, restaurant?.userRestaurant?.id, jwt]);
  
  return (
    <Box>
      <Card className='mt-2'>
        <CardHeader
        action={
            <IconButton onClick={handleOpen} aria-label="settings">
              <CreateIcon />
            </IconButton>
          }
        title={"Ingredient Category"}
        sx={{pt:2,alignItems:"center"}}/>
       
        <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">id</TableCell>
            <TableCell align="center">name</TableCell>
         

          </TableRow>
        </TableHead>
        <TableBody>
        { ingredientCategories.map((item) => ( 

            <TableRow
              key={item.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.id}
              </TableCell>
              <TableCell align="center">{item.name}</TableCell>
            
            </TableRow>
          ))}
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
          <CreateIngredientCategoryForm/>
      </Box>
      </Modal>
    </Box>
  )
}
 