import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./adminlogin.css"; // Assuming this file has styles for the admin login
import axios from "axios";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State to hold error message
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3020/adminlogin",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      );

      // Navigate to admin dashboard after successful login
      navigate("/sellerhome");
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-brand-container">
        <h3>Admin Portal</h3>
        <p>Manage the Platform with Ease.</p>
      </div>

      <div className="admin-login-container">
        <form className="admin-login-form" onSubmit={handleSubmit}>
          <h2 className="admin-login-title">Admin Login</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="admin-login-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="admin-login-input"
          />
          {errorMessage && (
            <p className="admin-login-error-message">{errorMessage}</p>
          )}
          <button type="submit" className="admin-login-button">
            Login
          </button>
          
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
