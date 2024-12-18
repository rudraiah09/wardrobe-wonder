import React, { useEffect, useState } from "react";
import './Dashboard.css'
const SellerDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalProducts: 0,
    totalOrders: 0,
    earnings: 0,
    pendingOrders: 0,
    recentOrders: [],
    notifications: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/seller/dashboard");
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="seller-dashboard">
      <h1 className="seller-dashboard-title">Seller Dashboard</h1>

      
      <div className="seller-kpis">
        <div className="seller-kpi seller-kpi-total-products">
          <h2>Total Products</h2>
          <p>{dashboardData.totalProducts}</p>
        </div>
        <div className="seller-kpi seller-kpi-total-orders">
          <h2>Total Orders</h2>
          <p>{dashboardData.totalOrders}</p>
        </div>
        <div className="seller-kpi seller-kpi-earnings">
          <h2>Earnings</h2>
          <p>₹{dashboardData.earnings}</p>
        </div>
        <div className="seller-kpi seller-kpi-pending-orders">
          <h2>Pending Orders</h2>
          <p>{dashboardData.pendingOrders}</p>
        </div>
      </div>

      
      <div className="seller-recent-orders">
        <h2>Recent Orders</h2>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product Name</th>
              <th>Status</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.recentOrders.length > 0 ? (
              dashboardData.recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.productName}</td>
                  <td>{order.status}</td>
                  <td>₹{order.totalPrice}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No recent orders</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      
      <div className="seller-notifications">
        <h2>Notifications</h2>
        <ul>
          {dashboardData.notifications.length > 0 ? (
            dashboardData.notifications.map((notification, index) => (
              <li key={index}>{notification}</li>
            ))
          ) : (
            <li>No notifications</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SellerDashboard;
