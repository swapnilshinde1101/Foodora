import { api } from '../../../../food_ordering_web/src/component/config/api';
import { CREATE_INGREDIENT_CATEGORY_SUCCESS, GET_INGREDIENT_CATEGORY_FAILURE, GET_INGREDIENT_CATEGORY_REQUEST, GET_INGREDIENT_CATEGORY_SUCCESS, GET_INGREDIENTS, UPDATE_STOCK } from './ActionTypes';
  
  export const getIngredientsOfRestaurant = ({ id, jwt }) => {
    return async (dispatch) => {
      try {
        const response = await api.get(`/api/admin/ingredients/restaurant/${id}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        console.log("get all ingredients", response.data);
        
        dispatch({ type: GET_INGREDIENTS, payload: response.data });
      } catch (error) {
        console.error('Error fetching ingredients', error);
      }
    };
  };
  // Create Ingredient
  export const createIngredient = ({data, jwt}) => {
    return async (dispatch) => {

      try {
        const response = await api.post('/api/admin/ingredients', data, {
          headers: { Authorization: `Bearer ${jwt}` },
        });
        console.log("create ingredients",response.data);        
        dispatch({ type: CREATE_INGREDIENT_CATEGORY_SUCCESS, payload: response.data });
      } catch (error) {
        console.log("error",error);        
      }
    };
  };
  
// Create Ingredient Category
export const createIngredientCategory = ({data, jwt}) => {
  console.log("data",data,"jwt",jwt);  
  return async (dispatch) => {
    try {
      const response= await api.post('/api/admin/ingredients/category', data, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("create ingredients category",response.data);      
      dispatch({ type: CREATE_INGREDIENT_CATEGORY_SUCCESS, payload: response.data });
    } catch (error) {
      console.log("error",error);      
    }
  };
};

export const updateStockOfIngredient = ({id, jwt}) => {
  return async (dispatch) => {
    try {
      const response = await api.put(
        `/api/admin/ingredients/${id}/stoke`,
        {}, 
        { headers: { Authorization: `Bearer ${jwt}` } }
      );
      
      const updatedIngredient = response.data; // Ensure this has the updated data.
      dispatch({ 
        type: UPDATE_STOCK, 
        payload: updatedIngredient // Updated ingredient data
      });
      console.log("update ingredients stock", updatedIngredient);
      
    } catch (error) {
      console.log('Error updating stock', error);
    }
  };
};

  
  
// Get Ingredient Categories
export const getIngredientCategory = ({ id, jwt }) => {
  return async (dispatch) => {
      dispatch({ type: GET_INGREDIENT_CATEGORY_REQUEST }); 

      try {
          const response = await api.get(
              `/api/admin/ingredients/restaurant/${id}/category`,
              { headers: { Authorization: `Bearer ${jwt}` } }
          );

          console.log("get ingredients category", response.data);
          dispatch({ type: GET_INGREDIENT_CATEGORY_SUCCESS, payload: response.data });

      } catch (error) {
          console.error("Error fetching ingredient categories:", error);
          dispatch({ type: GET_INGREDIENT_CATEGORY_FAILURE, payload: error.message }); // ✅ Dispatch failure action
      }
  };
};