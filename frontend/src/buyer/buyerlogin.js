import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./buyerlogin.css";
import axios from 'axios';

function BuyerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State to hold error message
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3020/buyerlogin', {
        email: email,
        password: password
      }, { withCredentials: true });

      navigate('/buyerhome');
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  }

  return (
    <div className="buyer-login-page">
      <div className="buyer-login-brand-container">
        <h3>Wardrobe Wonder</h3>
        <p>Where Fashion Meets Convenience.</p>
      </div>

      <div className="buyer-login-container">
        <form className="buyer-login-form" onSubmit={handleSubmit}>
          <h2 className="buyer-login-title">Login</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="buyer-login-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="buyer-login-input"
          />
          {errorMessage && (
            <p className="buyer-login-error-message">{errorMessage}</p> 
          )}
          <button type="submit" className="buyer-login-button">
            Login
          </button>
          <p class="buyer-login-signup-link">
        Don't have an account? <a href="/buyer-signup" class="buyer-login-link">Sign up here</a>
    </p>
        </form>
      </div>
    </div>
  );
}

export default BuyerLogin;
