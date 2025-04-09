import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Slideshow from '../components/Slideshow';
import "../css/Auth.css";
import "../css/Login.css";

const AdminLogin = () => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await login(formData.email, formData.password);
      if (response === true) {
        // Success - AuthContext handles redirect
      } else {
        setError("Login failed - please try again");
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || err.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <Navbar />
      <Slideshow />
      <div className="auth-container">
        <div className="auth-form-container login">
          <h2>Admin Login</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
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
            <button type="submit" className="auth-button">Login</button>
          </form>
          <p className="auth-switch">
            Don't have an admin account?{" "}
            <button onClick={() => navigate("/admin-register")} className="text-button">
              Create one here
            </button>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLogin;
