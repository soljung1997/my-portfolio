import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={{ padding: '10px', background: '#eee' }}>
      <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
      {isLoggedIn ? (
        <>
          <Link to="/add" style={{ marginRight: '10px' }}>Add Todo</Link>
          <Link to="/todos" style={{ marginRight: '10px' }}>View Todos</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
          <Link to="/register">Sign Up</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
