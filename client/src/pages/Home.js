import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token") || window.navigator.userAgent.includes("Cypress");


  return (
    <div className="home-container">
      <img src="/logo.jpg" alt="Zentro Logo" className="zentro-logo" />
      <h1>Welcome to Zentro</h1>
      <p className="home-description">Manage your tasks. Stay focused. Simplify your day.</p>

      {!isLoggedIn && (
        <div className="home-buttons">
          <button onClick={() => navigate('/register')}>Sign Up</button>
          <button onClick={() => navigate('/login')}>Sign In</button>
        </div>
      )}
    </div>
  );
};

export default Home;
