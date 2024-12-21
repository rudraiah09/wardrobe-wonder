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
        const response = await axios.get('http://localhost:3020/buyerProfile', {
          withCredentials: true, // Send cookies with the request
        });
        console.log('Fetched User:', response.data); // Log the response to check the structure
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details', error);
        if (error.response?.status === 401) {
          // Redirect to login if unauthorized
          navigate('/buyerlogin');
        } else {
          console.error('Error details:', error.response?.data || error.message);
        }
      }
    };

    fetchUserDetails();
  }, [navigate]);


  const handleLogout = async () => {
      try {
          await axios.post('http://localhost:3020/buyerlogout', {}, {
              withCredentials: true, // Include cookies in the request
          });
          alert('logged out successfully');
          navigate('/buyer-login');
      } catch (error) {
          console.error("Error during logout", error);
          alert('logout failed');
      }
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
