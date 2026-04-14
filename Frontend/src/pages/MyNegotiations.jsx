import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/MyNegotiations.css';
import { FaComments, FaClock, FaCheckCircle, FaTimesCircle, FaHandshake, FaChartLine } from 'react-icons/fa';

const MyNegotiations = () => {
  const [negotiations] = useState([
    {
      id: "NEG-2025-001",
      car: {
        make: "Ferrari",
        model: "SF90 Stradale",
        year: 2024,
        listPrice: 785000,
        image: "/images/cars/ferrari-sf90.jpg"
      },
      status: "Active",
      startDate: "2025-03-28",
      expiryDate: "2025-04-05",
      initialOffer: 750000,
      currentOffer: 765000,
      counterOffer: 775000,
      history: [
        {
          date: "2025-03-28",
          type: "Buyer",
          amount: 750000,
          message: "Initial offer based on market research"
        },
        {
          date: "2025-03-29",
          type: "Seller",
          amount: 780000,
          message: "Counter-offer considering vehicle condition"
        },
        {
          date: "2025-03-30",
          type: "Buyer",
          amount: 765000,
          message: "Updated offer with financing terms"
        }
      ]
    },
    {
      id: "NEG-2025-002",
      car: {
        make: "Lamborghini",
        model: "Revuelto",
        year: 2024,
        listPrice: 650000,
        image: "/images/cars/lambo-revuelto.jpg"
      },
      status: "Accepted",
      startDate: "2025-03-15",
      completionDate: "2025-03-20",
      initialOffer: 600000,
      finalPrice: 625000,
      history: [
        {
          date: "2025-03-15",
          type: "Buyer",
          amount: 600000,
          message: "Initial offer"
        },
        {
          date: "2025-03-17",
          type: "Seller",
          amount: 640000,
          message: "Counter-offer"
        },
        {
          date: "2025-03-19",
          type: "Buyer",
          amount: 625000,
          message: "Final offer"
        },
        {
          date: "2025-03-20",
          type: "Seller",
          amount: 625000,
          message: "Offer accepted"
        }
      ]
    }
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Active":
        return <FaClock className="status-icon active" />;
      case "Accepted":
        return <FaCheckCircle className="status-icon accepted" />;
      case "Rejected":
        return <FaTimesCircle className="status-icon rejected" />;
      case "Expired":
        return <FaClock className="status-icon expired" />;
      default:
        return null;
    }
  };

  const formatPrice = (price) => {
    return `$${price.toLocaleString()}`;
  };

  return (
    <div className="my-negotiations-page">
      <Navbar />
      <main className="negotiations-main">
        <div className="negotiations-header">
          <div className="header-content">
            <h1>My Negotiations</h1>
            <div className="stats-container">
              <div className="stat-item">
                <FaHandshake className="stat-icon" />
                <div className="stat-content">
                  <span className="stat-value">2</span>
                  <span className="stat-label">Active Negotiations</span>
                </div>
              </div>
              <div className="stat-item">
                <FaChartLine className="stat-icon" />
                <div className="stat-content">
                  <span className="stat-value">$40K</span>
                  <span className="stat-label">Average Savings</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="negotiations-container">
          {negotiations.map(negotiation => (
            <div key={negotiation.id} className="negotiation-card">
              <div className="car-preview">
                <img src={negotiation.car.image} alt={`${negotiation.car.make} ${negotiation.car.model}`} />
                <div className="negotiation-status">
                  {getStatusIcon(negotiation.status)}
                  <span>{negotiation.status}</span>
                </div>
              </div>

              <div className="negotiation-details">
                <div className="details-header">
                  <div className="car-info">
                    <h2>{negotiation.car.year} {negotiation.car.make} {negotiation.car.model}</h2>
                    <span className="negotiation-id">#{negotiation.id}</span>
                  </div>
                  <div className="price-summary">
                    <div className="price-item">
                      <span className="label">List Price</span>
                      <span className="value">{formatPrice(negotiation.car.listPrice)}</span>
                    </div>
                    <div className="price-item highlight">
                      <span className="label">
                        {negotiation.status === "Accepted" ? "Final Price" : "Current Offer"}
                      </span>
                      <span className="value">
                        {formatPrice(negotiation.status === "Accepted" ? 
                          negotiation.finalPrice : 
                          negotiation.currentOffer)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="negotiation-timeline">
                  <h3>Negotiation History</h3>
                  <div className="timeline">
                    {negotiation.history.map((event, index) => (
                      <div key={index} className={`timeline-item ${event.type.toLowerCase()}`}>
                        <div className="timeline-content">
                          <div className="event-header">
                            <span className="event-type">{event.type}</span>
                            <span className="event-date">{event.date}</span>
                          </div>
                          <div className="event-amount">{formatPrice(event.amount)}</div>
                          <p className="event-message">{event.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {negotiation.status === "Active" && (
                  <div className="negotiation-actions">
                    <div className="offer-input">
                      <input 
                        type="number" 
                        placeholder="Enter your counter offer"
                        step="1000"
                      />
                      <button className="primary-btn">Submit Counter Offer</button>
                    </div>
                    <button className="secondary-btn">Cancel Negotiation</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyNegotiations;
