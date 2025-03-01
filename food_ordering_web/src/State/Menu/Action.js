import {
  CREATE_MENU_ITEM_REQUEST, CREATE_MENU_ITEM_SUCCESS, CREATE_MENU_ITEM_FAILURE,
  GET_MENU_ITEMS_REQUEST, GET_MENU_ITEMS_SUCCESS, GET_MENU_ITEMS_FAILURE,
  DELETE_MENU_ITEM_REQUEST, DELETE_MENU_ITEM_SUCCESS, DELETE_MENU_ITEM_FAILURE,
  SEARCH_MENU_ITEMS_REQUEST, SEARCH_MENU_ITEMS_SUCCESS, SEARCH_MENU_ITEMS_FAILURE,
  UPDATE_MENU_ITEM_AVAILABILITY_REQUEST, UPDATE_MENU_ITEM_AVAILABILITY_SUCCESS, UPDATE_MENU_ITEM_AVAILABILITY_FAILURE
} from './ActionType';

import { GET_MENU_ITEM_INGREDIENTS_FAILURE, GET_MENU_ITEM_INGREDIENTS_REQUEST, GET_MENU_ITEM_INGREDIENTS_SUCCESS, GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE, GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST, GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS } from './ActionType';
import { api } from '../../component/config/api';

// Create Menu Item
export const createMenuItem = ({ menu,jwt }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_MENU_ITEM_REQUEST });
    try {
      const {data} = await api.post("/api/admin/food", menu, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("created menu",data);      
      dispatch({
        type: CREATE_MENU_ITEM_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log("catch error",error);
      
      dispatch({
        type: CREATE_MENU_ITEM_FAILURE,
        payload: error
      });
    }
  };
};

// Get Menu Items by Restaurant ID
export const getMenuItemsByRestaurantId = ( reqData) => {
  return async (dispatch) => {
    dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST });

    try {
      const {data} = await api.get(
        `/api/food/restaurant/${reqData.restaurantId}?vegetarian=${reqData.vegetarian}
        &nonveg=${reqData.nonveg}&seasonal=${reqData.seasonal}
        &food_category=${reqData.foodCategory} `,
         {
        headers: {
          Authorization: `Bearer ${reqData.jwt}`,
        },
      });
      console.log("menu item by restaurants",data);
      dispatch({
        type: GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log("catch error",error);
      
      dispatch({ 
        type: GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE,
        payload: error
      });
    }
  };
};


// Search Menu Items
export const searchMenuItems = (keyword, jwt ) => {
  return async (dispatch) => {
    dispatch({ type: SEARCH_MENU_ITEMS_REQUEST });

    try {
      const {data} = await api.get(`api/food/search?name=${keyword}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("data --------",data);
      
      dispatch({
        type: SEARCH_MENU_ITEMS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SEARCH_MENU_ITEMS_FAILURE,
        payload: error
      });
    }
  };
};


// Get All Ingredients of a Menu Item
export const getAllIngredientsOfMenuItem = ({ menuItemId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: GET_MENU_ITEM_INGREDIENTS_REQUEST });

    try {
      const response = await api.get(`/api/menu-items/${menuItemId}/ingredients`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({
        type: GET_MENU_ITEM_INGREDIENTS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_MENU_ITEM_INGREDIENTS_FAILURE,
        payload: error.response ? error.response.data : error.message,
      });
    }
  };
};


// Update Menu Item Availability
export const updateMenuItemAvailability= ({ foodId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_MENU_ITEM_AVAILABILITY_REQUEST });

    try {
      const {data} = await api.patch(`/api/admin/food/${foodId}`, {}, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("update menuItem Availability",data);
      
      dispatch({
        type: UPDATE_MENU_ITEM_AVAILABILITY_SUCCESS,
        payload:data,
      });
    } catch (error) {
      console.log("error",error);      
      dispatch({
        type: UPDATE_MENU_ITEM_AVAILABILITY_FAILURE,
        payload: error
      });
    }
  };
};


// Delete Menu Item
export const deleteFoodAction = ({ foodId, jwt }) => 
   async (dispatch) => {
    dispatch({ type: DELETE_MENU_ITEM_REQUEST });

    try {
      const { data } = await api.delete(`/api/admin/food/${foodId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("delete food",data);      
      dispatch({
        type: DELETE_MENU_ITEM_SUCCESS,
        payload: foodId,
      });
    } catch (error) {
      dispatch({
        type: DELETE_MENU_ITEM_FAILURE,
        payload: error
      });
    }
  };
