import React, { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';
import './BuyerWishlist.css';
import Cookies from 'js-cookie';
import { decodeToken } from 'react-jwt';

const BuyerWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState('');

  useEffect(() => {
    const token = Cookies.get('buyerauthToken');
    console.log('Token:', token);

    if (token) {
      try {
        const decoded = decodeToken(token);
        console.log('Decoded email:', decoded.email);
        setUser(decoded.email); // Update the state with decoded email
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
          params: { email: user }, // Use the `user` state
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

  
  const handleRemoveItem = async (itemId) => {
    if (!user) {
      alert('User is not logged in.');
      return;
    }

    
    const confirmDelete = window.confirm('Are you sure you want to remove this item from your wishlist?');
    if (!confirmDelete) return;

    try {
      console.log('Removing item:', itemId, 'for user:', user);

      const response = await axios.delete('http://localhost:3020/removefrombuyerwishlist', {
        params: { itemId:itemId, email: user }, 
      });

      if (response.status === 200) {
        setWishlist((prevWishlist) => prevWishlist.filter((item) => item._id !== itemId));
        alert('Item removed from wishlist.');
      } else {
        alert('Failed to remove item from wishlist. Please try again.');
      }
    } catch (error) {
      console.error('Error removing item from wishlist:', error);

      const errorMessage = error.response?.data?.message || 'Failed to remove item from wishlist.';
      alert(errorMessage);
    }
  };
  const handleAddtocart = async (itemId) => {
    if (!user) {
      alert('User is not logged in.');
      return;
    }

    
    const confirmDelete = window.confirm('Are you sure you want to add element to cart?');
    if (!confirmDelete) return;

    try {
      console.log('add to cart:', itemId, 'for user:', user);

      const response = await axios.post('http://localhost:3020/addtocartfromw', {
        params: { itemId:itemId, email: user }, 
      });

      if (response.status === 200) {
        setWishlist((prevWishlist) => prevWishlist.filter((item) => item._id !== itemId));
        alert('Item removed from wishlist.');
      } else {
        alert('Failed to remove item from wishlist. Please try again.');
      }
    } catch (error) {
      console.error('Error removing item from wishlist:', error);

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

      {wishlist.length > 0 ? (
        <div className="wishlist-items">
          {wishlist.map((item) => (
            <div key={item._id} className="wishlist-item">
              <img src={item.image} alt="Wishlist item" className="wishlist-image" />
              <h3 style={{marginLeft:'100px'}}>{item.title}</h3>
              <p style={{marginLeft:'80px'}}>{item.description}</p>
              <p style={{marginLeft:'100px'}}>Price: ${item.price}</p>
              <button
                className="btn remove-btn"
                onClick={() => handleRemoveItem(item._id)}
              >
                Remove from Wishlist
              </button>
              <button
                className="btn remove-btn"
                onClick={() => handleAddtocart(item._id)}
              >
                Add to cart
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
