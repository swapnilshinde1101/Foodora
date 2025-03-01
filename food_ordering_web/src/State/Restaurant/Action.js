import axios from 'axios';
import {
  CREATE_RESTAURANT_REQUEST, CREATE_RESTAURANT_SUCCESS, CREATE_RESTAURANT_FAILURE,
  GET_ALL_RESTAURANTS_REQUEST, GET_ALL_RESTAURANTS_SUCCESS, GET_ALL_RESTAURANTS_FAILURE,
  GET_RESTAURANT_BY_ID_REQUEST, GET_RESTAURANT_BY_ID_SUCCESS, GET_RESTAURANT_BY_ID_FAILURE,
  DELETE_RESTAURANT_REQUEST, DELETE_RESTAURANT_SUCCESS, DELETE_RESTAURANT_FAILURE,
  UPDATE_RESTAURANT_REQUEST, UPDATE_RESTAURANT_SUCCESS, UPDATE_RESTAURANT_FAILURE,
  UPDATE_RESTAURANT_STATUS_REQUEST, UPDATE_RESTAURANT_STATUS_SUCCESS, UPDATE_RESTAURANT_STATUS_FAILURE,
  GET_RESTAURANT_BY_USER_ID_REQUEST, GET_RESTAURANT_BY_USER_ID_SUCCESS, GET_RESTAURANT_BY_USER_ID_FAILURE,
  CREATE_EVENT_REQUEST, CREATE_EVENT_SUCCESS, CREATE_EVENT_FAILURE,
  GET_ALL_EVENTS_REQUEST, GET_ALL_EVENTS_SUCCESS, GET_ALL_EVENTS_FAILURE,
  DELETE_EVENT_REQUEST, DELETE_EVENT_SUCCESS, DELETE_EVENT_FAILURE,
  GET_RESTAURANT_EVENTS_REQUEST, GET_RESTAURANT_EVENTS_SUCCESS, GET_RESTAURANT_EVENTS_FAILURE,
  CREATE_CATEGORY_REQUEST, CREATE_CATEGORY_SUCCESS, CREATE_CATEGORY_FAILURE,
  GET_RESTAURANT_CATEGORIES_REQUEST, GET_RESTAURANT_CATEGORIES_SUCCESS, GET_RESTAURANT_CATEGORIES_FAILURE
} from './ActionTypes';
import { api } from "../../../../food_ordering_web/src/component/config/api";



// Get All Restaurants
export const getAllRestaurantsAction = (token) => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_RESTAURANTS_REQUEST });

    try {
      const { data } = await api.get(`/api/restaurants`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: GET_ALL_RESTAURANTS_SUCCESS, payload: data });
      console.log('All restaurants:', data);
    } catch (error) {
      console.error('Error fetching restaurants:', error.response?.data || error.message);

      dispatch({
        type: GET_ALL_RESTAURANTS_FAILURE,
        payload: error.response?.data || "Something went wrong",
      });
    }
  };
};



export const getRestaurantById = ({ restaurantId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });

    try {
      const { data } = await api.get(`/api/restaurants/${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      dispatch({ type: GET_RESTAURANT_BY_ID_SUCCESS, payload: data });
    } catch (error) {
      console.error("Error fetching restaurant:", error);
      dispatch({
        type: GET_RESTAURANT_BY_ID_FAILURE,
        payload: error.response?.data || "Something went wrong",
      });
    }
  };
};



// Get Restaurants by User ID
export const getRestaurantsByUserId = (jwt) => {
  return async (dispatch) => {
  dispatch({ type: GET_RESTAURANT_BY_USER_ID_REQUEST });

  try {
    const {data} = await api.get(`/api/admin/restaurant/user`,{
      headers:{
          Authorization:`Bearer ${jwt}`,
      },
    });
    console.log("get restaurants by user id",data);
    
    dispatch({
      type: GET_RESTAURANT_BY_USER_ID_SUCCESS,
      payload: data
    });
  } catch (error) {
      console.log("catch error",error);
      
    dispatch({
      type: GET_RESTAURANT_BY_USER_ID_FAILURE,
      payload:error.message
    });
  }
};
};


// Create Restaurant
export const createRestaurant = (reqData) => {
    console.log("token-------",reqData.token);
    
    return async (dispatch) => {
  dispatch({ type: CREATE_RESTAURANT_REQUEST });

  try {
    const {data} = await api.post(`/api/admin/restaurant`, reqData.data,{
        headers:{
            Authorization:`Bearer ${reqData.token}`,
        },
    });
    dispatch({
      type: CREATE_RESTAURANT_SUCCESS,
       payload:data
    });
    console.log("create restaurant",data);

  } catch (error) {
    console.log("catch error",error);
    
    dispatch({
      type: CREATE_RESTAURANT_FAILURE,
      payload: error
    });
  }
}};


  

  
// Update Restaurant
export const updateRestaurant = ({ restaurantId, restaurantData, jwt }) => {
    return async (dispatch) => {
      dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });
  
      try {
        const res = await api.put(`api/admin/restaurant/${restaurantId}`, restaurantData, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
  
        dispatch({
          type: UPDATE_RESTAURANT_STATUS_SUCCESS,
          payload: res.data,
        });
      } catch (error) {
        dispatch({
          type: UPDATE_RESTAURANT_STATUS_FAILURE,
          payload: error
        });
      }
    };
  };
  

  export const deleteRestaurant = (restaurantId, jwt) => {
    return async (dispatch) => {
      dispatch({ type: DELETE_RESTAURANT_REQUEST });
  
      try {
        await api.delete(`/api/admin/restaurant/${restaurantId}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
  
        dispatch({
          type: DELETE_RESTAURANT_SUCCESS,
          payload: restaurantId,
        });
  
        console.log(`Deleted restaurant with ID: ${restaurantId}`);
      } catch (error) {
        console.error("Error deleting restaurant:", error.response?.data || error.message);
  
        dispatch({
          type: DELETE_RESTAURANT_FAILURE,
          payload: error.response?.data || "Something went wrong",
        });
      }
    };
  };
  


