import React, { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';
import './BuyerOrders.css';

const BuyerOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders'); // Replace with actual endpoint
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders');
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="buyer-orders">
      <Header />
      <h1>Orders</h1>
      {orders.length > 0 ? (
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
        <p>You have no past orders.</p>
      )}
    </div>
  );
};

export default BuyerOrders;
