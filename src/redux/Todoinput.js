import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTodo, updateExistingTodo } from './todoslice';
import { useNavigate, useParams } from 'react-router-dom';

const TodoInput = () => {
  const [todoText, setTodoText] = useState('');
  const { id } = useParams();
  const todos = useSelector((state) => state.todos.todos); // Get todos from state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Pre-fill todo text if editing
  useEffect(() => {
    if (id) {
      const existingTodo = todos.find((title) => title.id === parseInt(id));
      if (existingTodo) {
        setTodoText(existingTodo.title);
      }
    }
  }, [id, todos]);

  const handleSaveTodo = () => {
    if (todoText.trim() !== '') {
      if (id) {
        // Update existing todo via API
        dispatch(updateExistingTodo({ id: parseInt(id), updatedTodo: { title: todoText } }));
      } else {
        // Add new todo via API
        const newTodo = {
          title: todoText,
          completed: false,
          userId: 1, // Adjust as per your API's requirements
        };
        dispatch(addNewTodo(newTodo));
      }

      navigate('/todos');
    }
  };

  return (
    <div>
      <h1>{id ? 'Edit Todo' : 'Add New Todo'}</h1>
      <input
        type="text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        placeholder="Enter a todo"
      />
      <button onClick={handleSaveTodo}>{id ? 'Update Todo' : 'Add Todo'}</button>
    </div>
  );
};

export default TodoInput;
