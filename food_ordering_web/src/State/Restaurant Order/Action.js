import {
  GET_RESTAURANT_ORDERS_REQUEST,
  GET_RESTAURANT_ORDERS_SUCCESS,
  GET_RESTAURANT_ORDERS_FAILURE,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_FAILURE
} from './ActionType';

import { api } from '../../../../food_ordering_web/src/component/config/api';

// Update Order Status
export const updateOrderStatus = ({ orderId, orderStatus, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });

    try {
      const { data } = await api.put(`/api/admin/order/${orderId}/${orderStatus}`, {}, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log("Updated order status:", data);
      dispatch({ type: UPDATE_ORDER_STATUS_SUCCESS, payload: data });
    } catch (error) {
      console.error("Error updating order status:", error.response?.data || error.message);
      dispatch({
        type: UPDATE_ORDER_STATUS_FAILURE,
        payload: error.response?.data || "Something went wrong",
      });
    }
  };
};

// Get Restaurant Orders
export const fetchRestaurantOrder = ({ restaurantId, orderStatus, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_ORDERS_REQUEST });

    try {
      const { data } = await api.get(`/api/admin/order/restaurant/${restaurantId}`, {
        params: { order_status: orderStatus },
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log("Restaurant orders:", data);
      dispatch({ type: GET_RESTAURANT_ORDERS_SUCCESS, payload: data });
    } catch (error) {
      console.error("Error fetching restaurant orders:", error.response?.data || error.message);
      dispatch({
        type: GET_RESTAURANT_ORDERS_FAILURE,
        payload: error.response?.data || "Something went wrong",
      });
    }
  };
};
