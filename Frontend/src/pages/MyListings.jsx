import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import '../css/MyListings.css';
import { 
  FaCar, FaPlus, FaPencilAlt, FaEye, FaTrash, FaCheckCircle,
  FaClock, FaTimesCircle, FaChartLine, FaFilter, FaSort
} from 'react-icons/fa';

const MyListings = () => {
  const [listings] = useState([
    {
      id: "LST-2025-001",
      car: {
        make: "Rolls-Royce",
        model: "Phantom",
        year: 2024,
        price: 685000,
        condition: "New",
        mileage: 50,
        images: ["/images/cars/rr-phantom.jpg"],
        features: ["Extended Wheelbase", "Starlight Headliner", "Bespoke Audio"]
      },
      status: "Active",
      datePosted: "2025-03-15",
      views: 1250,
      inquiries: 8,
      saves: 45,
      lastModified: "2025-03-28"
    },
    {
      id: "LST-2025-002",
      car: {
        make: "Bentley",
        model: "Continental GT",
        year: 2024,
        price: 245000,
        condition: "New",
        mileage: 100,
        images: ["/images/cars/bentley-gt.jpg"],
        features: ["First Edition", "Naim Audio", "Rotating Display"]
      },
      status: "Pending Review",
      datePosted: "2025-03-30",
      views: 0,
      inquiries: 0,
      saves: 0,
      lastModified: "2025-03-30"
    },
    {
      id: "LST-2025-003",
      car: {
        make: "Ferrari",
        model: "SF90 Stradale",
        year: 2024,
        price: 785000,
        condition: "New",
        mileage: 25,
        images: ["/images/cars/ferrari-sf90.jpg"],
        features: ["Assetto Fiorano Package", "Carbon Fiber Racing Seats", "Telemetry System"]
      },
      status: "Sold",
      datePosted: "2025-02-01",
      views: 2800,
      inquiries: 15,
      saves: 120,
      lastModified: "2025-03-25",
      soldDate: "2025-03-25",
      soldPrice: 765000
    }
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Active":
        return <FaCheckCircle className="status-icon active" />;
      case "Pending Review":
        return <FaClock className="status-icon pending" />;
      case "Sold":
        return <FaTimesCircle className="status-icon sold" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status) => {
    return status.toLowerCase().replace(' ', '-');
  };

  return (
    <div className="my-listings-page">
      <Navbar />
      <div className="listings-container">
        <Sidebar />
        <main className="listings-main">
          <div className="listings-header">
            <div className="header-content">
              <h1>My Listings</h1>
              <div className="listing-stats">
                <div className="stat-item">
                  <FaCar className="stat-icon" />
                  <div className="stat-content">
                    <span className="stat-value">12</span>
                    <span className="stat-label">Total Listings</span>
                  </div>
                </div>
                <div className="stat-item">
                  <FaChartLine className="stat-icon" />
                  <div className="stat-content">
                    <span className="stat-value">85%</span>
                    <span className="stat-label">Sell Rate</span>
                  </div>
                </div>
              </div>
            </div>
            <button className="new-listing-btn">
              <FaPlus />
              Add New Listing
            </button>
          </div>

          <div className="listings-controls">
            <div className="filters">
              <button className="filter-btn">
                <FaFilter />
                Filter
              </button>
              <select className="status-filter">
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending Review</option>
                <option value="sold">Sold</option>
              </select>
              <select className="sort-filter">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
                <option value="views">Most Viewed</option>
              </select>
            </div>
            <div className="view-options">
              <button className="view-btn active">Grid</button>
              <button className="view-btn">List</button>
            </div>
          </div>

          <div className="listings-grid">
            {listings.map(listing => (
              <div key={listing.id} className={`listing-card ${getStatusClass(listing.status)}`}>
                <div className="listing-image">
                  <img src={listing.car.images[0]} alt={`${listing.car.make} ${listing.car.model}`} />
                  <div className="listing-status">
                    {getStatusIcon(listing.status)}
                    <span>{listing.status}</span>
                  </div>
                  {listing.status === "Sold" && (
                    <div className="sold-overlay">
                      <div className="sold-price">
                        Sold for ${listing.soldPrice.toLocaleString()}
                      </div>
                    </div>
                  )}
                </div>

                <div className="listing-content">
                  <div className="listing-header">
                    <h2>{listing.car.year} {listing.car.make} {listing.car.model}</h2>
                    <div className="listing-price">
                      ${listing.car.price.toLocaleString()}
                    </div>
                  </div>

                  <div className="listing-details">
                    <div className="detail-item">
                      <span className="label">Condition</span>
                      <span className="value">{listing.car.condition}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Mileage</span>
                      <span className="value">{listing.car.mileage.toLocaleString()} km</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Posted</span>
                      <span className="value">{listing.datePosted}</span>
                    </div>
                  </div>

                  <div className="listing-metrics">
                    <div className="metric-item">
                      <FaEye className="metric-icon" />
                      <span>{listing.views.toLocaleString()}</span>
                    </div>
                    <div className="metric-item">
                      <FaComment className="metric-icon" />
                      <span>{listing.inquiries}</span>
                    </div>
                    <div className="metric-item">
                      <FaHeart className="metric-icon" />
                      <span>{listing.saves}</span>
                    </div>
                  </div>

                  <div className="listing-features">
                    {listing.car.features.map((feature, index) => (
                      <span key={index} className="feature-tag">{feature}</span>
                    ))}
                  </div>

                  <div className="listing-actions">
                    {listing.status === "Active" && (
                      <>
                        <button className="action-btn edit">
                          <FaPencilAlt />
                          Edit
                        </button>
                        <button className="action-btn delete">
                          <FaTrash />
                          Remove
                        </button>
                      </>
                    )}
                    <button className="action-btn view">
                      <FaEye />
                      View Details
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

export default MyListings;
