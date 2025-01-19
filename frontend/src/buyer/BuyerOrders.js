import React, { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';
import Cookies from 'js-cookie';
import { decodeToken } from 'react-jwt';
import './BuyerOrders.css';

const BuyerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state
  const [user, setUser] = useState('');

  useEffect(() => {
    const token = Cookies.get('buyerauthToken');
    if (token) {
      try {
        const decoded = decodeToken(token);
        setUser(decoded.email);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        console.log('No user logged in');
        return;
      }

      try {
        setLoading(true); // Start loading
        const response = await axios.get('http://localhost:3020/buyerorders', {
          params: { email: user },
          withCredentials: true,
        });
        console.log(user)
        if (response.status === 200) {
          console.log(response.data);
          setOrders(response.data.orders);
        } else {
          setError('Unexpected response from server.');
        }
      } catch (error) {
        setError('Error fetching orders');
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <div className="buyer-orders">
      <Header />
      <h1>Orders</h1>

      {loading ? (
        <p>Loading orders...</p> // Display loading message
      ) : error ? (
        <p>{error}</p> // Display error message
      ) : orders.length > 0 ? (
        <div className="order-items">
          {orders.map((order) => (
            <div key={order._id} className="order-item">
              
              <h3>{order.title}</h3>
              <p>{order.description}</p>
              <p>Price: ${order.totalAmount}</p>
              <p>Status: {order.status}</p>
              <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>You have no past orders.</p> // No orders message
      )}
    </div>
  );
};

export default BuyerOrders;
