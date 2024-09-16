import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API URL
const API_URL = 'https://jsonplaceholder.typicode.com/todos'; // Replace with your API endpoint

// Async thunk to fetch todos
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// Async thunk to add a new todo
export const addNewTodo = createAsyncThunk('todos/addNewTodo', async (newTodo) => {
  const response = await axios.post(API_URL, newTodo);
  return response.data;
});

// Async thunk to update a todo
export const updateExistingTodo = createAsyncThunk('todos/updateExistingTodo', async ({ id, updatedTodo }) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedTodo);
  return response.data;
});

// Async thunk to delete a todo
export const deleteExistingTodo = createAsyncThunk('todos/deleteExistingTodo', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Todos
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
      // Add Todo
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      
      // Update Todo
      .addCase(updateExistingTodo.fulfilled, (state, action) => {
        const { id, ...updatedTodo } = action.payload;
        const index = state.todos.findIndex((todo) => todo.id === id);
        if (index >= 0) {
          state.todos[index] = { ...state.todos[index], ...updatedTodo };
        }
      })
      
      // Delete Todo
      .addCase(deleteExistingTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