// // Update Restaurant Status
// export const updateRestaurantStatus = (restaurantId, jwt) =>{ 
//     return async (dispatch) => {
//     dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST }); 
    
//     try {
//       const res = await api.put(`/api/admin/restaurant/${restaurantId}/status`, 
//         {},{
//           headers: {
//             Authorization: `Bearer ${jwt}`,
//           },
//         }
//       );
//       console.log("resss",res.data);   
  
//       dispatch({
//         type: UPDATE_RESTAURANT_STATUS_SUCCESS,
//         payload: res.data,
//       });
//     } catch (error) {
//       console.log("error",error);
      
//       dispatch({
//         type: UPDATE_RESTAURANT_STATUS_FAILURE,
//         payload: error
//     });
//     }
//   }
// };
  
// Action to update restaurant status
export const updateRestaurantStatus = (data) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });

    try {
      const res = await api.put(
        `/api/admin/restaurant/${data.restaurantId}/status`, 
        {},
        {
          headers: {
            Authorization: `Bearer ${data.jwt}`,
          },
        }
      );
      console.log("resss", res.data);

      dispatch({
        type: UPDATE_RESTAURANT_STATUS_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      console.log("error", error);

      dispatch({
        type: UPDATE_RESTAURANT_STATUS_FAILURE,
        payload: error,
      });
    }
  };
};



// Create Event
export const createEventAction = ({data,restaurantId,jwt}) => {
    return async (dispatch) => {
  dispatch({ type: CREATE_EVENT_REQUEST });

  try {
    const res = await api.post(`api/admin/events/restaurant/${restaurantId}`, data, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
    console.log("create events",res.data);
    
    dispatch({
      type: CREATE_EVENT_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    console.log("catch -",error);
    
    dispatch({
      type: CREATE_EVENT_FAILURE,
      payload: error
    });
  }
}
};

// Get All Events
export const getAllEvents = ({jwt}) => {
    return async (dispatch) => {
  dispatch({ type: GET_ALL_EVENTS_REQUEST });

  try {
    const res = await api.get(`api/events`,{
        headers:{
            Authorization:`Bearer ${jwt}`,
        },
    });
    console.log("get all events",res.data);    
    dispatch({
      type: GET_ALL_EVENTS_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_EVENTS_FAILURE,
      payload: error.response ? error.response.data : error.message
    });
  }
}
};

// Delete Event
export const deleteEventAction = ({eventId,jwt}) => {
    return async (dispatch) => {
  dispatch({ type: DELETE_EVENT_REQUEST });

  try {
    const res =await api.delete(`api/admin/events/${eventId}`,{
        headers:{
            Authorization:`Bearer ${jwt}`,
        },
    });
    console.log("DELETE events",res.data);    
    dispatch({
      type: DELETE_EVENT_SUCCESS,
      payload: eventId
    });
  } catch (error) {
    dispatch({
      type: DELETE_EVENT_FAILURE,
      payload: error
    });
  }
}
};

// Get Restaurant Events
export const getRestaurantEvents = ({restaurantId,jwt}) => {
    return async (dispatch) => {
  dispatch({ type: GET_RESTAURANT_EVENTS_REQUEST });

  try {
    const res = await api.get(`/api/admin/events/restaurants/${restaurantId}`,
    {
        headers:{
            Authorization:`Bearer ${jwt}`,
        },
    });
    console.log("get restaurants events",res.data);
    dispatch({
      type: GET_RESTAURANT_EVENTS_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_RESTAURANT_EVENTS_FAILURE,
      payload: error
    });
  }
}
};

// Create Category Action
export const createCategoryAction = ({ reqData, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_CATEGORY_REQUEST });

    try {
      const res = await api.post(`/api/admin/category`, reqData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log("Category Created:", res.data);

      dispatch({
        type: CREATE_CATEGORY_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      console.error("Error Creating Category:", error);

      dispatch({
        type: CREATE_CATEGORY_FAILURE,
        payload: error.response?.data || "Something went wrong",
      });
    }
  };
};

// // Get Restaurant Categories
// export const getRestaurantCategory = (jwt,restaurantId) => {
//     return async (dispatch) => {
//   dispatch({ type: GET_RESTAURANT_CATEGORIES_REQUEST });

//   try {
//     const res = await api.get(`/api/category/restaurant/${restaurantId}`,{
//         headers:{
//             Authorization:`Bearer ${jwt}`,
//         },
//     });
//     console.log("get restaurants category",res.data);    
//     dispatch({
//       type: GET_RESTAURANT_CATEGORIES_SUCCESS,
//       payload: res.data
//     });
//   } catch (error) {
//     console.log("catch error",error);
    
//     dispatch({
//       type: GET_RESTAURANT_CATEGORIES_FAILURE,
//       payload: error.response ? error.response.data : error.message
//     });
//   }
// }
// };

export const getRestaurantCategory = ({jwt, restaurantId}) => {
  return async (dispatch) => {
    console.log("Fetching categories for restaurantId:", restaurantId);

    dispatch({ type: GET_RESTAURANT_CATEGORIES_REQUEST });
    

    try {
      const res = await api.get(`/api/category/restaurant/${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log("get restaurants categories:", res.data);  
      dispatch({
        type: GET_RESTAURANT_CATEGORIES_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      console.log("Error fetching categories:", error); // Error log
      dispatch({
        type: GET_RESTAURANT_CATEGORIES_FAILURE,
        payload: error,
      });
    }
  };
};


