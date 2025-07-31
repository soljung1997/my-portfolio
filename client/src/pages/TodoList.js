import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios'; // ✅ use your axios instance
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
    try {
      const res = await api.get('/todos');
      setTodos(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch todos');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
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
    try {
      await api.put(`/todos/${id}`, editForm);
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
                  <input name="title" value={editForm.title} onChange={handleEditChange} />
                  <input name="description" value={editForm.description} onChange={handleEditChange} />
                </div>
              ) : (
                <div className="todo-text">{todo.title} — {todo.description}</div>
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
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default TodoList;
