import React, { useState, useEffect } from "react";
import "./seller.css";
import axios from "axios";

const SellerDetails = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get("http://localhost:3020/fetchsellers");
        setSellers(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  const deleteSeller = async (id) => {
    try {
      await axios.delete(`http://localhost:3020/deleteseller/${id}`);
      setSellers((prevSellers) => prevSellers.filter((seller) => seller._id !== id));
    } catch (err) {
      console.error("Error deleting seller:", err.message);
      alert("Failed to delete seller. Please try again.");
    }
  };

  return (
    <div className="seller-details-container">
      <h2>Seller Details</h2>
      {loading ? (
        <p className="loading-message">Loading...</p>
      ) : error ? (
        <p className="error-message">Error: {error}</p>
      ) : sellers.length > 0 ? (
        <div className="sellers-list" style={{ display: "flex", flexDirection: "column", marginLeft: "500px" }}>
          {sellers.map((seller) => (
            <div key={seller._id} className="seller-card" style={{ width: "60%" }}>
              <p>
                <strong>Name:</strong> {seller.username}
              </p>
              <p>
                <strong>Email:</strong> {seller.email}
              </p>
              <p>
                <strong>Shop:</strong> {seller.shopname}
              </p>
              <button
                onClick={() => deleteSeller(seller._id)}
                className="delete-button"
                style={{ backgroundColor: "red", color: "white", padding: "5px 10px", border: "none", borderRadius: "5px", cursor: "pointer" }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-message">No sellers found</p>
      )}
    </div>
  );
};

export default SellerDetails;
