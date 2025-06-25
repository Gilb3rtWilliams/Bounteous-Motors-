import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import '../css/AddCarListing.css';
import AdminSlideshow from '../components/AdminSlideshow';
import { useAuth } from '../hooks/useAuth'; // adjust path if needed

const AddCarListing = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth(); // added logout and user from auth context

  useEffect(() => {
    if (!user || !user.token) {
      navigate('/car-listings');
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    price: '',
    type: 'new',
    condition: 'New',
    mileage: '',
    description: '',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    location: '',
    engine: '',
    horsepower: '',
    acceleration: '',
    features: [],
    exteriorColor: '',
    interiorColor: '',
    vin: '',
    bodyStyle: '',
    status: 'Available',
    images: []
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      images: files
    }));
  };

  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch {
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check token expiration before submission
    if (!user || isTokenExpired(user.token)) {
      await Swal.fire({
        icon: 'warning',
        title: 'Session Expired',
        text: 'Please log in again to continue.',
        confirmButtonText: 'OK'
      });
      logout();
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'images') {
          formData.images.forEach(image => {
            formDataToSend.append('images', image);
          });
        } else if (key === 'features') {
          formData.features.forEach(feature => {
            formDataToSend.append('features', feature);
          });
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      await axiosInstance.post('/cars', formDataToSend);

      await Swal.fire({
        icon: 'success',
        title: 'Car Added',
        text: 'Your listing has been posted successfully.'
      });

      navigate('/admin/dashboard');
    } catch (error) {
      const message = error.response?.data?.message || error.message;

      console.error('Error adding car listing:', message);

      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message.toLowerCase().includes("token expired")
          ? 'Your session expired. Please log in again.'
          : 'Failed to add car listing. Try again later.'
      });

      if (message.toLowerCase().includes("token expired")) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

return (
    <div className="add-car-listing">
      <AdminSlideshow />
      <h1>Add New Car Listing</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Brand:</label>
          <input type="text" name="brand" value={formData.brand} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Model:</label>
          <input type="text" name="model" value={formData.model} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Year:</label>
          <input type="number" name="year" value={formData.year} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Price:</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Type:</label>
          <select name="type" value={formData.type} onChange={handleChange} required>
            <option value="new">New</option>
            <option value="used">Used</option>
          </select>
        </div>

        <div className="form-group">
          <label>Condition:</label>
          <select name="condition" value={formData.condition} onChange={handleChange} required>
            <option value="New">New</option>
            <option value="Used">Used</option>
            <option value="Certified Pre-Owned">Certified Pre-Owned</option>
          </select>
        </div>

        <div className="form-group">
          <label>Mileage:</label>
          <input type="number" name="mileage" value={formData.mileage} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Fuel Type:</label>
          <select name="fuelType" value={formData.fuelType} onChange={handleChange}>
            <option value="Gasoline">Gasoline</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Transmission:</label>
          <select name="transmission" value={formData.transmission} onChange={handleChange}>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
            <option value="CVT">CVT</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Location:</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Engine:</label>
          <input type="text" name="engine" value={formData.engine} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Horsepower:</label>
          <input type="text" name="horsepower" value={formData.horsepower} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Acceleration:</label>
          <input type="text" name="acceleration" value={formData.acceleration} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Exterior Color:</label>
          <input type="text" name="exteriorColor" value={formData.exteriorColor} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Interior Color:</label>
          <input type="text" name="interiorColor" value={formData.interiorColor} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>VIN:</label>
          <input type="text" name="vin" value={formData.vin} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Body Style:</label>
          <input type="text" name="bodyStyle" value={formData.bodyStyle} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Status:</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Available">Available</option>
            <option value="Sold">Sold</option>
            <option value="Reserved">Reserved</option>
          </select>
        </div>

        <div className="form-group">
          <label>Features (comma separated):</label>
          <input
            type="text"
            name="features"
            value={formData.features.join(', ')}
            onChange={(e) =>
              setFormData(prev => ({
                ...prev,
                features: e.target.value.split(',').map(f => f.trim())
              }))
            }
          />
        </div>

        <div className="form-group">
          <label>Images:</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Car Listing'}
        </button>
      </form>
    </div>
  );
};

export default AddCarListing;