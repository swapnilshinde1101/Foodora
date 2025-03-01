import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
    GET_USER_ORDERS_REQUEST,
    GET_USER_ORDERS_SUCCESS,
    GET_USER_ORDERS_FAILURE,
    GET_USER_NOTIFICATIONS_REQUEST,
    GET_USER_NOTIFICATIONS_SUCCESS,
    GET_USER_NOTIFICATIONS_FAILURE
  } from './ActionTypes';
  
  const initialState = {
    loading: false,
    orders: [],
    error: null,
    // notifications: []
  };
  
  const orderReducer = (state = initialState, {type,payload}) => {
    switch (type) {
       // Create Order
      case CREATE_ORDER_REQUEST:
        return { ...state, loading: true, error: null };
      case CREATE_ORDER_SUCCESS:
        return { ...state, loading: false, orders: [...state.orders, payload] };
      
      case CREATE_ORDER_FAILURE:
        return { ...state, loading: false, error: payload };
  
      // Get User Orders
      case GET_USER_ORDERS_REQUEST:
        return { ...state, loading: true, error: null };
      case GET_USER_ORDERS_SUCCESS:
        return { ...state, error:null,loading: false, orders: payload };
      case GET_USER_ORDERS_FAILURE:
        return { ...state, loading: false, error: payload };
  
      // // Get User Notifications
      // case GET_USER_NOTIFICATIONS_REQUEST:
      //   return { ...state, loading: true, error: null };
      // case GET_USER_NOTIFICATIONS_SUCCESS:
      //   return { ...state, loading: false, notifications: action.payload };
      // case GET_USER_NOTIFICATIONS_FAILURE:
      //   return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default orderReducer;
  