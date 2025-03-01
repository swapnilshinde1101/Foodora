import {
  CREATE_RESTAURANT_REQUEST,
  CREATE_RESTAURANT_SUCCESS,
  CREATE_RESTAURANT_FAILURE,
  GET_ALL_RESTAURANTS_REQUEST,
  GET_ALL_RESTAURANTS_SUCCESS,
  GET_ALL_RESTAURANTS_FAILURE,
  GET_RESTAURANT_BY_ID_REQUEST,
  GET_RESTAURANT_BY_ID_SUCCESS,
  GET_RESTAURANT_BY_ID_FAILURE,
  DELETE_RESTAURANT_REQUEST,
  DELETE_RESTAURANT_SUCCESS,
  DELETE_RESTAURANT_FAILURE,
  UPDATE_RESTAURANT_REQUEST,
  UPDATE_RESTAURANT_SUCCESS,
  UPDATE_RESTAURANT_FAILURE,
  UPDATE_RESTAURANT_STATUS_REQUEST,
  UPDATE_RESTAURANT_STATUS_SUCCESS,
  UPDATE_RESTAURANT_STATUS_FAILURE,
  GET_RESTAURANT_BY_USER_ID_REQUEST,
  GET_RESTAURANT_BY_USER_ID_SUCCESS,
  GET_RESTAURANT_BY_USER_ID_FAILURE,
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAILURE,
  GET_ALL_EVENTS_REQUEST,
  GET_ALL_EVENTS_SUCCESS,
  GET_ALL_EVENTS_FAILURE,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAILURE,
  GET_RESTAURANT_EVENTS_REQUEST,
  GET_RESTAURANT_EVENTS_SUCCESS,
  GET_RESTAURANT_EVENTS_FAILURE,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILURE,
  GET_RESTAURANT_CATEGORIES_REQUEST,
  GET_RESTAURANT_CATEGORIES_SUCCESS,
  GET_RESTAURANT_CATEGORIES_FAILURE
} from './ActionTypes';

const initialState = {
  restaurants: [],
  userRestaurant: null,
  restaurant: null,
  loading: false,
  error: null,
  events: [],
  restaurantsEvents: [],
  categories: []
};

const restaurantReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_RESTAURANT_REQUEST:
    case GET_ALL_RESTAURANTS_REQUEST:
    case DELETE_RESTAURANT_REQUEST:
    case UPDATE_RESTAURANT_REQUEST:
    case GET_RESTAURANT_BY_ID_REQUEST:
    case CREATE_CATEGORY_REQUEST:
    case GET_RESTAURANT_CATEGORIES_REQUEST:
      return { ...state, loading: true, error: null };

    // Restaurant CRUD actions - Success cases
    case CREATE_RESTAURANT_SUCCESS:
      return { ...state, loading: false, userRestaurant:action.payload };
    case GET_ALL_RESTAURANTS_SUCCESS:
      return { ...state, loading: false, restaurants: action.payload };
    case GET_RESTAURANT_BY_ID_SUCCESS:
      return { ...state, loading: false, restaurant: action.payload };

     case GET_RESTAURANT_BY_USER_ID_SUCCESS:
     case UPDATE_RESTAURANT_STATUS_SUCCESS:
     case UPDATE_RESTAURANT_SUCCESS:
       return { ...state, loading: false, userRestaurant: action.payload };
   
  
    case DELETE_RESTAURANT_SUCCESS:
      return { ...state,error:null, loading: false,
         restaurants: state.restaurants.filter((item)=>item.id !== action.payload),
        userRestaurant:state.usersRestaurant.filter((item)=> item.id !== action.payload), };
    
     
    
    // Event CRUD actions - Success cases
    case CREATE_EVENT_SUCCESS:
      return { ...state, loading: false, events: [...state.events, action.payload] ,
      restaurantsEvents:[...state.restaurantsEvents,action.payload]};


      
    case GET_ALL_EVENTS_SUCCESS:
      return { ...state, loading: false, events: action.payload };

    case GET_RESTAURANT_EVENTS_SUCCESS:
      return { ...state, loading: false, restaurantsEvents: action.payload };

    case DELETE_EVENT_SUCCESS:
      return { ...state, loading: false, events: state.events.filter(
        (item)=> item.id !== action.payload),
        restaurantsEvents:state.restaurantsEvents.filter(
          (item)=> item.id !== action.payload
        ),
      };
    
     

    // Category CRUD actions - Success cases
    case CREATE_CATEGORY_SUCCESS:
      return { ...state, loading: false, categories: [...state.categories, action.payload], };
    // case GET_RESTAURANT_CATEGORIES_SUCCESS:
    //   return { ...state, loading: false, categories: action.payload };
    case GET_RESTAURANT_CATEGORIES_SUCCESS:
      return { ...state, loading: false, categories: action.payload };


    // Restaurant CRUD actions - Failure cases
    case CREATE_RESTAURANT_FAILURE:
    case GET_ALL_RESTAURANTS_FAILURE:
    case GET_RESTAURANT_BY_ID_FAILURE:
    case DELETE_RESTAURANT_FAILURE:
    case UPDATE_RESTAURANT_FAILURE:
    case UPDATE_RESTAURANT_STATUS_FAILURE:
    case GET_RESTAURANT_BY_USER_ID_FAILURE:
    case CREATE_EVENT_FAILURE:
    case GET_ALL_EVENTS_FAILURE:
    case DELETE_EVENT_FAILURE:
    case GET_RESTAURANT_EVENTS_FAILURE:
    case CREATE_CATEGORY_FAILURE:
    case GET_RESTAURANT_CATEGORIES_FAILURE:
     return {
       ...state,
       loading: false,
       error: action.payload.message || 'Something went wrong!',
     };
  


    default:
      return state;
  }
};

export default restaurantReducer;
