import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCar, FaTachometerAlt, FaGasPump, FaMapMarkerAlt, FaCog, FaCalendarAlt, FaArrowLeft } from 'react-icons/fa';
import { BsSpeedometer2 } from 'react-icons/bs';
import { carAPI } from '../services/api';
import '../css/CarDetails.css';
import CarImageSlideshow from '../components/CarImageSlideshow';
import AdminSlideshow from '../components/AdminSlideshow';

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
        console.error('Error fetching car details:', error);
        setLoading(false);
        // Optionally navigate to an error page or show an error message
        if (error.response && error.response.status === 404) {
          navigate('/not-found');
        }
      }
    };

    fetchCarDetails();
  }, [id, navigate]);

  const handleTestDrive = () => {
    // TODO: Implement test drive scheduling
    console.log('Schedule test drive for car:', id);
  };

  const handleMakeOffer = () => {
    // TODO: Implement offer submission
    console.log('Make offer for car:', id);
  };

  if (loading || !car) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading vehicle details...</p>
      </div>
    );
  }

  return (
    <div className="car-details-container">
      <AdminSlideshow />
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back to Listings
      </button>

      <div className="car-details-grid">
        <div className="car-gallery">
  <CarImageSlideshow
    images={car.images}
    height="700px"
    altPrefix={`${car.make} ${car.model}`}
  />
</div>



        <div className="car-info">
          <div className="car-header">
            <h1>{`${car.year} ${car.brand} ${car.model}`}</h1>
            <div className="price-tag">${car.price.toLocaleString()}</div>
          </div>

          <div className="key-specs">
            <div className="spec-item">
              <FaCar />
              <span>{car.condition}</span>
            </div>
            <div className="spec-item">
              <BsSpeedometer2 />
              <span>{car.mileage} miles</span>
            </div>
            <div className="spec-item">
              <FaGasPump />
              <span>{car.fuelType}</span>
            </div>
            <div className="spec-item">
              <FaCog />
              <span>{car.transmission}</span>
            </div>
            <div className="spec-item">
              <FaMapMarkerAlt />
              <span>{car.location}</span>
            </div>
            <div className="spec-item">
              <FaCalendarAlt />
              <span>{car.year}</span>
            </div>
          </div>

          {(car.engine || car.horsepower || car.acceleration) && (
            <div className="car-section">
              <h2>Performance</h2>
              <div className="performance-stats">
                {car.engine && (
                  <div className="stat-item">
                    <h3>Engine</h3>
                    <p>{car.engine}</p>
                  </div>
                )}
                {car.horsepower && (
                  <div className="stat-item">
                    <h3>Horsepower</h3>
                    <p>{car.horsepower}</p>
                  </div>
                )}
                {car.acceleration && (
                  <div className="stat-item">
                    <h3>Acceleration</h3>
                    <p>{car.acceleration}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="car-section">
            <h2>Description</h2>
            <p className="description">{car.description}</p>
          </div>

          {car.features && car.features.length > 0 && (
            <div className="car-section">
              <h2>Features</h2>
              <div className="features-grid">
                {car.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <span className="feature-dot"></span>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="action-buttons">
            <button className="schedule-test-drive" onClick={handleTestDrive}>Schedule Test Drive</button>
            <button className="make-offer" onClick={handleMakeOffer}>Make an Offer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
