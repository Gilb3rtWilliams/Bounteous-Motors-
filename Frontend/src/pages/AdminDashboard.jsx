import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AdminDashboard.css';
import AdminSlideshow from '../components/AdminSlideshow';
import AuthContext from '../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats] = useState({
    totalUsers: 150,
    activeListings: 45,
    pendingApprovals: 12,
    totalTransactions: 89
  });

  const [recentActivity] = useState([
    { id: 1, type: 'New Listing', user: 'John Doe', time: '2 hours ago', status: 'Pending' },
    { id: 2, type: 'Purchase', user: 'Jane Smith', time: '3 hours ago', status: 'Completed' },
    { id: 3, type: 'User Registration', user: 'Mike Johnson', time: '5 hours ago', status: 'Completed' }
  ]);

  const adminActions = [
    {
      title: 'Add Car Listing',
      description: 'Add a new car to the listings',
      icon: '🚘',
      action: () => navigate('/admin/add-car')
    },
    {
      title: 'Manage Users',
      description: 'View and manage user accounts',
      icon: '👥',
      action: () => console.log('Navigate to user management')
    },
    {
      title: 'Review Listings',
      description: 'Review and approve car listings',
      icon: '🚗',
      action: () => console.log('Navigate to listings review')
    },
    {
      title: 'Manage Car Deliveries',
      description: 'View and manage car deliveries',
      icon: '🚚',
      action: () => console.log('Navigate to car deliveries')
    },
    {
      title: 'Transaction History',
      description: 'View all transaction records',
      icon: '💰',
      action: () => console.log('Navigate to transactions')
    },
    {
      title: 'System Settings',
      description: 'Configure system parameters',
      icon: '⚙️',
      action: () => console.log('Navigate to settings')
    }
  ];

  return (
    <div className="admin-dashboard">
      <AdminSlideshow />
      
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome back, {user?.name || 'Admin'}!</h1>
          <p className="welcome-subtitle">Here's what's happening at Bounteous Motors today</p>
        </div>
      </div>

      <section className="stats-overview">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Active Listings</h3>
          <p>{stats.activeListings}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Approvals</h3>
          <p>{stats.pendingApprovals}</p>
        </div>
        <div className="stat-card">
          <h3>Total Transactions</h3>
          <p>{stats.totalTransactions}</p>
        </div>
      </section>

      <section className="admin-actions">
        <h2>Admin Actions</h2>
        <div className="actions-grid">
          {adminActions.map((action, index) => (
            <div key={index} className="action-card" onClick={action.action}>
              <span className="action-icon">{action.icon}</span>
              <h3>{action.title}</h3>
              <p>{action.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="activity-item">
              <div className="activity-icon">
                {activity.type === 'New Listing' ? '🚗' : 
                 activity.type === 'Purchase' ? '💰' : '👤'}
              </div>
              <div className="activity-details">
                <h4>{activity.type}</h4>
                <p>By {activity.user}</p>
                <span className="activity-time">{activity.time}</span>
              </div>
              <div className={`activity-status ${activity.status.toLowerCase()}`}>
                {activity.status}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
