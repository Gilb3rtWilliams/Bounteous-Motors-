import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Slideshow from '../components/Slideshow';
import "../css/Auth.css";
import "../css/Register.css";
import useTypingEffect from '../hooks/useTypingEffect'; // Import the custom hook

const AdminRegister = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    adminCode: ""
  });

  const { registerAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (!formData.adminCode) {
      setError("Admin code is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    try {
      const result = await registerAdmin({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        adminCode: formData.adminCode
      });

      if (result.success) {
        setSuccess(result.message);
        setError("");
        
        // Clear form
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          adminCode: ""
        });

        // Redirect after delay
        setTimeout(() => {
          navigate(result.redirectTo);
        }, result.redirectDelay || 5000);
      } else {
        setError(result.message || "Registration failed");
        setSuccess("");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Registration failed");
      setSuccess("");
    }
  };

  // Typing effect for the admin registration page header
  const welcomeMessage = useTypingEffect("Create Admin Account", 60);

  return (
    <div className="auth-page">
      <Navbar />
      <Slideshow />
      <div className="auth-container">
        <div className="auth-form-container register">
          <h2 className="typing-header">{welcomeMessage}</h2>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="auth-form-group">
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
            <div className="auth-form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Choose a password"
                required
              />
            </div>
            <div className="auth-form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
            </div>
            <div className="auth-form-group">
              <label htmlFor="adminCode">Admin Code</label>
              <input
                type="password"
                id="adminCode"
                name="adminCode"
                value={formData.adminCode}
                onChange={handleChange}
                placeholder="Enter admin code"
                required
              />
            </div>
            <button type="submit" className="auth-button">Create Admin Account</button>
          </form>
          <p className="auth-switch">
            Already have an admin account?{" "}
            <button onClick={() => navigate("/admin-login")} className="text-button">
              Sign in here
            </button>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminRegister;
