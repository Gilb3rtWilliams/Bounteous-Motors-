import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import '../css/ManageNegotiations.css';
import {
  FaHandshake, FaSearch, FaFilter, FaSort,
  FaCheckCircle, FaClock, FaTimesCircle, FaEye,
  FaComment, FaMoneyBillWave, FaHistory, FaChartLine
} from 'react-icons/fa';

const ManageNegotiations = () => {
  const [negotiations] = useState([
    {
      id: "NEG-2025-001",
      car: {
        make: "Rolls-Royce",
        model: "Phantom",
        year: 2024,
        listPrice: 685000,
        image: "/images/cars/rr-phantom.jpg"
      },
      buyer: {
        name: "James Wilson",
        email: "james.wilson@email.com",
        phone: "+1 (555) 123-4567",
        avatar: "/images/avatars/james.jpg"
      },
      status: "Active",
      initialOffer: 650000,
      currentOffer: 670000,
      counterOffer: 680000,
      lastUpdated: "2025-03-30",
      startDate: "2025-03-28",
      messages: 8,
      history: [
        {
          type: "offer",
          amount: 650000,
          date: "2025-03-28",
          party: "buyer"
        },
        {
          type: "counter",
          amount: 682000,
          date: "2025-03-29",
          party: "seller"
        },
        {
          type: "offer",
          amount: 670000,
          date: "2025-03-30",
          party: "buyer"
        },
        {
          type: "counter",
          amount: 680000,
          date: "2025-03-30",
          party: "seller"
        }
      ]
    },
    {
      id: "NEG-2025-002",
      car: {
        make: "Bentley",
        model: "Continental GT",
        year: 2024,
        listPrice: 245000,
        image: "/images/cars/bentley-gt.jpg"
      },
      buyer: {
        name: "Sarah Chen",
        email: "sarah.chen@email.com",
        phone: "+1 (555) 234-5678",
        avatar: "/images/avatars/sarah.jpg"
      },
      status: "Pending",
      initialOffer: 230000,
      currentOffer: 230000,
      counterOffer: null,
      lastUpdated: "2025-03-30",
      startDate: "2025-03-30",
      messages: 2,
      history: [
        {
          type: "offer",
          amount: 230000,
          date: "2025-03-30",
          party: "buyer"
        }
      ]
    },
    {
      id: "NEG-2025-003",
      car: {
        make: "Ferrari",
        model: "SF90 Stradale",
        year: 2024,
        listPrice: 785000,
        image: "/images/cars/ferrari-sf90.jpg"
      },
      buyer: {
        name: "Michael Brown",
        email: "michael.brown@email.com",
        phone: "+1 (555) 345-6789",
        avatar: "/images/avatars/michael.jpg"
      },
      status: "Completed",
      initialOffer: 750000,
      currentOffer: 765000,
      counterOffer: 765000,
      lastUpdated: "2025-03-25",
      startDate: "2025-03-20",
      messages: 12,
      history: [
        {
          type: "offer",
          amount: 750000,
          date: "2025-03-20",
          party: "buyer"
        },
        {
          type: "counter",
          amount: 775000,
          date: "2025-03-22",
          party: "seller"
        },
        {
          type: "offer",
          amount: 765000,
          date: "2025-03-24",
          party: "buyer"
        },
        {
          type: "accept",
          amount: 765000,
          date: "2025-03-25",
          party: "seller"
        }
      ]
    }
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <FaCheckCircle className="status-icon completed" />;
      case "Active":
        return <FaClock className="status-icon active" />;
      case "Pending":
        return <FaTimesCircle className="status-icon pending" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status) => {
    return status.toLowerCase();
  };

  const formatCurrency = (amount) => {
    return `$${amount.toLocaleString()}`;
  };

  return (
    <div className="manage-negotiations-page">
      <Navbar />
      <div className="negotiations-container">
        <Sidebar />
        <main className="negotiations-main">
          <div className="negotiations-header">
            <h1>Manage Negotiations</h1>
            <div className="negotiation-stats">
              <div className="stat-card">
                <FaHandshake className="stat-icon" />
                <div className="stat-content">
                  <span className="stat-value">18</span>
                  <span className="stat-label">Total Negotiations</span>
                </div>
              </div>
              <div className="stat-card">
                <FaCheckCircle className="stat-icon" />
                <div className="stat-content">
                  <span className="stat-value">12</span>
                  <span className="stat-label">Completed</span>
                </div>
              </div>
              <div className="stat-card">
                <FaClock className="stat-icon" />
                <div className="stat-content">
                  <span className="stat-value">4</span>
                  <span className="stat-label">Active</span>
                </div>
              </div>
              <div className="stat-card">
                <FaChartLine className="stat-icon" />
                <div className="stat-content">
                  <span className="stat-value">85%</span>
                  <span className="stat-label">Success Rate</span>
                </div>
              </div>
            </div>
          </div>

          <div className="negotiations-controls">
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search negotiations by ID, buyer name, or car details..."
              />
            </div>
            <div className="filters">
              <button className="filter-btn">
                <FaFilter />
                Filter
              </button>
              <select className="status-filter">
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
              <select className="sort-filter">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
              </select>
            </div>
          </div>

          <div className="negotiations-grid">
            {negotiations.map(negotiation => (
              <div key={negotiation.id} className={`negotiation-card ${getStatusClass(negotiation.status)}`}>
                <div className="card-header">
                  <div className="car-info">
                    <img src={negotiation.car.image} alt={`${negotiation.car.make} ${negotiation.car.model}`} />
                    <div>
                      <h3>{negotiation.car.year} {negotiation.car.make} {negotiation.car.model}</h3>
                      <span className="list-price">List Price: {formatCurrency(negotiation.car.listPrice)}</span>
                    </div>
                  </div>
                  <div className="status-badge">
                    {getStatusIcon(negotiation.status)}
                    <span>{negotiation.status}</span>
                  </div>
                </div>

                <div className="negotiation-details">
                  <div className="buyer-info">
                    <img src={negotiation.buyer.avatar} alt={negotiation.buyer.name} className="buyer-avatar" />
                    <div>
                      <h4>{negotiation.buyer.name}</h4>
                      <span>{negotiation.buyer.email}</span>
                    </div>
                  </div>

                  <div className="offer-details">
                    <div className="offer-item">
                      <span className="label">Initial Offer</span>
                      <span className="value">{formatCurrency(negotiation.initialOffer)}</span>
                      <span className="difference negative">
                        {((negotiation.initialOffer - negotiation.car.listPrice) / negotiation.car.listPrice * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="offer-item">
                      <span className="label">Current Offer</span>
                      <span className="value">{formatCurrency(negotiation.currentOffer)}</span>
                      <span className="difference">
                        {((negotiation.currentOffer - negotiation.car.listPrice) / negotiation.car.listPrice * 100).toFixed(1)}%
                      </span>
                    </div>
                    {negotiation.counterOffer && (
                      <div className="offer-item">
                        <span className="label">Counter Offer</span>
                        <span className="value">{formatCurrency(negotiation.counterOffer)}</span>
                        <span className="difference">
                          {((negotiation.counterOffer - negotiation.car.listPrice) / negotiation.car.listPrice * 100).toFixed(1)}%
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="negotiation-timeline">
                    <div className="timeline-header">
                      <span>Negotiation History</span>
                      <span>{negotiation.history.length} events</span>
                    </div>
                    <div className="timeline-events">
                      {negotiation.history.map((event, index) => (
                        <div key={index} className={`timeline-event ${event.party}`}>
                          <div className="event-icon">
                            {event.type === 'offer' && <FaMoneyBillWave />}
                            {event.type === 'counter' && <FaHandshake />}
                            {event.type === 'accept' && <FaCheckCircle />}
                          </div>
                          <div className="event-details">
                            <span className="event-amount">{formatCurrency(event.amount)}</span>
                            <span className="event-date">{event.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="card-actions">
                    <button className="action-btn view">
                      <FaEye />
                      View Details
                    </button>
                    <button className="action-btn message">
                      <FaComment />
                      Messages ({negotiation.messages})
                    </button>
                    {negotiation.status !== "Completed" && (
                      <button className="action-btn counter">
                        <FaHandshake />
                        Make Counter Offer
                      </button>
                    )}
                    <button className="action-btn history">
                      <FaHistory />
                      Full History
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ManageNegotiations;
