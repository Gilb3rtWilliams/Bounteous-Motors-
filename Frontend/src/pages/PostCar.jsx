import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/PostCar.css';
import { 
  FaCar, FaUpload, FaTrash, FaPlus, FaCheck,
  FaTachometerAlt, FaCog, FaPaintBrush, FaCalendarAlt
} from 'react-icons/fa';

const PostCar = () => {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price: '',
    condition: 'New',
    mileage: '',
    exteriorColor: '',
    interiorColor: '',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    bodyStyle: '',
    description: '',
    features: [],
    images: []
  });

  const [step, setStep] = useState(1);

  const conditions = ['New', 'Like New', 'Excellent', 'Good', 'Fair'];
  const transmissions = ['Automatic', 'Manual', 'Semi-Automatic'];
  const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
  const bodyStyles = ['Sedan', 'SUV', 'Coupe', 'Convertible', 'Sports Car', 'Luxury'];

  const commonFeatures = [
    'Leather Seats',
    'Navigation System',
    'Bluetooth',
    'Sunroof',
    'Premium Sound System',
    'Parking Sensors',
    '360-Degree Camera',
    'Heated Seats',
    'Ventilated Seats',
    'Lane Departure Warning',
    'Blind Spot Monitor',
    'Adaptive Cruise Control'
  ];

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      url: URL.createObjectURL(file),
      file: file
    }));
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const toggleFeature = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="post-car-page">
      <Navbar />
      <div className="post-car-container">
        <Sidebar />
        <main className="post-car-main">
          <div className="post-car-header">
            <h1>Post a New Car</h1>
            <div className="steps-indicator">
              <div className={`step ${step >= 1 ? 'active' : ''}`}>
                <div className="step-number">1</div>
                <span>Basic Info</span>
              </div>
              <div className={`step ${step >= 2 ? 'active' : ''}`}>
                <div className="step-number">2</div>
                <span>Details</span>
              </div>
              <div className={`step ${step >= 3 ? 'active' : ''}`}>
                <div className="step-number">3</div>
                <span>Features</span>
              </div>
              <div className={`step ${step >= 4 ? 'active' : ''}`}>
                <div className="step-number">4</div>
                <span>Media</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="post-car-form">
            {step === 1 && (
              <div className="form-section basic-info">
                <h2>
                  <FaCar className="section-icon" />
                  Basic Information
                </h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Make</label>
                    <input
                      type="text"
                      value={formData.make}
                      onChange={(e) => setFormData({...formData, make: e.target.value})}
                      placeholder="e.g., Rolls-Royce"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Model</label>
                    <input
                      type="text"
                      value={formData.model}
                      onChange={(e) => setFormData({...formData, model: e.target.value})}
                      placeholder="e.g., Phantom"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Year</label>
                    <div className="input-with-icon">
                      <FaCalendarAlt className="input-icon" />
                      <input
                        type="number"
                        value={formData.year}
                        onChange={(e) => setFormData({...formData, year: e.target.value})}
                        min="1900"
                        max={new Date().getFullYear() + 1}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Price ($)</label>
                    <div className="input-with-icon">
                      <span className="input-icon">$</span>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        placeholder="e.g., 450000"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="form-section details">
                <h2>
                  <FaCog className="section-icon" />
                  Vehicle Details
                </h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Condition</label>
                    <select
                      value={formData.condition}
                      onChange={(e) => setFormData({...formData, condition: e.target.value})}
                      required
                    >
                      {conditions.map(condition => (
                        <option key={condition} value={condition}>{condition}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Mileage</label>
                    <div className="input-with-icon">
                      <FaTachometerAlt className="input-icon" />
                      <input
                        type="number"
                        value={formData.mileage}
                        onChange={(e) => setFormData({...formData, mileage: e.target.value})}
                        placeholder="e.g., 1000"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Exterior Color</label>
                    <div className="input-with-icon">
                      <FaPaintBrush className="input-icon" />
                      <input
                        type="text"
                        value={formData.exteriorColor}
                        onChange={(e) => setFormData({...formData, exteriorColor: e.target.value})}
                        placeholder="e.g., Midnight Black"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Interior Color</label>
                    <div className="input-with-icon">
                      <FaPaintBrush className="input-icon" />
                      <input
                        type="text"
                        value={formData.interiorColor}
                        onChange={(e) => setFormData({...formData, interiorColor: e.target.value})}
                        placeholder="e.g., Cognac"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Transmission</label>
                    <select
                      value={formData.transmission}
                      onChange={(e) => setFormData({...formData, transmission: e.target.value})}
                      required
                    >
                      {transmissions.map(transmission => (
                        <option key={transmission} value={transmission}>{transmission}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Fuel Type</label>
                    <select
                      value={formData.fuelType}
                      onChange={(e) => setFormData({...formData, fuelType: e.target.value})}
                      required
                    >
                      {fuelTypes.map(fuelType => (
                        <option key={fuelType} value={fuelType}>{fuelType}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Body Style</label>
                    <select
                      value={formData.bodyStyle}
                      onChange={(e) => setFormData({...formData, bodyStyle: e.target.value})}
                      required
                    >
                      <option value="">Select Body Style</option>
                      {bodyStyles.map(style => (
                        <option key={style} value={style}>{style}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group full-width">
                    <label>Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Provide a detailed description of the vehicle..."
                      rows="4"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="form-section features">
                <h2>
                  <FaPlus className="section-icon" />
                  Features & Options
                </h2>
                <div className="features-grid">
                  {commonFeatures.map(feature => (
                    <div
                      key={feature}
                      className={`feature-item ${formData.features.includes(feature) ? 'selected' : ''}`}
                      onClick={() => toggleFeature(feature)}
                    >
                      <FaCheck className="feature-check" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="custom-feature">
                  <input
                    type="text"
                    placeholder="Add custom feature..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.target.value.trim()) {
                        toggleFeature(e.target.value.trim());
                        e.target.value = '';
                      }
                    }}
                  />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="form-section media">
                <h2>
                  <FaUpload className="section-icon" />
                  Photos & Media
                </h2>
                <div className="media-upload">
                  <div className="upload-area">
                    <input
                      type="file"
                      id="car-images"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="file-input"
                    />
                    <label htmlFor="car-images" className="upload-label">
                      <FaUpload />
                      <span>Drop images here or click to upload</span>
                      <small>Maximum 10 images, JPEG or PNG only</small>
                    </label>
                  </div>
                  <div className="image-preview-grid">
                    {formData.images.map((image, index) => (
                      <div key={index} className="image-preview">
                        <img src={image.url} alt={`Preview ${index + 1}`} />
                        <button
                          type="button"
                          className="remove-image"
                          onClick={() => removeImage(index)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="form-navigation">
              {step > 1 && (
                <button
                  type="button"
                  className="prev-btn"
                  onClick={() => setStep(step - 1)}
                >
                  Previous
                </button>
              )}
              {step < 4 ? (
                <button
                  type="button"
                  className="next-btn"
                  onClick={() => setStep(step + 1)}
                >
                  Next
                </button>
              ) : (
                <button type="submit" className="submit-btn">
                  Post Car
                </button>
              )}
            </div>
          </form>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default PostCar;
