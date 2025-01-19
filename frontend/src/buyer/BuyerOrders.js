import React, { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';
import './BuyerOrders.css';

const BuyerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get('/api/orders'); // Replace with actual endpoint
        setOrders(response.data);
      } catch (error) {
        setError('Error fetching orders');
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchOrders();
  }, []);

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
              <p>Price: ${order.price}</p>
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
