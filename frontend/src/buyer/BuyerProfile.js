import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './BuyerProfile.css';
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
      alert('Logged out successfully');
      navigate('/buyer-login');
    } catch (error) {
      console.error("Error during logout", error);
      alert('Logout failed');
    }
  };

  // Ensure 'user' is loaded before trying to access properties like 'user.name'
  if (!user) {
    return <div>Loading...</div>; // Show a loading message while data is being fetched
  }

  return (
    <div className="profile-page">
      <Header />  
      <aside className="sidebar">
        <div className="sidebar-header">
          <img
            src="/default-profile-pic.jpg"
            alt="User Profile"
            className="profile-pic"
          />
          <p>Hello, {user.name}</p> {/* This will now work once user is loaded */}
        </div>
        <nav className="sidebar-menu">
          <ul>
            <li>My Orders</li>
            <li>Account Settings</li>
            <ul>
              <li className="active">Profile Information</li>
              <li>Manage Addresses</li>
              <li>PAN Card Information</li>
            </ul>
            <li>Payments</li>
            <ul>
              <li>Gift Cards</li>
              <li>Saved UPI</li>
              <li>Saved Cards</li>
            </ul>
            <li>My Stuff</li>
            <ul>
              <li>My Coupons</li>
              <li>My Reviews & Ratings</li>
              <li>All Notifications</li>
              <li>My Wishlist</li>
            </ul>
          </ul>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </aside>
      <main className="profile-content">
        <h2>Personal Information</h2>
        <div className="personal-info">
          <div className="info-group">
            <label>Name</label>
            <input type="text" value={user.name} readOnly />
            <button>Edit</button>
          </div>
          <div className="info-group">
            <label>Your Gender</label>
            <div>
              <input type="radio" id="male" name="gender" checked readOnly />
              <label htmlFor="male">Male</label>
              <input type="radio" id="female" name="gender" readOnly />
              <label htmlFor="female">Female</label>
            </div>
          </div>
          <div className="info-group">
            <label>Email Address</label>
            <input type="email" value={user.email} readOnly />
            <button>Edit</button>
          </div>
          <div className="info-group">
            <label>Mobile Number</label>
            <input type="text" value="1232324211" readOnly />
            <button>Edit</button>
          </div>
        </div>
        <div className="actions">
          <button className="deactivate-btn">Deactivate Account</button>
          <button className="delete-btn">Delete Account</button>
        </div>
      </main>
    </div>
  );
};

export default BuyerProfile;
