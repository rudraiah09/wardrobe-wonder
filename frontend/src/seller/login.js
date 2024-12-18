import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; 
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State to hold error message
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      
      const response = await axios.post('http://localhost:3020/sellerlogin', {
        email: email,
        password: password
      }, { withCredentials: true });

      navigate('/sellerhome');
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  }

  return (
    <div className="login-page">
      <div className="brand-container"> 
        <h3>Wardrobe Wonder</h3>
        <p>Where Fashion Meets Convenience.</p>
      </div>
      
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-title">Login</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          {errorMessage && (
            <p className="error-message">{errorMessage}</p> 
          )}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
