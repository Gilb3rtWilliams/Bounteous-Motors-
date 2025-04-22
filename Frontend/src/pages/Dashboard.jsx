import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Dashboard.css';
import AuthContext from '../context/AuthContext';
import CustomerSlideshow from '../components/CustomerSlideshow';
import Watchlist from '../components/Watchlist';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [userStats, setUserStats] = useState({
    buyingStats: {
      totalPurchases: 0,
      pendingPurchases: 0,
      savedCars: 0
    },
    sellingStats: {
      activeListing: 0,
      soldCars: 0,
      pendingDeals: 0
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await fetch(`/api/users/${user.id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }

      const data = await response.json();
      setUserStats(data.stats);
    };

    fetchUserProfile();
  }, [user.id, user.token]);

  const navigationCards = [
    {
      title: 'Order a Car',
      description: 'Order a car and schedule test drives',
      link: 'order-car',
      icon: '🚗'
    },
    {
      title: 'Schedule Test Drive',
      description: 'Schedule a test drive with a car seller',
      link: 'schedule-test-drive',
      icon: '🕰️'
    },
    {
      title: 'Trade in a Car',
      description: 'Trade in your car for a new one',
      link: 'trade-in',
      icon: '🚚'
    },
    {
      title: 'View Negotiations',
      description: 'View and manage negotiations for your posted cars',
      link: 'negotiations',
      icon: '💭'
    },
    {
      title: 'View Notifications',
      description: 'View notifications from car sellers',
      link: 'notifications',
      icon: '📣'
    },
    {
      title: 'Post a Car for Sale',
      description: 'Post a new car for sale',
      link: 'add-listing',
      icon: '📝'
    },
    {
      title: 'Manage Orders',
      description: 'Manage orders for cars you posted',
      link: 'manage-orders',
      icon: '📦'
    },
    {
      title: 'Manage Negotiations',
      description: 'Manage negotiations for cars you posted',
      link: 'manage-negotiations',
      icon: '💬'
    }
  ];
  

  return (
    <div className="dashboard-container">
      <CustomerSlideshow />
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome back, {user?.name || 'User'}!</h1>
          <p className="welcome-subtitle">Your Bounteous Motors Dashboard</p>
        </div>
      </div>

      <section className="stats-overview">
        <div className="stat-card">
          <h3>Total Purchases</h3>
          <p>{userStats.buyingStats.totalPurchases}</p>
          <span className="stat-trend positive">↑ Active Buyer</span>
        </div>
        <div className="stat-card">
          <h3>Active Listings</h3>
          <p>{userStats.sellingStats.activeListing}</p>
          <span className="stat-trend">Current</span>
        </div>
        <div className="stat-card">
          <h3>Cars Sold</h3>
          <p>{userStats.sellingStats.soldCars}</p>
          <span className="stat-trend positive">↑ Good Performance</span>
        </div>
        <div className="stat-card">
          <h3>Saved Cars</h3>
          <p>{userStats.buyingStats.savedCars}</p>
          <span className="stat-trend">Watchlist</span>
        </div>
      </section>

      <section className="admin-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          {navigationCards.map((card, index) => (
            <div 
              key={index} 
              className="action-card"
              onClick={() => navigate(card.link)}
            >
              <span className="action-icon">{card.icon}</span>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="watchlist-section">
        <h2>My Watchlist</h2>
        <Watchlist userId={user?.id} />
      </section>
    </div>
  );
};

export default Dashboard;
