import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserShield, FaLock, FaSpinner } from "react-icons/fa";
import AuthContext from "../context/AuthContext";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Slideshow from '../components/Slideshow';
import "../css/Auth.css";
import useTypingEffect from '../hooks/useTypingEffect'; // Import the custom hook

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await login(formData.email, formData.password);
      if (!response) setError("Invalid credentials");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Typing effect for the admin login page header
  const welcomeMessage = useTypingEffect("Admin Login", 60);
  const submessage = useTypingEffect("⚠ALERT! Restricted access, Admins only!", 60);

  return (
    <div className="auth-page">
      <Navbar />
      <Slideshow />
      <div className="auth-container">
        <div className="auth-form-container login">
          <h2 className="typing-header">{welcomeMessage}</h2>
          <h4 className="typing-subheader">{submessage}</h4>

          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-form-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrapper">
                <FaUserShield className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your admin email"
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? <FaSpinner className="spinner" /> : "Login"}
            </button>
          </form>

          <p className="auth-switch">
            Don't have an admin account?
            <button onClick={() => navigate("/admin-register")} className="text-button">
              Register here
            </button>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLogin;
