import React, { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';
import './BuyerCart.css';
import Cookies from 'js-cookie';
import {decodeToken} from 'react-jwt'
const BuyerCart = () => {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);
    const [user,setUser] = useState('');
    var userid = '';
  
  useEffect(() => {
      const token = Cookies.get('buyerauthToken');
      console.log(token);
    
      if (token) {
        try {
          const decoded = decodeToken(token);
          console.log(decoded)
          console.log(decoded.email);
          userid = decoded.email;
          setUser(decoded.email); 
          console.log(user)// Update state with the decoded email
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      }
    }, []);
  useEffect(() => {

    const fetchCart = async () => {
     
    if (!userid) {
      console.log("no token")
    }
      try {
        const response = await axios.get('http://localhost:3020/buyercart', {
          params: { email: userid },
          withCredentials: true, // Include cookies for authentication
        });

        if (response.status === 200) {
          setCart(response.data.updatedProducts); // Update wishlist state
          console.log(cart)
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
        <div className="cart-items" style={{display:"flex" ,  flexDirection:"row"}}>
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
                          <img src={item.image} alt= { "img"} className='wishlist-image' ></img> 

              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p>Price: ${item.price}</p>
              <p>Quantity:{item.quantity}</p>
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