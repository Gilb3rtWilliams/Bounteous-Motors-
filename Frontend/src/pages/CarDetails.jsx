import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiMapPin,
  FiCalendar,
  FiSettings,
  FiDroplet,
  FiActivity,
  FiCheck,
  FiShield,
} from "react-icons/fi";
import { carAPI } from "../services/api";
import CarImageSlideshow from "../components/CarImageSlideshow";
import AdminSlideshow from "../components/AdminSlideshow"; // Retained from your original code
import "../css/CarDetails.css";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const carData = await carAPI.getCarById(id);
        setCar(carData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching car details:", error);
        setLoading(false);
        if (error.response && error.response.status === 404) {
          navigate("/not-found");
        }
      }
    };

    fetchCarDetails();
  }, [id, navigate]);

  const handleTestDrive = () => {
    console.log("Schedule test drive for car:", id);
  };

  const handleMakeOffer = () => {
    console.log("Make offer for car:", id);
  };

  if (loading || !car) {
    return (
      <div className="cd-loading-container">
        <div className="cd-loader"></div>
        <p>Retrieving vehicle dossier...</p>
      </div>
    );
  }

  return (
    <div className="cd-root">
      <AdminSlideshow />

      <div className="cd-container">
        {/* Navigation & Header */}
        <button className="cd-back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft /> Return to Collection
        </button>

        <div className="cd-header">
          <div className="cd-title-group">
            <span className="cd-year-badge">{car.year}</span>
            <h1 className="cd-title">
              {car.brand} {car.model}
            </h1>
            <div className="cd-listing-meta">
              <span
                className={`cd-auth-badge ${car.listedByAdmin ? "admin" : "seller"}`}
              >
                {car.listedByAdmin ? (
                  <>
                    <FiShield /> Certified Bounteous Listing
                  </>
                ) : (
                  "Private Seller Listing"
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Showroom Grid Layout */}
        <div className="cd-grid">
          {/* Left Column: Visuals & Story */}
          <div className="cd-main-content">
            <div className="cd-gallery-wrapper">
              <CarImageSlideshow
                images={car.images.map((img) => `http://localhost:5000${img}`)}
                height="500px"
                altPrefix={`${car.year} ${car.brand} ${car.model}`}
              />
            </div>

            <div className="cd-story-section">
              <h2 className="cd-section-title">Vehicle Overview</h2>
              <p className="cd-description">{car.description}</p>
            </div>

            {car.features && car.features.length > 0 && (
              <div className="cd-story-section">
                <h2 className="cd-section-title">Premium Features</h2>
                <div className="cd-features-grid">
                  {car.features.map((feature, index) => (
                    <div key={index} className="cd-feature-item">
                      <FiCheck className="cd-feature-icon" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: The Sticky Dossier */}
          <aside className="cd-sidebar">
            <div className="cd-dossier-card">
              <div className="cd-price-block">
                <span className="cd-price-label">Asking Price</span>
                <div className="cd-price-value">
                  ${car.price.toLocaleString()}
                </div>
              </div>

              <div className="cd-specs-list">
                <div className="cd-spec-row">
                  <div className="cd-spec-label">
                    <FiActivity /> Condition
                  </div>
                  <div className="cd-spec-data">{car.condition}</div>
                </div>
                <div className="cd-spec-row">
                  <div className="cd-spec-label">
                    <FiActivity /> Mileage
                  </div>
                  <div className="cd-spec-data">
                    {car.mileage.toLocaleString()} mi
                  </div>
                </div>
                <div className="cd-spec-row">
                  <div className="cd-spec-label">
                    <FiSettings /> Transmission
                  </div>
                  <div className="cd-spec-data">{car.transmission}</div>
                </div>
                <div className="cd-spec-row">
                  <div className="cd-spec-label">
                    <FiDroplet /> Fuel Type
                  </div>
                  <div className="cd-spec-data">{car.fuelType}</div>
                </div>
                <div className="cd-spec-row">
                  <div className="cd-spec-label">
                    <FiMapPin /> Location
                  </div>
                  <div className="cd-spec-data">{car.location}</div>
                </div>
              </div>

              {(car.engine || car.horsepower || car.acceleration) && (
                <div className="cd-performance-block">
                  <h3 className="cd-perf-title">Performance Specs</h3>
                  {car.engine && (
                    <div className="cd-perf-item">
                      <span>Engine</span> {car.engine}
                    </div>
                  )}
                  {car.horsepower && (
                    <div className="cd-perf-item">
                      <span>Power</span> {car.horsepower}
                    </div>
                  )}
                  {car.acceleration && (
                    <div className="cd-perf-item">
                      <span>0-60 mph</span> {car.acceleration}
                    </div>
                  )}
                </div>
              )}

              <div className="cd-actions">
                <button className="cd-btn-primary" onClick={handleTestDrive}>
                  Request Test Drive
                </button>
                <button className="cd-btn-secondary" onClick={handleMakeOffer}>
                  Submit an Offer
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
