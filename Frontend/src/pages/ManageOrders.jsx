import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import '../css/ManageOrders.css';
import {
  FaShippingFast, FaSearch, FaFilter, FaSort,
  FaCheckCircle, FaClock, FaTimesCircle, FaEye,
  FaFileContract, FaMoneyBillWave, FaCarSide
} from 'react-icons/fa';

const ManageOrders = () => {
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
      buyer: {
        name: "James Wilson",
        email: "james.wilson@email.com",
        phone: "+1 (555) 123-4567"
      },
      status: "Pending",
      paymentStatus: "Paid",
      deliveryDate: "2025-04-15",
      orderDate: "2025-03-28",
      documents: ["Purchase Agreement", "Insurance", "Registration"],
      notes: "Requested white glove delivery service"
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
      buyer: {
        name: "Sarah Chen",
        email: "sarah.chen@email.com",
        phone: "+1 (555) 234-5678"
      },
      status: "Processing",
      paymentStatus: "Pending",
      deliveryDate: "2025-04-20",
      orderDate: "2025-03-30",
      documents: ["Purchase Agreement"],
      notes: "Financing in progress"
    },
    {
      id: "ORD-2025-003",
      car: {
        make: "Ferrari",
        model: "SF90 Stradale",
        year: 2024,
        price: 785000,
        image: "/images/cars/ferrari-sf90.jpg"
      },
      buyer: {
        name: "Michael Brown",
        email: "michael.brown@email.com",
        phone: "+1 (555) 345-6789"
      },
      status: "Completed",
      paymentStatus: "Paid",
      deliveryDate: "2025-03-25",
      orderDate: "2025-03-10",
      documents: ["Purchase Agreement", "Insurance", "Registration", "Delivery Receipt"],
      notes: "Delivered to customer's residence"
    }
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <FaCheckCircle className="status-icon completed" />;
      case "Processing":
        return <FaClock className="status-icon processing" />;
      case "Pending":
        return <FaTimesCircle className="status-icon pending" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status) => {
    return status.toLowerCase();
  };

  return (
    <div className="manage-orders-page">
      <Navbar />
      <div className="orders-container">
        <Sidebar />
        <main className="orders-main">
          <div className="orders-header">
            <h1>Manage Orders</h1>
            <div className="order-stats">
              <div className="stat-card">
                <FaShippingFast className="stat-icon" />
                <div className="stat-content">
                  <span className="stat-value">15</span>
                  <span className="stat-label">Total Orders</span>
                </div>
              </div>
              <div className="stat-card">
                <FaCheckCircle className="stat-icon" />
                <div className="stat-content">
                  <span className="stat-value">8</span>
                  <span className="stat-label">Completed</span>
                </div>
              </div>
              <div className="stat-card">
                <FaClock className="stat-icon" />
                <div className="stat-content">
                  <span className="stat-value">5</span>
                  <span className="stat-label">Processing</span>
                </div>
              </div>
              <div className="stat-card">
                <FaTimesCircle className="stat-icon" />
                <div className="stat-content">
                  <span className="stat-value">2</span>
                  <span className="stat-label">Pending</span>
                </div>
              </div>
            </div>
          </div>

          <div className="orders-controls">
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search orders by ID, buyer name, or car details..."
              />
            </div>
            <div className="filters">
              <button className="filter-btn">
                <FaFilter />
                Filter
              </button>
              <select className="status-filter">
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="processing">Processing</option>
                <option value="pending">Pending</option>
              </select>
              <select className="sort-filter">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
              </select>
            </div>
          </div>

          <div className="orders-table">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Car Details</th>
                  <th>Buyer</th>
                  <th>Order Date</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id} className={getStatusClass(order.status)}>
                    <td className="order-id">
                      <span>{order.id}</span>
                    </td>
                    <td className="car-details">
                      <div className="car-info">
                        <img src={order.car.image} alt={`${order.car.make} ${order.car.model}`} />
                        <div>
                          <h4>{order.car.year} {order.car.make} {order.car.model}</h4>
                          <span className="price">${order.car.price.toLocaleString()}</span>
                        </div>
                      </div>
                    </td>
                    <td className="buyer-info">
                      <div>
                        <h4>{order.buyer.name}</h4>
                        <span>{order.buyer.email}</span>
                      </div>
                    </td>
                    <td className="order-date">
                      <div>
                        <span className="date">{order.orderDate}</span>
                        <span className="delivery">Delivery: {order.deliveryDate}</span>
                      </div>
                    </td>
                    <td className="status">
                      <div className="status-badge">
                        {getStatusIcon(order.status)}
                        <span>{order.status}</span>
                      </div>
                    </td>
                    <td className={`payment ${order.paymentStatus.toLowerCase()}`}>
                      <span>{order.paymentStatus}</span>
                    </td>
                    <td className="actions">
                      <button className="action-btn view">
                        <FaEye />
                        View
                      </button>
                      <button className="action-btn documents">
                        <FaFileContract />
                        Docs
                      </button>
                      {order.status !== "Completed" && (
                        <>
                          <button className="action-btn update">
                            <FaCarSide />
                            Update
                          </button>
                          <button className="action-btn payment">
                            <FaMoneyBillWave />
                            Payment
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <button className="prev-page">Previous</button>
            <div className="page-numbers">
              <button className="active">1</button>
              <button>2</button>
              <button>3</button>
              <span>...</span>
              <button>10</button>
            </div>
            <button className="next-page">Next</button>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ManageOrders;
