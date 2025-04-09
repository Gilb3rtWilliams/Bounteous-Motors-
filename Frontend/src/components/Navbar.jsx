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
        <img src={logo} alt="Bounteous Motors logo" className="logo" style={{ width: '50px', height: '50px' }} />
        <button 
          onClick={() => handleNavClick('/')} 
          className="brand-name"
          aria-label="Home"
        >
          BOUNTEOUS MOTORS
        </button>
        <button
          className="hamburger-button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
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
