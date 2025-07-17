import React, { useEffect, useState, useContext } from 'react';
import axiosInstance from '../api/axios';
import AuthContext from '../context/AuthContext';
import AdminSlideshow from '../components/AdminSlideshow';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/Notifications.css'; // ✅ Use the same CSS as ViewNotifications
import {
  FaBell, FaCheckCircle, FaInfoCircle, FaExclamationCircle,
  FaShippingFast, FaHandshake, FaCalendarAlt, FaExchangeAlt
} from 'react-icons/fa';

const AdminNotifications = () => {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

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
        console.error('❌ Error fetching admin notifications:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [user.token]);

  const markAllAsRead = async () => {
    try {
      const unread = notifications.filter(n => !n.isRead);
      await Promise.all(
        unread.map(n =>
          axiosInstance.put(`/notifications/${n._id}/read`, {}, {
            headers: { Authorization: `Bearer ${user.token}` }
          })
        )
      );
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    } catch (err) {
      console.error('Error marking admin notifications as read:', err);
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "high": return <FaExclamationCircle className="priority-icon high" />;
      case "medium": return <FaInfoCircle className="priority-icon medium" />;
      case "low": return <FaCheckCircle className="priority-icon low" />;
      default: return null;
    }
  };

  const getIconByType = (type) => {
    switch (type) {
      case 'car_listing_approved': return <FaCheckCircle />;
      case 'car_listing_rejected': return <FaExclamationCircle />;
      case 'order': return <FaShippingFast />;
      case 'negotiation': return <FaHandshake />;
      case 'test_drive': return <FaCalendarAlt />;
      case 'trade_in': return <FaExchangeAlt />;
      default: return <FaBell />;
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.isRead;
    return notif.type === filter;
  });

  return (
    <div className="notifications-page">
      <Navbar />
      <AdminSlideshow />
      <main className="notifications-main">
        <div className="notifications-header">
          <div className="header-content">
            <h1>
              <FaBell className="header-icon" />
              Admin Notifications
            </h1>
            <div className="notification-stats">
              <div className="stat-item">
                <span className="stat-value">{notifications.filter(n => !n.isRead).length}</span>
                <span className="stat-label">Unread</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{notifications.length}</span>
                <span className="stat-label">Total</span>
              </div>
            </div>
          </div>
          <div className="header-actions">
            <button className="mark-all-btn" onClick={markAllAsRead}>
              Mark All as Read
            </button>
            <select className="filter-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All Notifications</option>
              <option value="unread">Unread</option>
              <option value="order">Orders</option>
              <option value="negotiation">Negotiations</option>
              <option value="test_drive">Test Drives</option>
              <option value="trade_in">Trade-Ins</option>
              <option value="car_listing_rejected">Rejected Listings</option>
              <option value="car_listing_approved">Approved Listings</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p className="loading-msg">Loading notifications...</p>
        ) : (
          <div className="notifications-container">
            {filteredNotifications.length === 0 ? (
              <p className="no-notifications">No notifications to display.</p>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification._id}
                  className={`notification-card ${notification.isRead ? 'read' : 'unread'}`}
                >
                  <div className="notification-icon">
                    {getIconByType(notification.type)}
                  </div>

                  <div className="notification-content">
                    <div className="notification-header">
                      <h2>{notification.message}</h2>
                      {getPriorityIcon(notification.priority)}
                    </div>

                    {/* Extra: Show related car info */}
                    {notification.car && (
                      <p className="notification-message">
                        Related to car: {notification.car.year} {notification.car.brand} {notification.car.model}
                      </p>
                    )}

                    <div className="notification-footer">
                      <span className="timestamp">
                        {new Date(notification.createdAt).toLocaleString()}
                      </span>
                      {notification.action?.label && notification.action?.link && (
                        <a className="action-btn" href={notification.action.link}>
                          {notification.action.label}
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="notification-actions">
                    {!notification.isRead && (
                      <button
                        className="icon-btn mark-read"
                        onClick={async () => {
                          await axiosInstance.put(`/notifications/${notification._id}/read`, {}, {
                            headers: { Authorization: `Bearer ${user.token}` }
                          });
                          setNotifications(prev =>
                            prev.map(n => n._id === notification._id ? { ...n, isRead: true } : n)
                          );
                        }}
                      >
                        <FaCheckCircle />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdminNotifications;
