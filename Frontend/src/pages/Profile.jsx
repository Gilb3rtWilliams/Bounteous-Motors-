import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import avatarPlaceholder from '../assets/avatar-placeholder.png';
import '../css/Profile.css';
import CustomerSlideshow from '../components/CustomerSlideShow';

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-page">
      <Navbar />
      <CustomerSlideshow />
      <div className="dashboard-container animate-fade-in">
        {/* Customer Header */}
        <div className="dashboard-header profile-summary">
          <img src={avatarPlaceholder} alt="User Avatar" className="profile-avatar" />
          <div>
            <h1 className="gradient-text">{user.name}</h1>
            <p className="welcome-subtitle">{user.email}</p>
            <span className="user-role-badge">{user.role}</span>
          </div>
        </div>

        {/* User Info Card */}
        <div className="glass-card form-card">
          <h2>User Details</h2>
          <div className="profile-bio-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input value={user.name} readOnly />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input value={user.email} readOnly />
            </div>
            {user.phone && (
              <div className="form-group">
                <label>Phone</label>
                <input value={user.phone} readOnly />
              </div>
            )}
            {user.address && (
              <div className="form-group">
                <label>Address</label>
                <textarea value={user.address} rows="2" readOnly />
              </div>
            )}
            <div className="form-group">
              <label>Account Type</label>
              <input value={user.role} readOnly />
            </div>
            <div className="form-group">
              <label>User ID</label>
              <input value={user.id || user._id} readOnly />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
