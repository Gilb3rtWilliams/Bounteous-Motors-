import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/Notifications.css';
import { 
  FaBell, FaCar, FaHandshake, FaShippingFast, FaCalendarAlt, 
  FaExchangeAlt, FaCheckCircle, FaInfoCircle, FaExclamationCircle 
} from 'react-icons/fa';

const Notifications = () => {
  const [notifications] = useState([
    {
      id: "NOTIF-2025-001",
      type: "order",
      title: "Order Status Update",
      message: "Your Rolls-Royce Phantom has been shipped and is en route to delivery.",
      timestamp: "2025-04-01 14:30",
      priority: "high",
      read: false,
      action: {
        label: "Track Order",
        link: "/orders/ORD-2025-001"
      },
      icon: <FaShippingFast />
    },
    {
      id: "NOTIF-2025-002",
      type: "negotiation",
      title: "New Counter Offer",
      message: "Seller has responded to your offer on the Ferrari SF90 Stradale.",
      timestamp: "2025-04-01 12:15",
      priority: "medium",
      read: false,
      action: {
        label: "View Offer",
        link: "/negotiations/NEG-2025-001"
      },
      icon: <FaHandshake />
    },
    {
      id: "NOTIF-2025-003",
      type: "test_drive",
      title: "Test Drive Confirmation",
      message: "Your test drive for the Porsche 911 GT3 RS is confirmed for April 15th, 10:00 AM.",
      timestamp: "2025-03-31 16:45",
      priority: "medium",
      read: true,
      action: {
        label: "View Details",
        link: "/test-drives/TD-2025-001"
      },
      icon: <FaCalendarAlt />
    },
    {
      id: "NOTIF-2025-004",
      type: "trade_in",
      title: "Trade-In Approved",
      message: "Your BMW M5 trade-in request has been approved. View the offer details.",
      timestamp: "2025-03-31 11:20",
      priority: "high",
      read: true,
      action: {
        label: "View Offer",
        link: "/trade-ins/TI-2025-001"
      },
      icon: <FaExchangeAlt />
    }
  ]);

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "high":
        return <FaExclamationCircle className="priority-icon high" />;
      case "medium":
        return <FaInfoCircle className="priority-icon medium" />;
      case "low":
        return <FaCheckCircle className="priority-icon low" />;
      default:
        return null;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "order":
        return "var(--color-order)";
      case "negotiation":
        return "var(--color-negotiation)";
      case "test_drive":
        return "var(--color-test-drive)";
      case "trade_in":
        return "var(--color-trade-in)";
      default:
        return "#fff";
    }
  };

  return (
    <div className="notifications-page">
      <Navbar />
      <main className="notifications-main">
        <div className="notifications-header">
          <div className="header-content">
            <h1>
              <FaBell className="header-icon" />
              Notifications
            </h1>
            <div className="notification-stats">
              <div className="stat-item">
                <span className="stat-value">2</span>
                <span className="stat-label">Unread</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">4</span>
                <span className="stat-label">Total</span>
              </div>
            </div>
          </div>
          <div className="header-actions">
            <button className="mark-all-btn">Mark All as Read</button>
            <select className="filter-select">
              <option value="all">All Notifications</option>
              <option value="unread">Unread</option>
              <option value="order">Orders</option>
              <option value="negotiation">Negotiations</option>
              <option value="test_drive">Test Drives</option>
              <option value="trade_in">Trade-Ins</option>
            </select>
          </div>
        </div>

        <div className="notifications-container">
          {notifications.map(notification => (
            <div 
              key={notification.id} 
              className={`notification-card ${notification.read ? 'read' : 'unread'}`}
            >
              <div className="notification-icon" style={{ backgroundColor: getTypeColor(notification.type) }}>
                {notification.icon}
              </div>
              
              <div className="notification-content">
                <div className="notification-header">
                  <h2>{notification.title}</h2>
                  {getPriorityIcon(notification.priority)}
                </div>
                <p className="notification-message">{notification.message}</p>
                <div className="notification-footer">
                  <span className="timestamp">{notification.timestamp}</span>
                  <button className="action-btn">
                    {notification.action.label}
                  </button>
                </div>
              </div>

              <div className="notification-actions">
                <button className="icon-btn mark-read">
                  <FaCheckCircle />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Notifications;
