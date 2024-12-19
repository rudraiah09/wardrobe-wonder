import React, { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';
import './BuyerWishlist.css';

const BuyerWishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get('/api/wishlist'); // Replace with actual endpoint
        setWishlist(response.data);
      } catch (error) {
        console.error('Error fetching wishlist');
      }
    };

    fetchWishlist();
  }, []);

  return (
    <div className="buyer-wishlist">
      <Header />
      <h1>Wishlist</h1>
      {wishlist.length > 0 ? (
        <div className="wishlist-items">
          {wishlist.map((item) => (
            <div key={item._id} className="wishlist-item">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p>Price: ${item.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </div>
  );
};

export default BuyerWishlist;
