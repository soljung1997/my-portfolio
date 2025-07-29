import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css'; // Custom styles

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const linkClass = (path) =>
    `nav-link${location.pathname === path ? ' active' : ''}`;

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/" className={linkClass('/')}>Home</Link>
        {isLoggedIn ? (
          <>
            <Link to="/add" className={linkClass('/add')}>Add Todo</Link>
            <Link to="/todos" className={linkClass('/todos')}>View Todos</Link>
            <Link to="/profile" className={linkClass('/profile')}>My Profile</Link>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={linkClass('/login')}>Login</Link>
            <Link to="/register" className={linkClass('/register')}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
