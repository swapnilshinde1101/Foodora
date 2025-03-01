import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createIngredient, createIngredientCategory } from '../../State/Ingredients/Action';

const CreateIngredientForm = () => {
    const {restaurant,ingredients}=useSelector((store)=>store)
    const dispatch=useDispatch();
    const jwt=localStorage.getItem("jwt");
    const [formData, setFormData] = useState({ 
        name: "", 
        categoryId: "" 
    });

    const handleSubmit = (e) => { 
        e.preventDefault(); 
        const data = {
           ...formData,
            restaurantId:restaurant.userRestaurant.id
        };
        console.log(data);    
        dispatch(createIngredient({data,jwt})) 
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className=''>
            <div className='p-5'>
                <h1 className='text-gray-400 text-center text-xl pb-10'>Create Ingredient</h1>
                <form onSubmit={handleSubmit}> 
                    <TextField
                        fullWidth
                        id='name'
                        name='name'
                        label='Name'
                        variant='outlined'
                        onChange={handleInputChange}
                        value={formData.name}
                        margin="normal"
                    />
                    
                    <FormControl fullWidth>
         <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
         value={formData.ingredientCategoryId}
          label="Category"
         onChange={handleInputChange}
         name='categoryId'
         >
       {ingredients.category.map((item)=>(
       <MenuItem value={item.id}>{item.name}</MenuItem>
       ))}
     
        </Select>
        </FormControl>    
                    <Button 
                        variant='contained' 
                        type='submit' 
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Create Ingredient
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default CreateIngredientForm;
