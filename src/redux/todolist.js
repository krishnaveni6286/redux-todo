import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos, deleteExistingTodo } from './todoslice';
import { useNavigate } from 'react-router-dom';

const TodoList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { todos, status, error } = useSelector((state) => state.todos);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodos()); // Fetch todos from API when the component loads
    }
  }, [status, dispatch]);

  const handleDeleteTodo = (id) => {
    dispatch(deleteExistingTodo(id));
  };

  const handleEditTodo = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div>
      <h1>Todo List</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {todos.length === 0 ? (
        <p>No todos available. Please add one!</p>
      ) : (
        
        
        <ul>
            <button onClick={() => navigate('/')}>Add New Todo</button>
          {todos.map((todo) => (
            <li key={todo.id}>
              {/* <span>{todo.todo} {todo.completed ? '✓' : ''}</span> */}
              <h4>{todo.title}</h4>
              <button onClick={() => handleEditTodo(todo.id)}>update</button>
              <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      {/* <button onClick={() => navigate('/')}>Add New Todo</button> */}
    
    </div>
  );
};

export default TodoList;
