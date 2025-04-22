import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Footer.css';

// Import social media icons
import facebookIcon from '../assets/social-icons/facebook.png';
import twitterIcon from '../assets/social-icons/twitter.png';
import instagramIcon from '../assets/social-icons/instagram.png';
import linkedinIcon from '../assets/social-icons/linkedin.png';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>Bounteous Motors is your trusted partner in finding the perfect vehicle. We provide a seamless platform for buying, selling, and trading cars.</p>
        </div>

        <div className="footer-section">
          <h3>Contact Info</h3>
          <ul>
            <li>📍 Roaster, Thika Rd Nairobi, Kenya</li>
            <li>📞 +254 722 123456</li>
            <li>✉️ info@bounteousmotors.com</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Connect With Us</h3>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our Facebook page">
              <img src={facebookIcon} alt="Facebook" className="social-icon" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our Twitter page">
              <img src={twitterIcon} alt="Twitter" className="social-icon" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our Instagram page">
              <img src={instagramIcon} alt="Instagram" className="social-icon" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our LinkedIn page">
              <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="copyright">&copy; {new Date().getFullYear()} Bounteous Motors. All rights reserved.</p>
          <div className="footer-bottom-links">
            <button onClick={() => navigate('/privacy')} className="footer-link">Privacy Policy</button>
            <span className="footer-separator">•</span>
            <button onClick={() => navigate('/terms')} className="footer-link">Terms & Conditions</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
