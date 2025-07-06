import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/MyTradeIns.css';
import { FaCar, FaExchangeAlt, FaClock, FaCheckCircle, FaTimesCircle, FaCamera } from 'react-icons/fa';

const MyTradeIns = () => {
  const [tradeIns] = useState([
    {
      id: "TI-2025-001",
      car: {
        make: "BMW",
        model: "M5",
        year: 2022,
        mileage: 15000,
        condition: "Excellent",
        images: ["/images/trade-ins/bmw-m5-1.jpg", "/images/trade-ins/bmw-m5-2.jpg"],
        estimatedValue: 85000
      },
      status: "Pending Inspection",
      submissionDate: "2025-03-28",
      inspectionDate: "2025-04-05",
      notes: "Vehicle has full service history, minor scratch on rear bumper",
      documents: ["Service History", "Registration", "Insurance"]
    },
    {
      id: "TI-2025-002",
      car: {
        make: "Mercedes-Benz",
        model: "G63 AMG",
        year: 2023,
        mileage: 8000,
        condition: "Like New",
        images: ["/images/trade-ins/g63-1.jpg", "/images/trade-ins/g63-2.jpg"],
        estimatedValue: 195000
      },
      status: "Approved",
      submissionDate: "2025-03-15",
      inspectionDate: "2025-03-20",
      offerAmount: 190000,
      notes: "Vehicle in pristine condition, all original parts",
      documents: ["Service History", "Registration", "Insurance", "Offer Letter"]
    }
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending Inspection":
        return <FaClock className="status-icon pending" />;
      case "Approved":
        return <FaCheckCircle className="status-icon approved" />;
      case "Rejected":
        return <FaTimesCircle className="status-icon rejected" />;
      default:
        return null;
    }
  };

  return (
    <div className="my-trade-ins-page">
      <Navbar />
      <main className="trade-ins-main">
        <div className="trade-ins-header">
          <div className="header-content">
            <h1>My Trade-Ins</h1>
            <p>Get the best value for your luxury vehicle</p>
          </div>
          <button className="new-trade-in-btn">
            <FaExchangeAlt className="btn-icon" />
            Start New Trade-In
          </button>
        </div>

        <div className="trade-ins-container">
          {tradeIns.map(tradeIn => (
            <div key={tradeIn.id} className="trade-in-card">
              <div className="car-gallery">
                <div className="main-image">
                  <img src={tradeIn.car.images[0]} alt={`${tradeIn.car.make} ${tradeIn.car.model}`} />
                  <div className="trade-in-status">
                    {getStatusIcon(tradeIn.status)}
                    <span>{tradeIn.status}</span>
                  </div>
                </div>
                <div className="image-thumbnails">
                  {tradeIn.car.images.map((image, index) => (
                    <div key={index} className="thumbnail">
                      <img src={image} alt={`${tradeIn.car.make} ${tradeIn.car.model} view ${index + 1}`} />
                    </div>
                  ))}
                  <button className="add-photo-btn">
                    <FaCamera />
                    <span>Add Photo</span>
                  </button>
                </div>
              </div>

              <div className="trade-in-details">
                <div className="details-header">
                  <div className="car-info">
                    <h2>{tradeIn.car.year} {tradeIn.car.make} {tradeIn.car.model}</h2>
                    <span className="trade-in-id">Request #{tradeIn.id}</span>
                  </div>
                  {tradeIn.status === "Approved" && (
                    <div className="offer-badge">
                      <span className="offer-label">Offer Amount</span>
                      <span className="offer-amount">${tradeIn.offerAmount.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div className="vehicle-specs">
                  <div className="spec-item">
                    <span className="label">Mileage</span>
                    <span className="value">{tradeIn.car.mileage.toLocaleString()} km</span>
                  </div>
                  <div className="spec-item">
                    <span className="label">Condition</span>
                    <span className="value">{tradeIn.car.condition}</span>
                  </div>
                  <div className="spec-item">
                    <span className="label">Estimated Value</span>
                    <span className="value">${tradeIn.car.estimatedValue.toLocaleString()}</span>
                  </div>
                  <div className="spec-item">
                    <span className="label">Submission Date</span>
                    <span className="value">{tradeIn.submissionDate}</span>
                  </div>
                </div>

                {tradeIn.notes && (
                  <div className="notes-section">
                    <h3>Notes</h3>
                    <p>{tradeIn.notes}</p>
                  </div>
                )}

                <div className="documents-section">
                  <h3>Documents</h3>
                  <div className="document-list">
                    {tradeIn.documents.map((doc, index) => (
                      <button key={index} className="document-btn">
                        {doc}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="trade-in-actions">
                  {tradeIn.status === "Approved" ? (
                    <>
                      <button className="primary-btn">Accept Offer</button>
                      <button className="secondary-btn">Negotiate</button>
                    </>
                  ) : (
                    <>
                      <button className="primary-btn">View Details</button>
                      <button className="secondary-btn">Edit Request</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyTradeIns;
