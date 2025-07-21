import React, { useEffect, useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);  // ✅ Safe initial value
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Not logged in');
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/api/todos', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to fetch todos');
        setTodos(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTodos();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Todo List</h2>
      {todos.length === 0 ? (
        <p>No todos found.</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo._id}>
              <strong>{todo.title}</strong> - {todo.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
