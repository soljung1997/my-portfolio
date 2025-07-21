import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Projects from './pages/Projects';
import AddTodo from './pages/AddTodo';
import TodoList from './pages/TodoList';
import Register from './pages/Register';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/add" element={<AddTodo />} /> {/* new route */}
      <Route path="/todos" element={<TodoList />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
