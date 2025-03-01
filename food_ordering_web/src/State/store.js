import { combineReducers, applyMiddleware, legacy_createStore } from 'redux'; // Correct import
import { authReducer } from './Authentication/Reducer';
import { thunk } from 'redux-thunk'; // Corrected import for thunk
import restaurantReducer from './Restaurant/Reducer';
import menuItemReducer from './Menu/Reducer';
import cartReducer from './Cart/Reducer';
import orderReducer from './Order/Reducer';
import restaurantOrderReducer from './Restaurant Order/Reducer';
import ingredientReducer from './Ingredients/Reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    restaurant:restaurantReducer,
    menu:menuItemReducer,
    cart:cartReducer,
    order:orderReducer,
    restaurantOrder:restaurantOrderReducer,
    ingredients:ingredientReducer
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
