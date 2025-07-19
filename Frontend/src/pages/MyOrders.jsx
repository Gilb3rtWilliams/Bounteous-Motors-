import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/MyOrders.css';
import axios from 'axios';
import { FaShippingFast, FaCheckCircle, FaClock, FaFileContract } from 'react-icons/fa';
import { toast } from 'react-toastify';
import CarImageSlideshow from '../components/CarImageSlideshow';
import CustomerSlideshow from '../components/CustomerSlideshow';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/orders/user/${user.id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          }
        });
        setOrders(res.data.orders); // 👈 if your backend wraps orders inside a field
      } catch (err) {
        console.error('❌ Error fetching orders:', err);
        setError('Failed to fetch your orders');
        toast.error("Could not load your orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "In Transit":
        return <FaShippingFast className="status-icon transit" />;
      case "Delivered":
        return <FaCheckCircle className="status-icon delivered" />;
      case "Processing":
        return <FaClock className="status-icon processing" />;
      default:
        return <FaClock className="status-icon unknown" />;
    }
  };

  const totalValue = Array.isArray(orders)
    ? orders.reduce((sum, order) => sum + (order.paymentAmount || 0), 0)
    : 0;

  return (
    <div className="my-orders-page">
      <Navbar />
      <CustomerSlideshow />
      <main className="orders-main">
        <div className="orders-header">
          <h1>My Orders</h1>
          <div className="order-stats">
            <div className="stat-item">
              <span className="stat-value">{orders.length}</span>
              <span className="stat-label">Total Orders</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">${totalValue.toLocaleString()}</span>
              <span className="stat-label">Total Value</span>
            </div>
          </div>
        </div>

        {loading ? (
          <p className="loading-text">Loading your orders...</p>
        ) : error ? (
          <p className="error-msg">{error}</p>
        ) : (
          <div className="orders-container">
            {orders.length === 0 ? (
              <p className="no-orders-msg">You have not placed any orders yet.</p>
            ) : (
              orders.map(order => {
                const car = order.carId;
                const slideshowImages = car?.images?.map(img => `http://localhost:5000${img}`) || [];

                return (
                  <div key={order._id} className="order-card">
                    <div className="order-details">
                      <div className="order-header">
                        <h2>{car?.year} {car?.brand} {car?.model}</h2>
                        <span className="order-id">Order #{order._id.slice(0, 8).toUpperCase()}</span>
                      </div>

                      {slideshowImages.length > 0 && (
                        <CarImageSlideshow
                          images={slideshowImages}
                          height="250px"
                          altPrefix={`${car?.year} ${car?.brand} ${car?.model}`}
                        />
                      )}

                      <div className="order-status">
                        {getStatusIcon(order.orderStatus)}
                        <span>{order.orderStatus || "Processing"}</span>
                      </div>

                      <div className="order-info">
                        <div className="info-group">
                          <span className="label">Order Date</span>
                          <span className="value">{new Date(order.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="info-group">
                          <span className="label">Pickup Date</span>
                          <span className="value">{new Date(order.pickupDate).toLocaleDateString()}</span>
                        </div>
                        <div className="info-group">
                          <span className="label">Price</span>
                          <span className="value">${order.paymentAmount.toLocaleString()}</span>
                        </div>
                        <div className="info-group">
                          <span className="label">Payment Method</span>
                          <span className={`value payment-status ${order.paymentMethod}`}>
                            {order.paymentMethod}
                          </span>
                        </div>
                      </div>

                      <div className="order-documents">
                        <h3>Documents</h3>
                        <div className="document-list">
                          {['Purchase Agreement', 'Insurance', 'Registration'].map((doc, i) => (
                            <button key={i} className="document-btn">
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
                );
              })
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MyOrders;
