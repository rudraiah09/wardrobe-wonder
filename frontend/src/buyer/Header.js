import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h2 className="header-title">Wadrobe Wonders</h2>
      <nav className="header-nav">
        <Link to="/buyerhome" className="header-link">Home</Link>
        <Link to="/buyerprofile" className="header-link">Profile</Link>
        <Link to="/buyercart" className="header-link">Cart</Link>
        <Link to="/buyerwishlist" className="header-link">Wishlist</Link>
        <Link to="/buyerorders" className="header-link">Orders</Link>
      </nav>
    </header>
  );
};

export default Header;
