import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaSpinner } from "react-icons/fa";
import AuthContext from "../context/AuthContext";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Slideshow from '../components/Slideshow';
import "../css/Auth.css";
import useTypingEffect from '../hooks/useTypingEffect'; // Import the custom hook

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) navigate("/dashboard");
      else setError("Invalid credentials");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Typing effect for the login page header
  const welcomeMessage = useTypingEffect("Welcome Back!", 60);
  const subMessage = useTypingEffect("Login to your account to continue", 60);

  return (
    <div className="auth-page">
      <Navbar />
      <Slideshow />
      <div className="auth-container">
        <div className="auth-form-container login">
          <h2 className="typing-header">{welcomeMessage}</h2>
          <h3 className="typing-subheader">{subMessage}</h3>

          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-form-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="auth-form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? <FaSpinner className="spinner" /> : "Sign In"}
            </button>
          </form>

          <p className="auth-switch">
            Don’t have an account?
            <button onClick={() => navigate("/register")} className="text-button">
              Register here
            </button>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
