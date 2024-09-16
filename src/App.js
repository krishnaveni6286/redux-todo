// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchTodos, addTodo, updateTodo, deleteTodo } from './redux/action'; // Update path as per your structure

// const App = () => {
//   const dispatch = useDispatch();
//   const { todos, loading, error } = useSelector(state => state.todos);

//   useEffect(() => {
//     // Fetch todos on component mount
//     dispatch(fetchTodos());
//   }, [dispatch]);

//   const handleAddTodo = () => {
//     const newTodo = { todo: 'Do something nice for someone you care about',
//       completed: false,
//       userId: 1 }; // Adjust fields according to API structure
//     dispatch(addTodo(newTodo));
//   };

//   const handleUpdateTodo = (id) => {
//     const updatedTodo = { todo: 'Updated Todo', completed: true }; // Adjust fields according to API structure
//     dispatch(updateTodo(id, updatedTodo));
//   };

//   const handleDeleteTodo = (id) => {
//     dispatch(deleteTodo(id));
//   };

//   // if (loading) {
//   //   return <p>Loading...</p>;
//   // }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   return (
//     <div>
//       <h1>Todos</h1>
//       <button onClick={handleAddTodo}>Add Todo</button>
//       <ul>
       
//         {todos.map(todo => (
//            <>
//           <li key={todo.id}>
//             {todo.todo} {/* Adjust field based on API */}
//             </li>
//             <button onClick={() => handleUpdateTodo(todo.id)}>Update</button>
//             <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
//             </>
//         ))}
       
//       </ul>
//     </div>
//   );
// };

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoInput from './redux/Todoinput';
import TodoList from './redux/todolist';
// import TodoInput from './Todoinput';
// import TodoList from './todolist';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<TodoInput />} />
          <Route path="/todos" element={<TodoList />} />
          <Route path="/edit/:id" element={<TodoInput />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
