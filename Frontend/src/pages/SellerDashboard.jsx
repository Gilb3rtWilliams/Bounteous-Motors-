import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import '../css/SellerDashboard.css';
import {
  FaChartLine, FaCar, FaHandshake, FaDollarSign, FaUserFriends,
  FaShippingFast, FaCalendarAlt, FaChartBar, FaExchangeAlt
} from 'react-icons/fa';

const SellerDashboard = () => {
  const stats = {
    totalRevenue: 2850000,
    activeListings: 12,
    pendingOrders: 3,
    activeNegotiations: 5,
    monthlyStats: {
      sales: [280000, 320000, 450000, 380000, 420000, 520000],
      views: [1200, 1500, 1800, 1600, 2000, 2200],
      inquiries: [45, 52, 60, 48, 65, 70]
    }
  };

  const recentActivity = [
    {
      id: 1,
      type: 'order',
      title: 'New Order Received',
      details: 'Order #ORD-2025-001 for Rolls-Royce Phantom',
      timestamp: '2 hours ago',
      icon: <FaShippingFast />
    },
    {
      id: 2,
      type: 'negotiation',
      title: 'Price Negotiation',
      details: 'Counter offer received for Ferrari SF90',
      timestamp: '4 hours ago',
      icon: <FaHandshake />
    },
    {
      id: 3,
      type: 'test_drive',
      title: 'Test Drive Scheduled',
      details: 'Test drive for Porsche 911 GT3 RS',
      timestamp: '6 hours ago',
      icon: <FaCalendarAlt />
    }
  ];

  const formatCurrency = (amount) => {
    return `$${amount.toLocaleString()}`;
  };

  return (
    <div className="seller-dashboard">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />
        <main className="dashboard-main">
          <div className="dashboard-header">
            <h1>Seller Dashboard</h1>
            <div className="date-range">
              <select defaultValue="last30">
                <option value="last7">Last 7 Days</option>
                <option value="last30">Last 30 Days</option>
                <option value="last90">Last 90 Days</option>
              </select>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card revenue">
              <div className="stat-icon">
                <FaDollarSign />
              </div>
              <div className="stat-content">
                <h3>Total Revenue</h3>
                <div className="stat-value">{formatCurrency(stats.totalRevenue)}</div>
                <div className="stat-trend positive">+12.5% vs last month</div>
              </div>
            </div>

            <div className="stat-card listings">
              <div className="stat-icon">
                <FaCar />
              </div>
              <div className="stat-content">
                <h3>Active Listings</h3>
                <div className="stat-value">{stats.activeListings}</div>
                <div className="stat-trend">2 pending approval</div>
              </div>
            </div>

            <div className="stat-card orders">
              <div className="stat-icon">
                <FaShippingFast />
              </div>
              <div className="stat-content">
                <h3>Pending Orders</h3>
                <div className="stat-value">{stats.pendingOrders}</div>
                <div className="stat-trend">5 completed this month</div>
              </div>
            </div>

            <div className="stat-card negotiations">
              <div className="stat-icon">
                <FaHandshake />
              </div>
              <div className="stat-content">
                <h3>Active Negotiations</h3>
                <div className="stat-value">{stats.activeNegotiations}</div>
                <div className="stat-trend">8 closed deals</div>
              </div>
            </div>
          </div>

          <div className="dashboard-grid">
            <div className="dashboard-card sales-chart">
              <div className="card-header">
                <h2>
                  <FaChartLine className="header-icon" />
                  Sales Performance
                </h2>
                <select defaultValue="6months">
                  <option value="3months">Last 3 Months</option>
                  <option value="6months">Last 6 Months</option>
                  <option value="1year">Last Year</option>
                </select>
              </div>
              <div className="chart-container">
                {/* Chart component would go here */}
                <div className="placeholder-chart">
                  {stats.monthlyStats.sales.map((value, index) => (
                    <div 
                      key={index} 
                      className="chart-bar" 
                      style={{ height: `${(value / Math.max(...stats.monthlyStats.sales)) * 100}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="dashboard-card recent-activity">
              <div className="card-header">
                <h2>
                  <FaChartBar className="header-icon" />
                  Recent Activity
                </h2>
                <button className="view-all-btn">View All</button>
              </div>
              <div className="activity-list">
                {recentActivity.map(activity => (
                  <div key={activity.id} className={`activity-item ${activity.type}`}>
                    <div className="activity-icon">{activity.icon}</div>
                    <div className="activity-content">
                      <h3>{activity.title}</h3>
                      <p>{activity.details}</p>
                      <span className="timestamp">{activity.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="dashboard-card performance-metrics">
              <div className="card-header">
                <h2>
                  <FaUserFriends className="header-icon" />
                  Customer Engagement
                </h2>
              </div>
              <div className="metrics-grid">
                <div className="metric-item">
                  <div className="metric-icon">
                    <FaExchangeAlt />
                  </div>
                  <div className="metric-content">
                    <h4>Conversion Rate</h4>
                    <div className="metric-value">8.5%</div>
                    <div className="metric-trend positive">+2.1%</div>
                  </div>
                </div>
                <div className="metric-item">
                  <div className="metric-icon">
                    <FaCalendarAlt />
                  </div>
                  <div className="metric-content">
                    <h4>Avg. Time to Sell</h4>
                    <div className="metric-value">15 days</div>
                    <div className="metric-trend negative">+3 days</div>
                  </div>
                </div>
                <div className="metric-item">
                  <div className="metric-icon">
                    <FaHandshake />
                  </div>
                  <div className="metric-content">
                    <h4>Negotiation Success</h4>
                    <div className="metric-value">75%</div>
                    <div className="metric-trend positive">+5%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default SellerDashboard;
