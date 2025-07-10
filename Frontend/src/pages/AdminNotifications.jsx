import React, { useEffect, useState, useContext } from 'react';
import axiosInstance from '../api/axios';
import AuthContext from '../context/AuthContext';
import AdminSlideshow from '../components/AdminSlideshow';
import Navbar from '../components/Navbar';
import '../css/Notifications.css';
import {
  FaBell, FaExclamationCircle, FaInfoCircle, FaCheckCircle
} from 'react-icons/fa';

const AdminNotifications = () => {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get('/notifications', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        const adminOnly = response.data.filter(n => n.recipientRole === 'admin');
        setNotifications(adminOnly);

      } catch (err) {
        console.error('❌ Error fetching notifications:', err);
      } finally {
        setLoading(false);
      }
    };


    fetchNotifications();
  }, [user.token]);

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return <FaExclamationCircle className="icon high" />;
      case 'medium': return <FaInfoCircle className="icon medium" />;
      case 'low': return <FaCheckCircle className="icon low" />;
      default: return null;
    }
  };

  return (
    <div className="admin-notifications-page">
      <Navbar />
      <AdminSlideshow />
      <div className="admin-notifications-container">
        <h1><FaBell /> Admin Notifications</h1>

        {loading ? (
          <p className="loading">Loading notifications...</p>
        ) : notifications.length === 0 ? (
          <p className="no-notifications">No notifications found.</p>
        ) : (
          <div className="notifications-list">
            {notifications.map((n) => (
              <div key={n._id} className={`notification-card ${n.isRead ? 'read' : 'unread'}`}>
                <div className="notification-header">
                  <h2>{n.title}</h2>
                  {getPriorityIcon(n.priority)}
                </div>
                <p className="message">{n.message}</p>
                <span className="timestamp">{new Date(n.createdAt).toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNotifications;
