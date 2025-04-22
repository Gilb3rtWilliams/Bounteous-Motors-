import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaFilter, FaSortAmountDown, FaCar, FaTachometerAlt, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { BiGasPump } from 'react-icons/bi';
import { BsSpeedometer2 } from 'react-icons/bs';
import { carAPI, orderAPI } from '../services/api'; // Fixed: Combined imports
import { useAuth } from '../context/AuthContext';
import "../css/CarListings.css";
import Slideshow from '../components/Slideshow';
import Navbar from '../components/Navbar';

const CarListings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state
  const [filters, setFilters] = useState({
    make: '',
    priceRange: '',
    year: '',
    condition: ''
  });

  const handleOrder = async (carId) => {
    try {
      if (!user) {
        navigate('/login');
        return;
      }
      const orderData = {
        carId,
        userId: user.id,
        orderDate: new Date()
      };
      const response = await orderAPI.createOrder(orderData);
      if (response.success) {
        navigate('/order-confirmation');
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carsData = await carAPI.getAllCars();
        if (Array.isArray(carsData)) {  // Verify the data is an array
          setCars(carsData);
        } else {
          throw new Error('Invalid data format received');
        }
      } catch (error) {
        console.error('Error fetching cars:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleViewDetails = (carId) => {
    navigate(`/car/${carId}`);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading vehicles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error loading cars</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="car-listings-container">
      <Navbar />
      <Slideshow />
      <header className="listings-header">
        <div className="header-content">
          <h1>Available Vehicles</h1>
          <p className="subtitle">Find your perfect ride from our premium selection</p>
        </div>
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by make, model, or year..."
            className="search-input"
          />
        </div>
      </header>

      <div className="filters-section">
        <div className="filters-header">
          <FaFilter />
          <h2>Filters</h2>
        </div>
        <div className="filters-grid">
          <select
            name="make"
            value={filters.make}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">All Makes</option>
            <option value="toyota">Toyota</option>
            <option value="honda">Honda</option>
            <option value="ford">Ford</option>
            <option value="chevrolet">Chevrolet</option>
            <option value="nissan">Nissan</option>
            <option value="aston-martin">Aston Martin</option>
            <option value="bmw">BMW</option>
          </select>

          <select
            name="priceRange"
            value={filters.priceRange}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">Price Range</option>
            <option value="0-20000">$0 - $20,000</option>
            <option value="20000-40000">$20,000 - $40,000</option>
            <option value="40000+">$40,000+</option>
          </select>

          <select
            name="year"
            value={filters.year}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">All Years</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </select>

          <select
            name="condition"
            value={filters.condition}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">All Conditions</option>
            <option value="new">New</option>
            <option value="used">Used</option>
            <option value="certified">Certified Pre-Owned</option>
          </select>
        </div>
      </div>

      <div className="sort-section">
        <FaSortAmountDown />
        <select className="sort-select">
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="year-desc">Year: Newest First</option>
          <option value="year-asc">Year: Oldest First</option>
        </select>
      </div>

      <div className="cars-grid">
        {cars.map(car => (
          <div key={car._id} className="car-card">
            <div className="car-image">
              <img
                src={car.image || '/images/no-image.png'}
                alt={`${car.year} ${car.make} ${car.model}`}
              />
            </div>
            <div className="car-details">
              <h3>{`${car.year} ${car.brand} ${car.model}`}</h3>
              <p className="car-price">${car.price.toLocaleString()}</p>
              <div className="car-specs">
                <span><FaCar />{car.type}</span>
                <span><BsSpeedometer2 />{car.mileage || 0} miles</span>
                <span><BiGasPump />{car.fuelType || 'N/A'}</span>
                <span><FaMapMarkerAlt />{car.location || 'Nairobi'}</span>
              </div>
              <p className="car-description">{car.description}</p>
              <button className="view-details-btn" onClick={() => handleViewDetails(car._id)}>View Details</button>
              <button className="order-btn" onClick={() => handleOrder(car._id)}>Order Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarListings;
