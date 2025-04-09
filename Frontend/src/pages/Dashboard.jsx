import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Dashboard.css';
import AuthContext from '../context/AuthContext';
import CustomerSlideshow from '../components/CustomerSlideshow';
import Watchlist from '../components/Watchlist';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [userStats] = useState({
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
    // TODO: Fetch user profile and stats from backend
    // This will be implemented once the backend endpoints are updated
  }, []);

  const navigationCards = [
    {
      title: 'Buy Cars',
      description: 'Browse available cars and make purchases',
      link: 'cars',
      icon: '🚗'
    },
    {
      title: 'Sell Cars',
      description: 'List your cars for sale',
      link: 'services',
      icon: '💰'
    },
    {
      title: 'My Listings',
      description: 'Manage your car listings',
      link: 'my-listings',
      icon: '📋'
    },
    {
      title: 'Purchase History',
      description: 'View your purchase history',
      link: 'purchase-history',
      icon: '📜'
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
