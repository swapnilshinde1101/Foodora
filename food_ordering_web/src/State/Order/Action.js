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
  
  import { api } from '../../../../food_ordering_web/src/component/config/api';
  
  // Create Order
  export const createOrder = (reqData) => {
    return async (dispatch) => {
      dispatch({ type: CREATE_ORDER_REQUEST });
      try {
        console.log("Sending Order Request:", reqData);

        const {data} = await api.post('/api/order', reqData.order, {
         headers: {
           Authorization: `Bearer ${reqData.jwt}`,
          },
        });
        // if(data.payment_url){
        //     window.location.href=data.payment_url;
        // }
        console.log("created order data",data);        
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
      } catch (error) {
        console.log("error",error);        
        dispatch({ type: CREATE_ORDER_FAILURE, payload: error });
      }
    };
  };
  
  // Get User Orders
  export const getUserOrders = (jwt) => {
    return async (dispatch) => {
      dispatch({ type: GET_USER_ORDERS_REQUEST });
      try {
        const {data} = await api.get('/api/order/user', {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        console.log("user order",data);        
        dispatch({ type: GET_USER_ORDERS_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: GET_USER_ORDERS_FAILURE, payload: error });
      }
    };
  };
  
  // Get User Notifications
  export const getUserNotifications = (jwt) => {
    return async (dispatch) => {
      dispatch({ type: GET_USER_NOTIFICATIONS_REQUEST });
      try {
        const {data} = await api.get('/api/notifications', {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        console.log("all notification",data);        
        dispatch({ type: GET_USER_NOTIFICATIONS_SUCCESS, payload: data });
      } catch (error) {
        console.log("error",error);        
        dispatch({ type: GET_USER_NOTIFICATIONS_FAILURE, payload: error });
      }
    };
  };
  