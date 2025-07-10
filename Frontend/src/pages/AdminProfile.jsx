import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserShield, FaEnvelope, FaKey, FaCheck } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';
import Navbar from '../components/Navbar';
import AdminSlideshow from '../components/AdminSlideshow';
import Footer from '../components/Footer';
import avatarPlaceholder from '../assets/avatar-placeholder.png';
import '../css/Profile.css';

const AdminProfile = () => {
  const { user, updateProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate(user ? '/' : '/admin/login');
      return;
    }

    setFormData(prev => ({
      ...prev,
      name: user.name || '',
      email: user.email || ''
    }));
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    if (formData.newPassword || formData.confirmNewPassword) {
      if (formData.newPassword !== formData.confirmNewPassword) {
        return setMessage({ text: 'Passwords do not match.', type: 'error' });
      }
      if (!formData.currentPassword) {
        return setMessage({ text: 'Current password required.', type: 'error' });
      }
    }

    try {
      const result = await updateProfile({
        name: formData.name,
        email: formData.email,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });

      if (result.success) {
        setMessage({ text: 'Profile updated successfully ✔️', type: 'success' });
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: ''
        }));
      } else {
        setMessage({ text: result.message || 'Update failed ❌', type: 'error' });
      }
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || err.message || 'Update error',
        type: 'error'
      });
    }
  };

  return (
    <div className="profile-page">
      <Navbar />
      <AdminSlideshow />
      <div className="dashboard-container animate-fade-in">
        {/* Admin Header */}
        <div className="dashboard-header profile-summary">
          <img src={avatarPlaceholder} alt="Admin Avatar" className="profile-avatar" />
          <div>
            <h1 className="gradient-text">{user?.name}</h1>
            <p className="welcome-subtitle">{user?.email}</p>
            <span className="user-role-badge">Admin</span>
          </div>
        </div>

        <div className="glass-card form-card">
          <h2><FaUserShield /> Admin Settings</h2>

          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

          <form className="profile-form" onSubmit={handleSubmit}>
            {/* Personal Info */}
            <div className="form-group">
              <label><FaUserShield /> Full Name</label>
              <input name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label><FaEnvelope /> Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <hr className="divider" />
            <h3><FaKey /> Change Password</h3>

            <div className="form-group">
              <label>Current Password</label>
              <input type="password" name="currentPassword" value={formData.currentPassword} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Confirm New Password</label>
              <input type="password" name="confirmNewPassword" value={formData.confirmNewPassword} onChange={handleChange} />
            </div>

            <button type="submit" className="save-button">
              <FaCheck /> Update Profile
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminProfile;
