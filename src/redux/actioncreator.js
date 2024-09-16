import axios from 'axios';

const API_URL = 'https://dummyjson.com/docs/todos';

// Fetch items
export const fetchItems = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ITEMS_REQUEST });
    try {
      const response = await axios.get(API_URL);
      dispatch({ type: FETCH_ITEMS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_ITEMS_FAILURE, error: error.message });
    }
  };
};

// Add a new item
export const addItem = (item) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(API_URL, item);
      dispatch({ type: ADD_ITEM, payload: response.data });
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };
};

// Update an item
export const updateItem = (id, item) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, item);
      dispatch({ type: UPDATE_ITEM, payload: response.data });
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };
};

// Delete an item
export const deleteItem = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      dispatch({ type: DELETE_ITEM, payload: id });
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
};
