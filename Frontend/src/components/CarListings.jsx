import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './CarListings.css';

const CarListings = () => {
  const { user } = useAuth();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch car listings from an API or database
    const fetchCars = async () => {
      try {
        const response = await fetch('/api/cars');
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error('Error fetching car listings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading car listings...</p>
      </div>
    );
  }

  return (
    <div className="car-listings-container">
      <div className="listings-header">
        <div className="header-content">
          <h1>Welcome, {user ? user.name : 'Guest'}</h1>
          <p className="subtitle">Find your dream car today!</p>
        </div>
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search for cars..."
          />
        </div>
      </div>
      <div className="cars-grid">
        {cars.map((car) => (
          <div className="car-card" key={car.id}>
            <div className="car-image">
              <img src={car.image} alt={car.name} />
            </div>
            <div className="car-details">
              <h3>{car.name}</h3>
              <div className="car-price">{car.price}</div>
              <div className="car-specs">
                <span>{car.year}</span>
                <span>{car.mileage} miles</span>
              </div>
              <p className="car-description">{car.description}</p>
              <button className="view-details-btn">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarListings;