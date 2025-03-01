import { isPresentInFavorites } from "../../component/config/logic";
import { 
  ADD_TO_FAVORITE_REQUEST, ADD_TO_FAVORITE_SUCCESS, 
  GET_USER_REQUEST, LOGIN_REQUEST, LOGIN_SUCCESS, 
  REGISTER_REQUEST, REGISTER_SUCCESS, LOGOUT, 
  REGISTER_FAILURE, LOGIN_FAILURE, GET_USER_FAILURE, 
  ADD_TO_FAVORITE_FAILURE, GET_USER_SUCCESS 
} from "./ActionType";

const initialState = {
    user: null,
    isLoading: false,
    error: null,
    jwt: null,
    favorites: [],
    success: null
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
        case ADD_TO_FAVORITE_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
                success: null
            };

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                jwt: action.payload.jwt,
                user: action.payload.user || state.user, // Store the user if available
                success: action.type === REGISTER_SUCCESS ? "Register Success" : "Login Success"
            };

        case GET_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                success: "User Profile Loaded",
                favorites: action.payload.favorites
            };

        case ADD_TO_FAVORITE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                favorites: isPresentInFavorites(state.favorites, action.payload)
                    ? state.favorites.filter((item) => item.id !== action.payload.id)
                    : [action.payload, ...state.favorites],
                success: "Restaurant Added to Favorites"
            };

        case LOGOUT:
            return {
                ...state,
                user: null,
                jwt: null,
                favorites: [],
                success: "Logout Successful"
            };

        

        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
        case ADD_TO_FAVORITE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                success: null
            };

        default:
            return state;
    }
};
