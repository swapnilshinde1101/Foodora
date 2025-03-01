import {
    FIND_CART_REQUEST,
    FIND_CART_SUCCESS,
    FIND_CART_FAILURE,
    CLEAR_CART_REQUEST,
    CLEAR_CART_SUCCESS,
    CLEAR_CART_FAILURE,
    GET_ALL_CART_ITEMS_REQUEST,
    GET_ALL_CART_ITEMS_SUCCESS,
    GET_ALL_CART_ITEMS_FAILURE,
    ADD_ITEM_TO_CART_REQUEST,
    ADD_ITEM_TO_CART_SUCCESS,
    ADD_ITEM_TO_CART_FAILURE,
    UPDATE_CART_ITEM_REQUEST,
    UPDATE_CART_ITEM_SUCCESS,
    UPDATE_CART_ITEM_FAILURE,
    REMOVE_CART_ITEM_REQUEST,
    REMOVE_CART_ITEM_SUCCESS,
    REMOVE_CART_ITEM_FAILURE
  } from './ActionTypes';
  
  import { api } from '../../../../food_ordering_web/src/component/config/api';
  
  // Find Cart
  export const findCart = (token) => {
    return async (dispatch) => {
      dispatch({ type: FIND_CART_REQUEST });
      try {
        const response = await api.get('/api/cart', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("my cart",response.data);
        
        dispatch({ type: FIND_CART_SUCCESS, payload: response.data });
      } catch (error) {
        console.log("error",error);
        
        dispatch({ type: FIND_CART_FAILURE, payload: error });
      }
    };
  };
  

   // Get All Cart Items
   export const getAllCartItems = (reqData) => {
    return async (dispatch) => {
      dispatch({ type: GET_ALL_CART_ITEMS_REQUEST });
      try {
        const response = await api.get(`/api/carts/${reqData.cartId}/items`, {
          headers: {
            Authorization: `Bearer ${reqData.token}`,
          },
        });
        dispatch({ type: GET_ALL_CART_ITEMS_SUCCESS, payload: response.data });
      } catch (error) {
        dispatch({ type: GET_ALL_CART_ITEMS_FAILURE, payload: error });
      }
    };
  };


  // Add Item to Cart
  export const addItemToCart = (reqData) => {
    return async (dispatch) => {
      dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
      try {
        const {data} = await api.put('/api/cart/add', reqData.cartItem, {
          headers: {
            Authorization: `Bearer ${reqData.token}`,
          },
        });
        console.log("add item to cart",data);        
        dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data });
      } catch (error) {
        console.log("catch error",error);        
        dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: error });
      }
    };
  };



  // Update Cart Item
  // export const updateCartItem = ( reqData) => {
  //   return async (dispatch) => {
  //     dispatch({ type: UPDATE_CART_ITEM_REQUEST });
  //     try {
  //       const {data} = await api.put(`/api/cart-item/update`, reqData, {
  //         headers: {
  //           Authorization: `Bearer ${reqData.jwt}`,
  //         },
  //       });
  //       console.log("update cartItem",data);        
  //       dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: data });
  //     } catch (error) {
  //       console.log("catch error",error);        
  //       dispatch({ type: UPDATE_CART_ITEM_FAILURE, payload: error.message });
  //     }
  //   };
  // };
  export const updateCartItem = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_CART_ITEM_REQUEST });
        try {
            const { data } = await api.put('/api/cart-item/update', reqData.data, {
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`,
                },
            });
            console.log('Updated cart item:', data);
            dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: data });
        } catch (error) {
            console.log('Error updating cart item:', error);
            dispatch({ type: UPDATE_CART_ITEM_FAILURE, payload: error.message });
        }
    };
};

   
 // Remove Cart Item
//  export const removeCartItem = (cartItemId, jwt) => {
//     return async (dispatch) => {
//       dispatch({ type: REMOVE_CART_ITEM_REQUEST });
//       try {
//          const {data}= await api.delete(`/api/cart-item/${cartItemId}/remove`, {
//           headers: {
//             Authorization: `Bearer ${jwt}`,
//           },
//         });
//         console.log("remove cartItem",data);        
//         dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: cartItemId });
//       } catch (error) {
//         console.log("catch error",error);        
//         dispatch({ type: REMOVE_CART_ITEM_FAILURE, payload: error.message });
//       }
//     };
//   };

export const removeCartItem = (cartItemId, jwt) => {
  return async (dispatch) => {
      dispatch({ type: REMOVE_CART_ITEM_REQUEST });
      try {
          const { data } = await api.delete(`/api/cart-item/${cartItemId}/remove`, {
              headers: {
                  Authorization: `Bearer ${jwt}`,
              },
          });
          console.log('Removed cart item:', data);
          dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: cartItemId });
      } catch (error) {
          console.log('Error removing cart item:', error);
          dispatch({ type: REMOVE_CART_ITEM_FAILURE, payload: error.message });
      }
  };
};

  // Clear Cart
  export const clearCartAction = () => {
    return async (dispatch) => {
      dispatch({ type: CLEAR_CART_REQUEST });
      try {
        const {data} = await api.put('/api/cart/clear',{}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });        
        dispatch({ type: CLEAR_CART_SUCCESS });
        console.log("clear cart",data);;
      } catch (error) {
        console.log("catch error",error);        
        dispatch({ type: CLEAR_CART_FAILURE, payload: error.message });
      }
    };
  };
  
 
  
  
  
  
 
  