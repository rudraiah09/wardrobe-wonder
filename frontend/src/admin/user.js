import React, { useState, useEffect } from "react";
import axios from "axios";

const UserDetails = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSellers = async () => {
      console.log("Fetching sellers..."); // Check if this is printed

      try {
        const response = await axios.get('http://localhost:3020/fetchsellers');
        console.log("Response:", response); // Check the response object
        setSellers(response.data); // Assuming the response is an array of sellers
        setLoading(false);
      } catch (err) {
        console.error("Error fetching sellers:", err); // Check if any error is caught
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Seller Details</h2>
      {sellers.length > 0 ? (
        sellers.map((seller, index) => (
          <div key={index} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc'  , width:'1000px'}}>
            <p><strong>Name:</strong> {seller.username} </p>
            <p><strong>Email:</strong> {seller.email}</p>
            <p><strong>Shop:</strong> {seller.shopname}</p>
          </div>
        ))
      ) : (
        <p>No sellers found</p>
      )}
    </div>
  );
};

export default SellerDetails;
