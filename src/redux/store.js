

// import { createStore, applyMiddleware, combineReducers, legacy_createStore } from 'redux';
// import {thunk} from 'redux-thunk';
// import { todosReducer } from './reducer';
//  // Adjust the path if necessary

// const rootReducer = combineReducers({
//   todos: todosReducer  // This defines `state.todos`
// });

// const store = legacy_createStore(
//   rootReducer,
//   applyMiddleware(thunk)
// );

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoslice';

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

export default store;
