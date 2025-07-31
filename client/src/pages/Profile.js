import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Not logged in');
        return;
      }

      try {
        const res = await api.get('/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(res.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch user');
      }
    };

    fetchUser();
  }, []);

  if (error) return <div className="profile-container"><p className="error">{error}</p></div>;
  if (!user) return <div className="profile-container"><p>Loading...</p></div>;

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <div className="profile-card">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>ID:</strong> {user._id}</p>
      </div>
    </div>
  );
};

export default Profile;
