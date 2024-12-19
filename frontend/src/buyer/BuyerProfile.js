import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './BuyerProfile.css'; // Add styles for Profile
import Header from './Header';

const BuyerProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('/api/user'); // Replace with your API endpoint
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = () => {
    // Logic for logging out
    axios.post('/api/logout').then(() => {
      navigate('/buyerlogin'); // Redirect to login page after logout
    });
  };

  return (
    <div className="profile-container">
        <Header />
      <h1>Profile</h1>
      {user ? (
        <div className="profile-details">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default BuyerProfile;
