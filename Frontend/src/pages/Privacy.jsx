import React from 'react';
import '../css/Privacy.css';

const Privacy = () => {
  return (
    <div className="privacy-page">
      <div className="privacy-container">
        <div className="privacy-header">
          <h1>Privacy Policy</h1>
        </div>

        <div className="privacy-section">
          <h2>1. Information We Collect</h2>
          <p>At Bounteous Motors, we collect the following types of information:</p>
          <ul>
            <li>Personal Information (name, email, phone number)</li>
            <li>Account Information (username, password)</li>
            <li>Vehicle Information (listings, photos, descriptions)</li>
            <li>Transaction Data (offers, communications)</li>
            <li>Usage Data (browsing patterns, preferences)</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2>2. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Facilitate vehicle transactions</li>
            <li>Improve our services</li>
            <li>Communicate important updates</li>
            <li>Ensure platform security</li>
            <li>Provide customer support</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2>3. Information Sharing</h2>
          <p>We may share your information with:</p>
          <ul>
            <li>Other users (for transaction purposes)</li>
            <li>Service providers (payment processors, hosting services)</li>
            <li>Legal authorities (when required by law)</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2>4. Data Security</h2>
          <p>We protect your data through:</p>
          <ul>
            <li>Encryption of sensitive information</li>
            <li>Regular security audits</li>
            <li>Access controls and authentication</li>
            <li>Secure data storage practices</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2>5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Request data correction</li>
            <li>Delete your account</li>
            <li>Opt-out of marketing communications</li>
            <li>Export your data</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2>6. Cookies and Tracking</h2>
          <p>We use cookies and similar technologies to:</p>
          <ul>
            <li>Remember your preferences</li>
            <li>Analyze site usage</li>
            <li>Enhance user experience</li>
            <li>Provide personalized content</li>
          </ul>
        </div>

        <p className="last-updated">Last updated: April 8, 2025</p>
      </div>
    </div>
  );
};

export default Privacy;
