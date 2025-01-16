import React, { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';
import './BuyerWishlist.css';
import Cookies from 'js-cookie';
import {decodeToken} from 'react-jwt'

const BuyerWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState(null);
  const [user,setUser] = useState('');

  useEffect(() => {
    const token = Cookies.get('buyerauthToken');
    console.log(token);
  
    if (token) {
      try {
        const decoded = decodeToken(token);
        console.log(decoded.email);
        setUser(decoded.email); // Update state with the decoded email
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []); // Run only once on component mount
  
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) {
        console.log('User is not defined yet.');
        return;
      }
  
      try {
        console.log('Sending request to backend...');
        const response = await axios.get('http://localhost:3020/buyerwishlist', {
          params: { email: user }, // Pass the user email as a query parameter
          withCredentials: true, // Include cookies for authentication
        });
  
        if (response.status === 200) {
          setWishlist(response.data.updatedProducts); // Update wishlist state
          console.log('Wishlist data:', response.data.updatedProducts);
        } else {
          console.error('Unexpected response:', response);
          setError('Unexpected response from server.');
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error);
  
        if (error.response && error.response.status === 401) {
          setError('Unauthorized: Please log in to view your wishlist.');
        } else {
          setError('Failed to fetch wishlist. Please try again later.');
        }
      }
    };
  
    fetchWishlist();
  }, [user]); // Run this effect whenever `user` changes
  
// Handle removing an item from the wishlist
const handleRemoveItem = async (itemId) => {
  // Confirm the removal action
  const confirmDelete = window.confirm('Are you sure you want to remove this item from your wishlist?');
  if (!confirmDelete) return;

  try {
    const response = await axios.delete(`http://localhost:3020/buyerwishlist/${itemId}`);
    
    if (response.status === 200) {
      // Update the wishlist state
      setWishlist((prevWishlist) => prevWishlist.filter((item) => item._id !== itemId));
      alert('Item removed from wishlist.');
    } else {
      alert('Failed to remove item from wishlist. Please try again.');
    }
  } catch (error) {
    console.error('Error removing item from wishlist:', error);

    // Display backend error message if available
    const errorMessage = error.response?.data?.message || 'Failed to remove item from wishlist.';
    alert(errorMessage);
  }
};


  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="buyer-wishlist">
      <Header />
      <h1>Wishlist</h1>

      {/* Wishlist Items */}
      {wishlist.length > 0 ? (
        <div className="wishlist-items">
          {wishlist.map((item) => (
            <div key={item._id} className="wishlist-item">
              <img src={item.image} alt= { "img"} className='wishlist-image' ></img> 
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p>Price: ${item.price}</p>
              <button
                className="btn remove-btn"
                onClick={() => handleRemoveItem(item._id)}
              >
                Remove from Wishlist
              </button>
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
