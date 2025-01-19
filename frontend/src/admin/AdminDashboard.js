import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [sellersCount, setSellersCount] = useState(0);
  const [buyersCount, setBuyersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);

  // Fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch counts from the backend
        const sellersRes = await axios.get('http://localhost:3020/sellerscount');
        setSellersCount(sellersRes.data.count);

        const buyersRes = await axios.get('http://localhost:3020/buyerscount');
        setBuyersCount(buyersRes.data.count);

        const productsRes = await axios.get('http://localhost:3020/productscount');
        setProductsCount(productsRes.data.count);
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>
      <div className="stats-container">
        <div className="stat-card sellers-box">
          <h2>{sellersCount}</h2>
          <p>Sellers</p>
        </div>
        <div className="stat-card buyers-box">
          <h2>{buyersCount}</h2>
          <p>Buyers</p>
        </div>
        <div className="stat-card products-box">
          <h2>{productsCount}</h2>
          <p>Products</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
