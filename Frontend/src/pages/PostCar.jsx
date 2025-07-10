import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import axiosInstance from '../api/axios';
import CustomerSlideshow from '../components/CustomerSlideshow';
import { useAuth } from '../hooks/useAuth';
import '../css/PostCar.css'; // Similar to AddCarListing.css
import {
  FaCar, FaCog, FaUpload, FaTrash, FaPlus
} from 'react-icons/fa';

const PostCar = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (!user?.token) navigate('/login');
  }, [user, navigate]);

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
    images: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    const validFiles = files.filter(f => allowed.includes(f.type));
    if (!validFiles.length) return Swal.fire('Invalid File', 'Only images allowed', 'warning');

    const previews = validFiles.map(file => ({ url: URL.createObjectURL(file), file }));
    setFormData(prev => ({ ...prev, images: [...prev.images, ...previews] }));
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

  // inside handleSubmit function
  const handleSubmit = async () => {
    if (!user || isTokenExpired(user.token)) {
      await Swal.fire('Session Expired', 'Please log in again.', 'warning');
      logout();
      return;
    }

    setLoading(true);
    setMessage({});

    try {
      const form = new FormData();

      // Enforce these fields
      const fixedFormData = {
        ...formData,
        status: 'Pending',
        listedByAdmin: false
      };

      Object.entries(fixedFormData).forEach(([key, value]) => {
        if (key === 'images') {
          value.forEach(img => form.append('images', img.file));
        } else if (key === 'features') {
          form.append('features', value.join(','));
        } else {
          form.append(key, value);
        }
      });

      await axiosInstance.post('/cars/customer', form, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });

      Swal.fire('Submitted!', 'Your car has been posted for admin review.', 'success');
      navigate('/car-listings');
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      setMessage({ type: 'error', text: msg });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="post-car-container">
      <CustomerSlideshow />
      <h1><strong>Post Your Car</strong></h1>

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
              <input name="brand" value={formData.brand} onChange={handleChange} />
              <label>Model</label>
              <input name="model" value={formData.model} onChange={handleChange} />
              <label>Year</label>
              <input name="year" type="number" value={formData.year} onChange={handleChange} />
              <label>Price</label>
              <input name="price" type="number" value={formData.price} onChange={handleChange} />
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
                <option value="new">New</option>
                <option value="used">Used</option>
                <option value="certified pre-owned">Certified Pre-Owned</option>
              </select>
              <label>Mileage</label>
              <input name="mileage" type="number" value={formData.mileage} onChange={handleChange} />
              <label>Fuel Type</label>
              <select name="fuelType" value={formData.fuelType} onChange={handleChange}>
                <option>Gasoline</option>
                <option>Diesel</option>
                <option>Electric</option>
                <option>Hybrid</option>
              </select>
              <label>Transmission</label>
              <select name="transmission" value={formData.transmission} onChange={handleChange}>
                <option>Automatic</option>
                <option>Manual</option>
                <option>CVT</option>
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
              <label>Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
            </div>
          </section>
        )}

        {step === 3 && (
          <section>
            <h2><FaPlus /> Features</h2>
            <label>List Features (comma separated)</label>
            <input
              type="text"
              value={formData.features.join(', ')}
              onChange={(e) =>
                setFormData(prev => ({
                  ...prev,
                  features: e.target.value.split(',').map(f => f.trim()).filter(Boolean)
                }))
              }
            />
          </section>
        )}

        {step === 4 && (
          <section>
            <h2><FaUpload /> Upload Images</h2>
            <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
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

      <div className="form-navigation">
        {step > 1 && <button type="button" onClick={() => setStep(step - 1)}>Back</button>}
        {step < 4
          ? <button type="button" onClick={() => setStep(step + 1)}>Next</button>
          : <button type="button" onClick={handleSubmit} disabled={loading}>{loading ? 'Submitting...' : 'Submit Car'}</button>
        }
      </div>
    </div>
  );
};

export default PostCar;
