import { Chip, IconButton } from '@mui/material';
import React from 'react';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeCartItem, updateCartItem } from '../../State/Cart/Action';

export const CartItem = ({ item }) => {
    const { auth, cart } = useSelector(state => state);
    const jwt = localStorage.getItem("jwt");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleUpdateCartItem = (value) => {
        console.log('Item before update:', item);
        const newQuantity = item.quantity + value;
    
        // Ensure that the new quantity is never less than 1
        if (newQuantity <= 0) {
            handleRemoveCartItem();
            return;
        }
    
        const newTotalPrice = item.food.price * newQuantity;
    
        // Update the cart item with the new quantity and price
        const data = { cartItemId: item.id, quantity: newQuantity, totalPrice: newTotalPrice };
        console.log('Dispatching update with data:', data);
        dispatch(updateCartItem({ data, jwt }));
    };
    
    const handleRemoveCartItem = () => {
        // Remove the item from the cart if its quantity is 0
        dispatch(removeCartItem(item.id, jwt)); // Pass item.id to remove the item
    };
    
    return (
        <div className='px-5 '>
            <div className='lg:flex items-center lg:space-x-5'>
                <div>
                    {/* Check if item.food.images is not empty */}
                    <img 
                        className='w-[5rem] h-[5rem] object-cover' 
                        src={item.food.images?.[0] || '/default-image.jpg'}  // Fallback image
                        alt={item.food.name || 'Food Image'}  // Fallback text
                    />
                </div>
                <div className='flex items-center justify-between lg:w-[70%]'>
                    <div className='space-y-1 lg:space-y-3 w-full'>
                        <p>{item.food.name}</p>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center space-x-1'>
                                <IconButton onClick={() => handleUpdateCartItem(-1)}>
                                    <RemoveCircleOutlineIcon />
                                </IconButton>
                                <div className='w-5 h-5 text-xs flex items-center justify-center'>
                                    {item.quantity}
                                </div>

                                <IconButton onClick={() => handleUpdateCartItem(1)}>
                                    <AddCircleOutlineIcon />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                    <p>₹{item.totalPrice?.toFixed(2) || 0}</p> {/* Price formatting */}
                </div>
            </div>

            <div className='pt-3 space-x-2'>
                {item.ingredients && item.ingredients.length > 0 ? (
                    item.ingredients.map((ingredient, index) => (
                        <Chip key={index} label={ingredient} /> 
                    ))
                ) : (
                    <p>No ingredients available</p>
                )}
            </div>
        </div>
    );
};
