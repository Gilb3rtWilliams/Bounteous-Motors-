import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdminSlideshow from '../components/AdminSlideshow';
import {
  FaShippingFast, FaSearch, FaFilter, FaSort,
  FaEye, FaFileContract, FaMoneyBillWave, FaCarSide
} from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../css/ManageOrders.css';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortOption, setSortOption] = useState('newest');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchOrders();
  }, );

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/orders', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setOrders(data.orders);
    } catch (err) {
      console.error('❌ Error fetching orders:', err);
      toast.error('Failed to fetch orders');
    }
  };

  const handleStatusChange = async (orderId, field, value) => {
    try {
      await axios.patch(`http://localhost:5000/api/orders/update-status/${orderId}`, {
        field,
        value,
      }, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      toast.success(`${field} updated to ${value}`);
      fetchOrders();
    } catch (err) {
      console.error(`❌ Failed to update ${field}:`, err);
      toast.error(`Error updating ${field}`);
    }
  };

  const filteredOrders = orders
    .filter(order => {
      const query = searchQuery.toLowerCase();
      const buyer = order.buyerId?.name?.toLowerCase() || '';
      const car = `${order.carId?.brand || ''} ${order.carId?.model || ''}`.toLowerCase();
      const id = order._id?.toLowerCase();
      return (
        (!query || buyer.includes(query) || car.includes(query) || id.includes(query)) &&
        (filterStatus === 'all' || order.orderStatus?.toLowerCase() === filterStatus)
      );
    })
    .sort((a, b) => {
      if (sortOption === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortOption === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortOption === 'price-high') return b.paymentAmount - a.paymentAmount;
      if (sortOption === 'price-low') return a.paymentAmount - b.paymentAmount;
      return 0;
    });

  return (
    <div className="manage-orders-page">
      <Navbar />
      <AdminSlideshow />
      <div className="orders-container">
        <main className="orders-main">
          <h1>Manage Orders</h1>

          {/* === Stats Cards === */}
          <div className="order-stats">
            {[
              { icon: <FaShippingFast />, label: 'Total Orders', value: orders.length },
              { label: 'Completed', value: orders.filter(o => o.orderStatus === 'Completed').length },
              { label: 'Processing', value: orders.filter(o => o.orderStatus === 'Processing').length },
              { label: 'Pending', value: orders.filter(o => o.orderStatus === 'Pending').length }
            ].map(({ icon, label, value }, idx) => (
              <div className="stat-card" key={idx}>
                {icon || <FaShippingFast />}
                <div className="stat-content">
                  <span className="stat-value">{value}</span>
                  <span className="stat-label">{label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* === Controls === */}
          <div className="orders-controls">
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search orders by ID, buyer, or car..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="filters">
              <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="status-filter">
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="processing">Processing</option>
                <option value="pending">Pending</option>
              </select>

              <select value={sortOption} onChange={e => setSortOption(e.target.value)} className="sort-filter">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-high">Price High to Low</option>
                <option value="price-low">Price Low to High</option>
              </select>
            </div>
          </div>

          {/* === Table === */}
          <div className="orders-table">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Car</th>
                  <th>Buyer</th>
                  <th>Date</th>
                  <th>Order Status</th>
                  <th>Payment Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr key={order._id}>
                    <td>{order._id.slice(0, 8).toUpperCase()}</td>
                    <td>
                      <div className="car-info">
                        <img src={`http://localhost:5000${order.carId?.images?.[0] || ''}`} alt="car" />
                        <div>
                          <h4>{order.carId?.year} {order.carId?.brand} {order.carId?.model}</h4>
                          <span className="price">${order.paymentAmount?.toLocaleString()}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <h4>{order.buyerId?.name}</h4>
                      <span>{order.buyerId?.email}</span>
                    </td>
                    <td>
                      <span>{new Date(order.createdAt).toLocaleDateString()}</span><br />
                      <span>Pickup: {new Date(order.pickupDate).toLocaleDateString()}</span>
                    </td>
                    <td>
                      <select
                        className="status-select"
                        value={order.orderStatus}
                        onChange={e => handleStatusChange(order._id, 'orderStatus', e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    <td>
                      <select
                        className="status-select"
                        value={order.paymentStatus}
                        onChange={e => handleStatusChange(order._id, 'paymentStatus', e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Paid">Paid</option>
                      </select>
                    </td>
                    <td className="actions">
                      <button className="action-btn view"><FaEye /> View</button>
                      <button className="action-btn documents"><FaFileContract /> Docs</button>
                      <button className="action-btn update"><FaCarSide /> Update</button>
                      <button className="action-btn payment"><FaMoneyBillWave /> Payment</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ManageOrders;
