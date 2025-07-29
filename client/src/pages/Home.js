import React from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // We'll add this CSS next

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="home-container">
        <img src="/logo.jpg" alt="Zentro Logo" className="zentro-logo" />
        <h1>Welcome to Zentro</h1>
        <p className="home-description">Manage your tasks. Stay focused. Simplify your day.</p>
        <div className="home-buttons">
          <button onClick={() => navigate('/signup')}>Sign Up</button>
          <button onClick={() => navigate('/signin')}>Sign In</button>
        </div>
      </div>
    </>
  );
};

export default Home;
