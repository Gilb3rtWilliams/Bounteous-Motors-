import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Dashboard.css';
import AuthContext from '../context/AuthContext';
import CustomerSlideshow from '../components/CustomerSlideshow';
import Watchlist from '../components/Watchlist';
import useTypingEffect from '../hooks/useTypingEffect'; // Import the custom hook

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [userStats, setUserStats] = useState({
    buyingStats: {
      totalPurchases: 0,
      pendingPurchases: 0,
      savedCars: 0,
    },
    sellingStats: {
      activeListing: 0,
      soldCars: 0,
      pendingDeals: 0,
    },
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`/api/users/${user.id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch user profile');
        const data = await response.json();
        setUserStats(data.stats);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, [user.id, user.token]);

  const customerActions = [
    {
      title: 'Order a Car',
      description: 'Order a car and schedule test drives',
      icon: '/images/icons/order.png',
      link: 'order-car',
    },
    {
      title: 'Schedule Test Drive',
      description: 'Schedule a test drive with a car seller',
      icon: '/images/icons/test-drive.png',
      link: 'schedule-test-drive',
    },
    {
      title: 'Trade in a Car',
      description: 'Trade in your car for a new one',
      icon: '/images/icons/trade-in.png',
      link: 'trade-in',
    },
    {
      title: 'View Notifications',
      description: 'Notifications from sellers',
      icon: '/images/icons/notifications.png',
      link: 'notifications',
    },
    {
      title: 'Post a Car for Sale',
      description: 'List your own car for sale',
      icon: '/images/icons/add-car.png',
      link: 'post-car',
    },
    {
      title: 'Manage Orders',
      description: 'Track and manage orders of your posted cars',
      icon: '/images/icons/orders.png',
      link: 'my-orders',
    },
    {
      title: 'Manage Negotiations',
      description: 'View and manage incoming offers',
      icon: '/images/icons/manage-negotiations.png',
      link: 'manage-negotiations',
    },
    {
      title: 'View Negotiations',
      description: 'View offers made to your listings',
      icon: '/images/icons/negotiations.png',
      link: 'negotiations',
    },
  ];

  const welcomeSubtitle = useTypingEffect("Here's your Bounteous Motors activity summary", 60);

  return (
    <div className="admin-dashboard">
      <CustomerSlideshow />

      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome back, {user?.name || 'User'}!</h1>
          <p className="welcome-subtitle">{welcomeSubtitle}</p>
        </div>
      </div>

      <section className="stats-overview">
        <div className="stat-card">
          <h3>Total Purchases</h3>
          <p>{userStats.buyingStats.totalPurchases}</p>
        </div>
        <div className="stat-card">
          <h3>Active Listings</h3>
          <p>{userStats.sellingStats.activeListing}</p>
        </div>
        <div className="stat-card">
          <h3>Cars Sold</h3>
          <p>{userStats.sellingStats.soldCars}</p>
        </div>
        <div className="stat-card">
          <h3>Saved Cars</h3>
          <p>{userStats.buyingStats.savedCars}</p>
        </div>
      </section>

      <section className="admin-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          {customerActions.map((action, index) => (
            <div
              key={index}
              className="action-card"
              onClick={() => navigate(`/${action.link}`)}
            >
              <img src={action.icon} alt={action.title} className="action-icon-image" />
              <h3>{action.title}</h3>
              <p>{action.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="recent-activity">
        <h2>My Watchlist</h2>
        <div className="activity-list">
          <Watchlist userId={user?.id} />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
