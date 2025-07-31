import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '' });

  const navigate = useNavigate();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Not logged in');
      return;
    }

    try {
      const res = await api.get('/api/todos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos(res.data);
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to fetch todos';
      setError(msg);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await api.delete(`/api/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchTodos();
    } catch {
      setError('Delete failed');
    }
  };

  const handleEdit = (todo) => {
    setEditingTodoId(todo._id);
    setEditForm({ title: todo.title, description: todo.description });
  };

  const handleUpdate = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await api.put(`/api/todos/${id}`, editForm, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setEditingTodoId(null);
      await fetchTodos();
    } catch {
      setError('Update failed');
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div className="todo-container">
      <h2>Todo List</h2>
      {todos.length === 0 ? (
        <p>No todos found.</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li className="todo-item" key={todo._id}>
              {editingTodoId === todo._id ? (
                <div style={{ flex: 1 }}>
                  <input
                    name="title"
                    value={editForm.title}
                    onChange={handleEditChange}
                    placeholder="Title"
                  />
                  <input
                    name="description"
                    value={editForm.description}
                    onChange={handleEditChange}
                    placeholder="Description"
                  />
                </div>
              ) : (
                <div className="todo-text">
                  {todo.title} — {todo.description}
                </div>
              )}
              <div className="todo-actions">
                {editingTodoId === todo._id ? (
                  <>
                    <button onClick={() => handleUpdate(todo._id)}>Save</button>
                    <button onClick={() => setEditingTodoId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(todo)}>Edit</button>
                    <button onClick={() => handleDelete(todo._id)}>Delete</button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => navigate('/')} className="back-button">Back to Home</button>
    </div>
  );
};

export default TodoList;
