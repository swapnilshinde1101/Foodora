import { LOGOUT } from '../Authentication/ActionType';
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

const initialState = {
  cart: null,
  cartItems: [],
  loading: false,
  error: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    // Find Cart
    case FIND_CART_REQUEST:
      return { ...state, loading: true, error: null };
    case FIND_CART_SUCCESS:
      return { ...state, loading: false, cart: action.payload, cartItems: action.payload.items };
    case FIND_CART_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Get All Cart Items
    case GET_ALL_CART_ITEMS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_ALL_CART_ITEMS_SUCCESS:
      return { ...state, loading: false, cartItems: action.payload };
    case GET_ALL_CART_ITEMS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Add Item to Cart
    case ADD_ITEM_TO_CART_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_ITEM_TO_CART_SUCCESS:
      return { ...state, loading: false, cartItems: [...state.cartItems, action.payload] };
    case ADD_ITEM_TO_CART_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Update Cart Item
    case UPDATE_CART_ITEM_REQUEST:
      return { ...state, loading: true, error: null };

      case UPDATE_CART_ITEM_SUCCESS:
      return {
          ...state,
          loading: false,
          cartItems: state.cartItems.map((item) =>
              item.id === action.payload.id ? {
                  ...item,
                  quantity: action.payload.quantity,
                  totalPrice: action.payload.totalPrice
              } : item
          ),
          cart: {
              ...state.cart,
              total: state.cartItems.reduce((sum, item) => sum + item.totalPrice, 0)  // Recalculate total
          }
      };
  
    // case UPDATE_CART_ITEM_SUCCESS:
    //   return {
    //       ...state,
    //       loading: false,
    //       cartItems: state.cartItems.map((item) =>
    //           item.id === action.payload.id ? { 
    //               ...item, 
    //               quantity: action.payload.quantity,
    //               totalPrice: action.payload.totalPrice 
    //           } : item
    //       ),
    //       cart: {
    //           ...state.cart,
    //           total: state.cartItems.reduce((sum, item) => 
    //               item.id === action.payload.id ? sum + action.payload.totalPrice : sum + item.totalPrice, 0)
    //       }
    //   };
  
    case UPDATE_CART_ITEM_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Remove Cart Item
    case REMOVE_CART_ITEM_REQUEST:
      return { ...state, loading: true, error: null };
      case REMOVE_CART_ITEM_SUCCESS:
      return {
          ...state,
          loading: false,
          cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
  
    case REMOVE_CART_ITEM_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Clear Cart
    case CLEAR_CART_REQUEST:
      return { ...state, loading: true, error: null };
    case CLEAR_CART_SUCCESS:
      return { ...state, loading: false, cart: action.payload, cartItems: action.payload.items };
    case CLEAR_CART_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Logout
    case LOGOUT:
      localStorage.removeItem("jwt");
      return { ...state, cartItems: [], cart: null, success: "logout success" };

    default:
      return state;
  }
};

export default cartReducer;
