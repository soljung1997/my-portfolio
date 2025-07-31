import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api/axios';
import './AuthForms.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // ✅ Register the user
      const res = await api.post('/users/signup', {
        name,
        email,
        password,
      });

      // If signup returns token (auto-login)
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        navigate(from, { replace: true });
        return;
      }

      // Otherwise, try logging in manually
      const loginRes = await api.post('/users/login', {
        email,
        password,
      });

      localStorage.setItem('token', loginRes.data.token);
      navigate(from, { replace: true });

    } catch (err) {
      const msg = err.response?.data?.error || 'Something went wrong';
      setError(msg);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Sign Up</h2>
        {error && <p className="auth-error">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      <button className="back-button" onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
}
