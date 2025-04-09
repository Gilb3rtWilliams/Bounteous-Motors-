import React from 'react';
import '../css/Terms.css';

const Terms = () => {
  return (
    <div className="terms-page">
      <div className="terms-container">
        <div className="terms-header">
          <h1>Terms and Conditions</h1>
        </div>

        <div className="terms-section">
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using Bounteous Motors' services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services.</p>
        </div>

        <div className="terms-section">
          <h2>2. User Accounts</h2>
          <p>When creating an account on Bounteous Motors, you agree to:</p>
          <ul>
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your account credentials</li>
            <li>Promptly update any changes to your account information</li>
            <li>Accept responsibility for all activities under your account</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>3. Vehicle Listings</h2>
          <p>When listing a vehicle for sale, you must:</p>
          <ul>
            <li>Provide accurate information about the vehicle</li>
            <li>Include clear and recent photographs</li>
            <li>Disclose any known issues or defects</li>
            <li>Set fair and transparent pricing</li>
            <li>Respond promptly to inquiries from potential buyers</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>4. Transactions</h2>
          <p>Bounteous Motors serves as a platform connecting buyers and sellers. We:</p>
          <ul>
            <li>Do not guarantee the completion of any transaction</li>
            <li>Recommend conducting thorough vehicle inspections</li>
            <li>Advise using secure payment methods</li>
            <li>Encourage documentation of all agreements</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>5. Prohibited Activities</h2>
          <p>Users are prohibited from:</p>
          <ul>
            <li>Posting fraudulent listings</li>
            <li>Harassing other users</li>
            <li>Manipulating prices or market conditions</li>
            <li>Violating any applicable laws or regulations</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>6. Limitation of Liability</h2>
          <p>Bounteous Motors is not liable for:</p>
          <ul>
            <li>The condition of vehicles listed</li>
            <li>Disputes between buyers and sellers</li>
            <li>Loss or damage during transactions</li>
            <li>Technical issues or service interruptions</li>
          </ul>
        </div>

        <p className="last-updated">Last updated: April 8, 2025</p>
      </div>
    </div>
  );
};

export default Terms;
