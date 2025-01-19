import React, { useState, useEffect } from "react";
import "./buyer.css";
import axios from "axios";

const BuyerDetails = () => {
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        const response = await axios.get("http://localhost:3020/fetchbuyers");
        setBuyers(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBuyers();
  }, []);

  const deleteBuyer = async (id) => {
    try {
      await axios.delete(`http://localhost:3020/deletebuyer/${id}`);
      setBuyers((prevBuyers) => prevBuyers.filter((buyer) => buyer._id !== id));
    } catch (err) {
      console.error("Error deleting buyer:", err.message);
      alert("Failed to delete buyer. Please try again.");
    }
  };
  

  return (
    <div className="buyer-details-container">
      <h2>Buyer Details</h2>
      {loading ? (
        <p className="loading-message">Loading...</p>
      ) : error ? (
        <p className="error-message">Error: {error}</p>
      ) : buyers.length > 0 ? (
        <div className="buyers-list" style={{ display: "flex", flexDirection: "column", marginLeft: "500px" }}>
          {buyers.map((buyer) => (
            <div key={buyer._id} className="buyer-card" style={{ width: "60%" }}>
              <p>
                <strong>Name:</strong> {buyer.name}
              </p>
              <p>
                <strong>Email:</strong> {buyer.email}
              </p>
              
              <button
                onClick={() => deleteBuyer(buyer._id)}
                className="delete-button"
                style={{
                  backgroundColor: "red",
                  color: "white",
                  padding: "5px 10px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-message">No buyers found</p>
      )}
    </div>
  );
};

export default BuyerDetails;
