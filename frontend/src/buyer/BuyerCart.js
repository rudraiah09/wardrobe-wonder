import React, { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';
import './BuyerCart.css';
import Cookies from 'js-cookie';
import { decodeToken } from 'react-jwt';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const BuyerCart = () => {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState('');
  var s="";

  useEffect(() => {
    const token = Cookies.get('buyerauthToken');

    if (token) {
      try {
        const decoded = decodeToken(token);
        setUser(decoded.email);
        s=decoded.email;
        console.log(s)
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      if (!user) {
        console.log("No user logged in");
        return;
      }

      try {
        const response = await axios.get('http://localhost:3020/buyercart', {
          params: { email: user },
          withCredentials: true,
        });

        if (response.status === 200) {
          setCart(response.data.updatedProducts);
        } else {
          setError('Unexpected response from server.');
        }
      } catch (error) {
        console.error('Error fetching cart:', error);

        if (error.response && error.response.status === 404) {
            setCart([])
        } else {
          setError('Failed to fetch cart. Please try again later.');
        }
      }
    };

    fetchCart();
  }, [user]);

  const handleRemoveFromCart = async (itemId) => {
    const token = Cookies.get('buyerauthToken');

    if (token) {
      try {
        const decoded = decodeToken(token);
        setUser(decoded.email);
        s=decoded.email;
        console.log(s)
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    try {
      const response = await axios.delete(`http://localhost:3020/removefromcart`, {
        params: { email: s, productId: itemId },
        
        withCredentials: true,
      });

      if (response.status === 200) {
        setCart(cart.filter((item) => item._id !== itemId));
        toast.success("Removed from Cart sucessfully" ,  {autoClose:1000})
      } else {
        console.error('Failed to remove item from cart:', response);
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post('http://localhost:3020/placeorder', {
        email: user,
        items: cart,
      }, {
        withCredentials: true,
      });

      if (response.status === 200) {
                  toast.success("Order placed sucessfully" , {autoClose:1000})
        
        setCart([]); // Clear cart after placing order
      } else {
        console.error('Failed to place order:', response);
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="buyer-cart">
      <ToastContainer/>
      <Header />
      <h1>Cart</h1>
      {cart.length > 0 ? (
        <div className="cart-items" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              <img src={item.image} alt={item.title} className="wishlist-image" />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => handleRemoveFromCart(item._id)}>Remove from Cart</button>
            </div>
          ))}
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
      <h2 className="cart-total-price">
  Total Price: ${cart.reduce((total, item) => total + item.price * item.quantity, 0)}
</h2>

      {cart.length > 0 && (
        <button onClick={handlePlaceOrder} className="place-order-button">
          Place Order
        </button>
      )}
    </div>
  );
};

export default BuyerCart;
