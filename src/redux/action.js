// // Action types for CRUD operations
// export const FETCH_ITEMS_REQUEST = 'FETCH_ITEMS_REQUEST';
// export const FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS';
// export const FETCH_ITEMS_FAILURE = 'FETCH_ITEMS_FAILURE';

// export const ADD_ITEM = 'ADD_ITEM';
// export const UPDATE_ITEM = 'UPDATE_ITEM';
// export const DELETE_ITEM = 'DELETE_ITEM';

import axios from 'axios';

const API_URL = 'https://dummyjson.com/todos'; // Corrected URL for todos API

// Action Types
export const FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST';
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
export const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE';
export const ADD_TODO = 'ADD_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';

// Fetch Todos
export const fetchTodos = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_TODOS_REQUEST });
    const response = await axios.get(API_URL);
    dispatch({ type: FETCH_TODOS_SUCCESS, payload: response.data.todos });
  } catch (error) {
    dispatch({ type: FETCH_TODOS_FAILURE, error: error.message });
  }
};

// Add Todo
// export const addTodo = (todo) => async (dispatch) => {
//   try {
//     const response = await axios.post(API_URL, todo);
//     dispatch({ type: ADD_TODO, payload: response.data });
//   } catch (error) {
//     console.error('Error adding todo:', error);
//   }
// };


// Add Todo Action Creator
export const addTodo = (todo) => async (dispatch) => {
  try {
    // Make a POST request to add a new todo (without 'id')
    const response = await axios.post('https://dummyjson.com/todos', {
      todo: todo.todo,
      completed: todo.completed,
      userId: todo.userId
    });
    
    dispatch({ type: ADD_TODO, payload: response.data });  // Dispatch the new todo
  } catch (error) {
    console.error('Error adding todo:', error);
  }
};


// Update Todo
export const updateTodo = (id, todo) => async (dispatch) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, todo);
    dispatch({ type: UPDATE_TODO, payload: response.data });
  } catch (error) {
    console.error('Error updating todo:', error);
  }
};

// Delete Todo
export const deleteTodo = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    dispatch({ type: DELETE_TODO, payload: id });
  } catch (error) {
    console.error('Error deleting todo:', error);
  }
};
