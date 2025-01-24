import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './BuyerProfile.css';
import Header from './Header';
import BuyerOrders from './BuyerOrders';
import BuyerWishlist from './BuyerWishlist';

const BuyerProfile = () => {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState('profileInfo');
  const [isEditingName, setIsEditingName] = useState(false);
  const [editableName, setEditableName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3020/buyerProfile', {
          withCredentials: true,
        });
        setUser(response.data);
        setEditableName(response.data.name);
      } catch (error) {
        console.error('Error fetching user details', error);
        if (error.response?.status === 401) {
          navigate('/buyerlogin');
        }
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3020/buyerlogout', {}, {
        withCredentials: true,
      });
      alert('Logged out successfully');
      navigate('/buyer-login');
    } catch (error) {
      console.error('Error during logout', error);
      alert('Logout failed');
    }
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profilePic', file);

      axios.post('http://localhost:3020/uploadProfilePic', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response) => {
          setUser((prevUser) => ({
            ...prevUser,
            profilePic: response.data.profilePic,
          }));
          alert('Profile picture updated successfully');
        })
        .catch((error) => {
          console.error('Error uploading profile picture', error);
          alert('Failed to upload profile picture');
        });
    }
  };

  const handleNameEdit = () => {
    setIsEditingName(true);
  };

  const handleSaveName = async () => {
    try {
      const response = await axios.post('http://localhost:3020/updateName', { name: editableName }, {
        withCredentials: true,
      });
      setUser((prevUser) => ({ ...prevUser, name: response.data.name }));
      setIsEditingName(false);
      alert('Name updated successfully');
    } catch (error) {
      console.error('Error updating name', error);
      alert('Failed to update name');
    }
  };

  const handleCancelEdit = () => {
    setEditableName(user.name);
    setIsEditingName(false);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'profileInfo':
        return (
          <div>
            <h2>Personal Information</h2>
            <div className="editable-field">
              <label>Name:</label>
              {isEditingName ? (
                <div className="edit-section">
                  <input
                    type="text"
                    value={editableName}
                    onChange={(e) => setEditableName(e.target.value)}
                  />
                  <button onClick={handleSaveName} className="save-btn">
                    Save
                  </button>
                  <button onClick={handleCancelEdit} className="cancel-btn">
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="view-section">
                  <span>{user?.name}</span>
                  <button onClick={handleNameEdit} className="edit-btn">
                    Edit
                  </button>
                </div>
              )}
            </div>
            <p>Email: {user?.email}</p>
          </div>
        );
      case 'myOrders':
        return <BuyerOrders />;
      case 'myWishlist':
        return <BuyerWishlist />;
      case 'accountSettings':
        return <h2>Account Settings</h2>;
      case 'manageAddresses':
        return <h2>Manage Addresses</h2>;
      case 'payments':
        return <h2>Payments</h2>;
      default:
        return (
          <div>
            <h2>Personal Information</h2>
            <p>Name: {user?.name}</p>
            <p>Email: {user?.email}</p>
          </div>
        );
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <Header />
      <aside className="sidebar">
        <div className="sidebar-header">
          <label htmlFor="profile-pic-upload" className="profile-pic-wrapper">
            <img
              src={user?.profilePic ? `http://localhost:3020${user.profilePic}` : '/default-profile-pic.jpg'}
              alt="User Profile"
              className="profile-pic"
            />
            <span className="edit-overlay">Click to change</span>
          </label>
          <input
            id="profile-pic-upload"
            type="file"
            accept="image/*"
            onChange={handleProfilePicChange}
            style={{ display: 'none' }}
          />
          <div className="text">
            <p className="hello">Hi,</p>
            <p className="user">{user.name}</p>
          </div>
        </div>
        <nav className="sidebar-menu">
          <ul>
            <li>
              <button
                className="sidebar-btn"
                onClick={() => setActiveSection('profileInfo')}
              >
                Profile Information
              </button>
            </li>
            <li>
              <button
                className="sidebar-btn"
                onClick={() => setActiveSection('myOrders')}
              >
                My Orders
              </button>
            </li>
            <li>
              <button
                className="sidebar-btn"
                onClick={() => setActiveSection('myWishlist')}
              >
                My Wishlist
              </button>
            </li>
            <li>
              <button
                className="sidebar-btn"
                onClick={() => setActiveSection('accountSettings')}
              >
                Account Settings
              </button>
            </li>
            <li>
              <button
                className="sidebar-btn"
                onClick={() => setActiveSection('manageAddresses')}
              >
                Manage Addresses
              </button>
            </li>
            <li>
              <button
                className="sidebar-btn"
                onClick={() => setActiveSection('payments')}
              >
                Payments
              </button>
            </li>
          </ul>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </aside>
      <main className="profile-content">{renderContent()}</main>
    </div>
  );
};

export default BuyerProfile;
