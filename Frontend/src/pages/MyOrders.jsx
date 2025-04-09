import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/MyOrders.css';
import { FaShippingFast, FaCheckCircle, FaClock, FaFileContract } from 'react-icons/fa';

const MyOrders = () => {
  const [orders] = useState([
    {
      id: "ORD-2025-001",
      car: {
        make: "Rolls-Royce",
        model: "Phantom",
        year: 2024,
        price: 685000,
        image: "/images/cars/rr-phantom.jpg"
      },
      status: "In Transit",
      orderDate: "2025-03-15",
      deliveryDate: "2025-04-10",
      paymentStatus: "Paid",
      documents: ["Purchase Agreement", "Insurance", "Registration"],
      trackingNumber: "BM-SHIP-001"
    },
    {
      id: "ORD-2025-002",
      car: {
        make: "Bentley",
        model: "Continental GT",
        year: 2024,
        price: 245000,
        image: "/images/cars/bentley-gt.jpg"
      },
      status: "Delivered",
      orderDate: "2025-02-01",
      deliveryDate: "2025-02-15",
      paymentStatus: "Paid",
      documents: ["Purchase Agreement", "Insurance", "Registration"],
      trackingNumber: "BM-SHIP-002"
    }
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "In Transit":
        return <FaShippingFast className="status-icon transit" />;
      case "Delivered":
        return <FaCheckCircle className="status-icon delivered" />;
      case "Processing":
        return <FaClock className="status-icon processing" />;
      default:
        return null;
    }
  };

  return (
    <div className="my-orders-page">
      <Navbar />
      <main className="orders-main">
        <div className="orders-header">
          <h1>My Orders</h1>
          <div className="order-stats">
            <div className="stat-item">
              <span className="stat-value">2</span>
              <span className="stat-label">Total Orders</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">$930K</span>
              <span className="stat-label">Total Value</span>
            </div>
          </div>
        </div>

        <div className="orders-container">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-image">
                <img src={order.car.image} alt={`${order.car.make} ${order.car.model}`} />
                <div className="order-status">
                  {getStatusIcon(order.status)}
                  <span>{order.status}</span>
                </div>
              </div>
              
              <div className="order-details">
                <div className="order-header">
                  <h2>{order.car.make} {order.car.model}</h2>
                  <span className="order-id">Order #{order.id}</span>
                </div>
                
                <div className="order-info">
                  <div className="info-group">
                    <span className="label">Order Date</span>
                    <span className="value">{order.orderDate}</span>
                  </div>
                  <div className="info-group">
                    <span className="label">Delivery Date</span>
                    <span className="value">{order.deliveryDate}</span>
                  </div>
                  <div className="info-group">
                    <span className="label">Price</span>
                    <span className="value">${order.car.price.toLocaleString()}</span>
                  </div>
                  <div className="info-group">
                    <span className="label">Payment Status</span>
                    <span className={`value payment-status ${order.paymentStatus.toLowerCase()}`}>
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>

                <div className="order-documents">
                  <h3>Documents</h3>
                  <div className="document-list">
                    {order.documents.map((doc, index) => (
                      <button key={index} className="document-btn">
                        <FaFileContract className="doc-icon" />
                        {doc}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="order-actions">
                  <button className="primary-btn">Track Delivery</button>
                  <button className="secondary-btn">View Details</button>
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

export default MyOrders;
