import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../css/Navbar.css';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleNavClick = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={logo} alt="Bounteous Motors logo" className="logo" style={{ width: '100px', height: '100px' }} />
        <button 
          onClick={() => handleNavClick('/')} 
          className="brand-name"
          aria-label="Home"
        >
          BOUNTEOUS MOTORS
        </button>
      </div>

      <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
        <button onClick={() => handleNavClick('/')} className="nav-link">Home</button>
        <button onClick={() => handleNavClick('/cars')} className="nav-link">Car Listings</button>
        {user ? (
          <>
            <button 
              onClick={() => handleNavClick(user.role === 'admin' ? '/admin-dashboard' : '/dashboard')} 
              className="nav-link"
            >
              Dashboard
            </button>
            {user.role === 'admin' ? (
              <button onClick={() => handleNavClick('/admin-profile')} className="nav-link">
                Admin Profile
              </button>
            ) : (
              <button onClick={() => handleNavClick('/profile')} className="nav-link">
                My Profile
              </button>
            )}
            <button onClick={logout} className="nav-link">Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => handleNavClick('/login')} className="nav-link">Login</button>
            <button onClick={() => handleNavClick('/register')} className="nav-link">Register</button>
            <button onClick={() => handleNavClick('/admin-login')} className="nav-link">Admin Login</button>
          </>
        )}
        <button onClick={() => handleNavClick('/about')} className="nav-link">About Us</button>
        <button onClick={() => handleNavClick('/contact')} className="nav-link">Contact</button>
      </div>
    </nav>
  );
};

export default Navbar;
