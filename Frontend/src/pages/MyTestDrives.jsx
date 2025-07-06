import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/MyTestDrives.css';
import { FaCar, FaCalendarAlt, FaClock, FaCheckCircle, FaTimesCircle, FaMapMarkerAlt } from 'react-icons/fa';

const MyTestDrives = () => {
  const [testDrives] = useState([
    {
      id: "TD-2025-001",
      car: {
        make: "Porsche",
        model: "911 GT3 RS",
        year: 2024,
        image: "/images/cars/porsche-gt3rs.jpg"
      },
      status: "Scheduled",
      date: "2025-04-15",
      time: "10:00 AM",
      location: "Bounteous Motors Nairobi",
      salesRep: "James Wilson",
      notes: "Please arrive 15 minutes early for documentation"
    },
    {
      id: "TD-2025-002",
      car: {
        make: "Aston Martin",
        model: "DB12",
        year: 2024,
        image: "/images/cars/am-db12.jpg"
      },
      status: "Completed",
      date: "2025-03-28",
      time: "2:00 PM",
      location: "Bounteous Motors Mombasa",
      salesRep: "Sarah Chen",
      notes: "Customer interested in financing options"
    }
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Scheduled":
        return <FaClock className="status-icon scheduled" />;
      case "Completed":
        return <FaCheckCircle className="status-icon completed" />;
      case "Cancelled":
        return <FaTimesCircle className="status-icon cancelled" />;
      default:
        return null;
    }
  };

  return (
    <div className="my-test-drives-page">
      <Navbar />
      <main className="test-drives-main">
        <div className="test-drives-header">
          <h1>My Test Drives</h1>
          <button className="schedule-btn">
            <FaCar className="btn-icon" />
            Schedule New Test Drive
          </button>
        </div>

        <div className="test-drives-container">
          {testDrives.map(drive => (
            <div key={drive.id} className="test-drive-card">
              <div className="drive-image">
                <img src={drive.car.image} alt={`${drive.car.make} ${drive.car.model}`} />
                <div className="drive-status">
                  {getStatusIcon(drive.status)}
                  <span>{drive.status}</span>
                </div>
              </div>

              <div className="drive-details">
                <div className="drive-header">
                  <h2>{drive.car.make} {drive.car.model}</h2>
                  <span className="drive-id">Booking #{drive.id}</span>
                </div>

                <div className="drive-info">
                  <div className="info-item">
                    <FaCalendarAlt className="info-icon" />
                    <div className="info-content">
                      <span className="label">Date & Time</span>
                      <span className="value">{drive.date} at {drive.time}</span>
                    </div>
                  </div>

                  <div className="info-item">
                    <FaMapMarkerAlt className="info-icon" />
                    <div className="info-content">
                      <span className="label">Location</span>
                      <span className="value">{drive.location}</span>
                    </div>
                  </div>

                  <div className="info-item">
                    <FaCar className="info-icon" />
                    <div className="info-content">
                      <span className="label">Vehicle</span>
                      <span className="value">{drive.car.year} {drive.car.make} {drive.car.model}</span>
                    </div>
                  </div>

                  <div className="info-item">
                    <FaUser className="info-icon" />
                    <div className="info-content">
                      <span className="label">Sales Representative</span>
                      <span className="value">{drive.salesRep}</span>
                    </div>
                  </div>
                </div>

                {drive.notes && (
                  <div className="drive-notes">
                    <h3>Notes</h3>
                    <p>{drive.notes}</p>
                  </div>
                )}

                <div className="drive-actions">
                  {drive.status === "Scheduled" ? (
                    <>
                      <button className="primary-btn">Reschedule</button>
                      <button className="secondary-btn">Cancel</button>
                    </>
                  ) : (
                    <button className="primary-btn">View Details</button>
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

export default MyTestDrives;
