import {
    GET_RESTAURANT_ORDERS_REQUEST,
    GET_RESTAURANT_ORDERS_SUCCESS,
    GET_RESTAURANT_ORDERS_FAILURE,
    UPDATE_ORDER_STATUS_REQUEST,
    UPDATE_ORDER_STATUS_SUCCESS,
    UPDATE_ORDER_STATUS_FAILURE
  } from './ActionType';
  
  const initialState = {
    orders: [],
    loading: false,
    error: null,
    
  };
  
  const restaurantOrderReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_RESTAURANT_ORDERS_REQUEST:
      case UPDATE_ORDER_STATUS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
  
      case GET_RESTAURANT_ORDERS_SUCCESS:
        return {
          ...state,
          loading: false,
          orders: action.payload
        };
     
      case UPDATE_ORDER_STATUS_SUCCESS:
        const updatedOrders=state.order.map((order)=>
         order.id === action.payload.id?action.payload:order
          );
        return {
          ...state,
          loading: false,
          orders: updatedOrders
        };
  
      case GET_RESTAURANT_ORDERS_FAILURE:
      case UPDATE_ORDER_STATUS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.error
        };
  
  
      default:
        return state;
    }
  };
  
  export default restaurantOrderReducer;
  