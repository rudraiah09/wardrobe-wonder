import React, { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';
import './BuyerCart.css';

const BuyerCart = () => {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:3020/buyercart', {
          withCredentials: true, // Include cookies for authentication
        });

        if (response.status === 200) {
          setCart(response.data); // Update wishlist state
        } else {
          console.error('Unexpected response:', response);
          setError('Unexpected response from server.');
        }
      } catch (error) {
        console.error('Error fetching cart:', error);

        if (error.response && error.response.status === 401) {
          setError('Unauthorized: Please log in to view your cart.');
        } else {
          setError('Failed to fetch wishlist. Please try again later.');
        }
      }
    };

    fetchCart();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div className="buyer-cart">
      <Header />
      <h1>Cart</h1>
      {cart.length > 0 ? (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p>Price: ${item.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default BuyerCart;