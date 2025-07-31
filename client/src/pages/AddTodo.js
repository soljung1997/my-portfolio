// src/pages/AddTodo.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios'; // ✅ Use custom Axios instance
import './Forms.css';

const AddTodo = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium'
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      alert('You must be logged in to add a todo.');
      return;
    }

    try {
      const res = await api.post('/api/todos', form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert('Todo added successfully!');
      navigate('/todos');
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to add todo';
      alert(msg);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Todo</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />
        <select name="priority" value={form.priority} onChange={handleChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">Add Todo</button>
      </form>
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default AddTodo;
