import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./buyersignup.css"; 
import axios from 'axios';

function BuyerSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword,setconfirmpassword]= useState('');
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State to show success message
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3020/buyersignup', {
        name: name,
        email: email,
        password: password,
        confirmpassword:confirmpassword
      });

      setSuccessMessage("Signup successful! Redirecting to login page...");
      setTimeout(() => navigate('/buyer-login'), 3000); // Redirect after 3 seconds
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  }

  return (
    <div className="buyer-signup-page">
      <div className="buyer-signup-brand-container"> 
        <h3>Wardrobe Wonder</h3>
        <p>Where Fashion Meets Convenience.</p>
      </div>

      <div className="buyer-signup-container">
        <form className="buyer-signup-form" onSubmit={handleSubmit}>
          <h2 className="buyer-signup-title">Sign Up</h2>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="buyer-signup-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="buyer-signup-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="buyer-signup-input"
          />
          <input
            type="password"
            name="confirmpassword"
            placeholder="Confirm Password"
            value={confirmpassword}
            onChange={(e) => setconfirmpassword(e.target.value)} // Handle confirm password input
            className="buyer-signup-input"
          />
          {errorMessage && (
            <p className="buyer-signup-error-message">{errorMessage}</p> 
          )}
          {successMessage && (
            <p className="buyer-signup-success-message">{successMessage}</p> 
          )}
          <button type="submit" className="buyer-signup-button">
            Sign Up
          </button>
          <p class="buyer-login-signup-link">
        already have an account? <a href="/buyer-login" class="buyer-login-link">login here</a>
    </p>
        </form>
      </div>
    </div>
  );
}

export default BuyerSignup;
