import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import axiosInstance from '../api/axios';
import { useAuth } from '../hooks/useAuth';
import AdminSlideshow from '../components/AdminSlideshow';
import '../css/AddCarListing.css';
import {
  FaCar, FaCog, FaUpload, FaTrash, FaPlus, FaCheck
} from 'react-icons/fa';

const AddCarListing = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  useEffect(() => {
    if (!user?.token) navigate('/car-listings');
  }, [user, navigate]);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    price: '',
    type: 'new',
    condition: 'new',
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    const filtered = files.filter(f => validTypes.includes(f.type));
    if (!filtered.length) return Swal.fire('Invalid File', 'Only images allowed', 'warning');

    const newImages = filtered.map(file => ({ url: URL.createObjectURL(file), file }));
    setFormData(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp < Date.now() / 1000;
    } catch {
      return true;
    }
  };

  const handleSubmit = async () => {
    if (!user || isTokenExpired(user.token)) {
      await Swal.fire('Session Expired', 'Please log in again.', 'warning');
      logout();
      return;
    }

    setLoading(true);
    setMessage({});

    try {
      const sanitizeNumber = (value) => {
        const numeric = parseFloat(value.toString().replace(/[^\d.]/g, ''));
        return isNaN(numeric) ? 0 : numeric;
      };

      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'images') {
          value.forEach(img => payload.append('images', img.file));
        } else if (key === 'features') {
          payload.append('features', value.join(','));
        } else if (['price', 'year', 'mileage', 'horsepower'].includes(key)) {
          payload.append(key, sanitizeNumber(value));
        } else {
          payload.append(key, value);
        }
      });

      await axiosInstance.post('/cars', payload);
      Swal.fire('Success', 'Car listing added!', 'success');
      navigate('/car-listings');
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      setMessage({ type: 'error', text: msg });
      if (msg.toLowerCase().includes('token expired')) logout();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-car-listing">
      <AdminSlideshow />
      <h1>Add New Car Listing</h1>

      <div className="steps-indicator">
        {['Basic Info', 'Details', 'Features', 'Photos'].map((label, i) => (
          <div className={`step ${step >= i + 1 ? 'active' : ''}`} key={i}>
            <div className="step-number">{i + 1}</div>
            <span>{label}</span>
          </div>
        ))}
      </div>

      {message.text && (
        <div className={`message-box ${message.type}`}>{message.text}</div>
      )}

      <form encType="multipart/form-data">
        {step === 1 && (
          <section>
            <h2><FaCar /> Basic Info</h2>
            <div className="form-group">
              <label>Brand</label>
              <input type="text" name="brand" value={formData.brand} onChange={handleChange} required />
              <label>Model</label>
              <input type="text" name="model" value={formData.model} onChange={handleChange} required />
              <label>Year</label>
              <input type="number" name="year" value={formData.year} onChange={handleChange} required />
              <label>Price</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} required />
              <label>Type</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="new">New</option>
                <option value="used">Used</option>
              </select>
            </div>
          </section>
        )}

        {step === 2 && (
          <section>
            <h2><FaCog /> Details</h2>
            <div className="form-group">
              <label>Condition</label>
              <select name="condition" value={formData.condition} onChange={handleChange}>
                <option value = "new">New</option>
                <option value = "used">Used</option>
                <option value = "certified pre-owned">Certified Pre-Owned</option>
              </select>
              <label>Mileage</label>
              <input type="number" name="mileage" value={formData.mileage} onChange={handleChange} />
              <label>Transmission</label>
              <select name="transmission" value={formData.transmission} onChange={handleChange}>
                <option>Automatic</option><option>Manual</option><option>CVT</option>
              </select>
              <label>Fuel Type</label>
              <select name="fuelType" value={formData.fuelType} onChange={handleChange}>
                <option>Gasoline</option><option>Diesel</option><option>Electric</option><option>Hybrid</option>
              </select>
              <label>Location</label>
              <input name="location" value={formData.location} onChange={handleChange} />
              <label>Engine</label>
              <input name="engine" value={formData.engine} onChange={handleChange} />
              <label>Horsepower</label>
              <input name="horsepower" value={formData.horsepower} onChange={handleChange} />
              <label>Acceleration</label>
              <input name="acceleration" value={formData.acceleration} onChange={handleChange} />
              <label>Exterior Color</label>
              <input name="exteriorColor" value={formData.exteriorColor} onChange={handleChange} />
              <label>Interior Color</label>
              <input name="interiorColor" value={formData.interiorColor} onChange={handleChange} />
              <label>VIN</label>
              <input name="vin" value={formData.vin} onChange={handleChange} />
              <label>Body Style</label>
              <input name="bodyStyle" value={formData.bodyStyle} onChange={handleChange} />
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Available">Available</option>
                <option value="Sold">Sold</option>
                <option value="Reserved">Reserved</option>
              </select>
              <label>Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} />
            </div>
          </section>
        )}

        {step === 3 && (
          <section>
            <h2><FaPlus /> Features</h2>
            <div className="form-group">
              <label>List Features (separated by commas)</label>
              <input
                type="text"
                name="features"
                placeholder="Leather Seats, Navigation, Bluetooth, Backup Camera"
                value={formData.features.join(', ')}
                onChange={(e) =>
                  setFormData(prev => ({
                    ...prev,
                    features: e.target.value.split(',').map(f => f.trim()).filter(Boolean)
                  }))
                }
              />
            </div>
          </section>
        )}

        {step === 4 && (
          <section>
            <h2><FaUpload /> Upload Photos</h2>
            <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
            <div className="image-preview-grid">
              {formData.images.map((img, i) => (
                <div key={i} className="image-preview">
                  <img src={img.url} alt={`preview-${i}`} />
                  <button type="button" onClick={() => removeImage(i)}><FaTrash /></button>
                </div>
              ))}
            </div>
          </section>
        )}
      </form>

      {/* Navigation buttons outside the form */}
      <div className="form-navigation">
        {step > 1 && (
          <button type="button" onClick={() => setStep(step - 1)}>Back</button>
        )}
        {step < 4 ? (
          <button type="button" onClick={() => setStep(step + 1)}>Next</button>
        ) : (
          <button type="button" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Submitting...' : 'Add Car Listing'}
          </button>
        )}
      </div>
    </div>
  );
};

export default AddCarListing;
