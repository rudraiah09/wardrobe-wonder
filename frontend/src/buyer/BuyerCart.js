import React, { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';
import './BuyerCart.css';

const BuyerCart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('/api/cart'); // Replace with actual endpoint
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart');
      }
    };

    fetchCart();
  }, []);

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
