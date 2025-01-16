import React from 'react';
import './index1.css';
import { Link } from 'react-router-dom';
function Index1() {
  return (
    <div className="indexpage-container">
      <div className="indexpage-title">
        <h1>Wardrobe Wonder</h1>
      </div>

      <div className="indexpage-links">
      <Link to="/admin-login" className="indexpage-link">Admin Login</Link>
        <Link to="/buyer-login" className="indexpage-link">Buyer Login</Link>
        <Link to="/sellerRequest-Form" className="indexpage-link">Seller Request Form</Link>
        <Link to="/seller-login" className="indexpage-link">Seller Login</Link>
        <Link to="/about-us" className="indexpage-link">About Us</Link>
      </div>
    </div>
  );
}

export default Index1;
