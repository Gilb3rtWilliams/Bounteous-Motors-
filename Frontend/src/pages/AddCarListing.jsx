import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import axiosInstance from "../api/axios";
import { useAuth } from "../hooks/useAuth";
import AdminSlideshow from "../components/AdminSlideshow";
import "../css/AddCarListing.css";
import {
  FiInfo,
  FiSettings,
  FiUploadCloud,
  FiX,
  FiList,
  FiCheckCircle,
  FiChevronRight,
  FiChevronLeft,
} from "react-icons/fi";

const AddCarListing = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  useEffect(() => {
    if (!user?.token) navigate("/car-listings");
  }, [user, navigate]);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    price: "",
    type: "new",
    condition: "new",
    mileage: "",
    description: "",
    fuelType: "Gasoline",
    transmission: "Automatic",
    location: "",
    engine: "",
    horsepower: "",
    acceleration: "",
    features: [],
    exteriorColor: "",
    interiorColor: "",
    vin: "",
    bodyStyle: "",
    status: "Available",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    const filtered = files.filter((f) => validTypes.includes(f.type));
    if (!filtered.length)
      return Swal.fire("Invalid File", "Only images allowed", "warning");

    const newImages = filtered.map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
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
      await Swal.fire("Session Expired", "Please log in again.", "warning");
      logout();
      return;
    }

    setLoading(true);
    setMessage({});

    try {
      const sanitizeNumber = (value) => {
        const numeric = parseFloat(value.toString().replace(/[^\d.]/g, ""));
        return isNaN(numeric) ? 0 : numeric;
      };

      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "images") {
          value.forEach((img) => payload.append("images", img.file));
        } else if (key === "features") {
          payload.append("features", value.join(","));
        } else if (["price", "year", "mileage", "horsepower"].includes(key)) {
          payload.append(key, sanitizeNumber(value));
        } else {
          payload.append(key, value);
        }
      });

      await axiosInstance.post("/cars", payload);
      Swal.fire("Success", "Car listing added to the showroom.", "success");
      navigate("/car-listings");
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      setMessage({ type: "error", text: msg });
      if (msg.toLowerCase().includes("token expired")) logout();
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { id: 1, label: "Basic Identity", icon: <FiInfo /> },
    { id: 2, label: "Specifications", icon: <FiSettings /> },
    { id: 3, label: "Premium Features", icon: <FiList /> },
    { id: 4, label: "Media Gallery", icon: <FiUploadCloud /> },
  ];

  return (
    <div className="add-car-root">
      <AdminSlideshow />

      <div className="add-car-container">
        <div className="add-car-header">
          <span className="add-car-eyebrow">Inventory Management</span>
          <h1 className="add-car-title">New Vehicle Listing</h1>
        </div>

        <div className="add-car-card">
          {/* Progress Tracker */}
          <div className="progress-tracker">
            <div className="progress-line">
              <div
                className="progress-fill"
                style={{ width: `${((step - 1) / 3) * 100}%` }}
              ></div>
            </div>
            <div className="progress-steps">
              {steps.map((s) => (
                <div
                  key={s.id}
                  className={`step-item ${step >= s.id ? "active" : ""} ${step === s.id ? "current" : ""}`}
                >
                  <div className="step-circle">
                    {step > s.id ? <FiCheckCircle /> : `0${s.id}`}
                  </div>
                  <span className="step-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {message.text && (
            <div className={`form-message ${message.type}`}>{message.text}</div>
          )}

          <form className="luxury-form" encType="multipart/form-data">
            {/* STEP 1: Basic Info */}
            {step === 1 && (
              <div className="form-section fade-in">
                <h2 className="section-title">
                  {steps[0].icon} {steps[0].label}
                </h2>
                <div className="input-grid">
                  <div className="input-group">
                    <label>Manufacturer / Brand</label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      required
                      placeholder="e.g., Porsche"
                    />
                  </div>
                  <div className="input-group">
                    <label>Model</label>
                    <input
                      type="text"
                      name="model"
                      value={formData.model}
                      onChange={handleChange}
                      required
                      placeholder="e.g., 911 Carrera"
                    />
                  </div>
                  <div className="input-group">
                    <label>Model Year</label>
                    <input
                      type="number"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Asking Price (USD)</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      placeholder="0.00"
                    />
                  </div>
                  <div className="input-group">
                    <label>Vehicle Type</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                    >
                      <option value="new">New Inventory</option>
                      <option value="used">Pre-Owned</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Details */}
            {step === 2 && (
              <div className="form-section fade-in">
                <h2 className="section-title">
                  {steps[1].icon} {steps[1].label}
                </h2>
                <div className="input-grid">
                  <div className="input-group">
                    <label>Condition</label>
                    <select
                      name="condition"
                      value={formData.condition}
                      onChange={handleChange}
                    >
                      <option value="new">Pristine / New</option>
                      <option value="used">Excellent / Used</option>
                      <option value="certified pre-owned">
                        Certified Pre-Owned
                      </option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Mileage</label>
                    <input
                      type="number"
                      name="mileage"
                      value={formData.mileage}
                      onChange={handleChange}
                      placeholder="e.g., 15000"
                    />
                  </div>
                  <div className="input-group">
                    <label>Transmission</label>
                    <select
                      name="transmission"
                      value={formData.transmission}
                      onChange={handleChange}
                    >
                      <option>Automatic</option>
                      <option>Manual</option>
                      <option>CVT</option>
                      <option>PDK</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Fuel / Powertrain</label>
                    <select
                      name="fuelType"
                      value={formData.fuelType}
                      onChange={handleChange}
                    >
                      <option>Gasoline</option>
                      <option>Diesel</option>
                      <option>Electric</option>
                      <option>Hybrid</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Current Location</label>
                    <input
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g., Beverly Hills, CA"
                    />
                  </div>
                  <div className="input-group">
                    <label>Engine Specs</label>
                    <input
                      name="engine"
                      value={formData.engine}
                      onChange={handleChange}
                      placeholder="e.g., 3.0L Twin-Turbo Flat-6"
                    />
                  </div>
                  <div className="input-group">
                    <label>Horsepower</label>
                    <input
                      name="horsepower"
                      value={formData.horsepower}
                      onChange={handleChange}
                      placeholder="e.g., 379 hp"
                    />
                  </div>
                  <div className="input-group">
                    <label>0-60 Acceleration</label>
                    <input
                      name="acceleration"
                      value={formData.acceleration}
                      onChange={handleChange}
                      placeholder="e.g., 4.0 sec"
                    />
                  </div>
                  <div className="input-group">
                    <label>Exterior Finish</label>
                    <input
                      name="exteriorColor"
                      value={formData.exteriorColor}
                      onChange={handleChange}
                      placeholder="e.g., Guards Red"
                    />
                  </div>
                  <div className="input-group">
                    <label>Interior Finish</label>
                    <input
                      name="interiorColor"
                      value={formData.interiorColor}
                      onChange={handleChange}
                      placeholder="e.g., Black Leather"
                    />
                  </div>
                  <div className="input-group">
                    <label>VIN Number</label>
                    <input
                      name="vin"
                      value={formData.vin}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group">
                    <label>Body Style</label>
                    <input
                      name="bodyStyle"
                      value={formData.bodyStyle}
                      onChange={handleChange}
                      placeholder="e.g., Coupe"
                    />
                  </div>
                  <div className="input-group">
                    <label>Listing Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="Available">Available</option>
                      <option value="Pending">Pending</option>
                      <option value="Reserved">Reserved</option>
                    </select>
                  </div>
                </div>

                <div
                  className="input-group full-width"
                  style={{ marginTop: "20px" }}
                >
                  <label>Vehicle Description / Story</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Craft a compelling narrative about this vehicle..."
                    rows="5"
                  />
                </div>
              </div>
            )}

            {/* STEP 3: Features */}
            {step === 3 && (
              <div className="form-section fade-in">
                <h2 className="section-title">
                  {steps[2].icon} {steps[2].label}
                </h2>
                <div className="input-group full-width">
                  <label>List amenities (comma separated)</label>
                  <input
                    type="text"
                    name="features"
                    placeholder="Carbon Ceramic Brakes, Sport Chrono Package, Burmester Audio..."
                    value={formData.features.join(", ")}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        features: e.target.value
                          .split(",")
                          .map((f) => f.trimLeft()),
                      }))
                    }
                  />
                </div>
                <div className="feature-tags-preview">
                  {formData.features.filter(Boolean).map((f, i) => (
                    <span key={i} className="feature-tag">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: Media */}
            {step === 4 && (
              <div className="form-section fade-in">
                <h2 className="section-title">
                  {steps[3].icon} {steps[3].label}
                </h2>

                <div className="upload-zone">
                  <input
                    type="file"
                    id="media-upload"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden-file-input"
                  />
                  <label htmlFor="media-upload" className="upload-trigger">
                    <FiUploadCloud className="upload-icon" />
                    <span>Browse High-Resolution Images</span>
                    <small>JPEG, PNG, WEBP allowed.</small>
                  </label>
                </div>

                {formData.images.length > 0 && (
                  <div className="media-preview-grid">
                    {formData.images.map((img, i) => (
                      <div key={i} className="media-thumbnail">
                        <img src={img.url} alt={`preview-${i}`} />
                        <button
                          type="button"
                          className="remove-media-btn"
                          onClick={() => removeImage(i)}
                        >
                          <FiX />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </form>

          {/* Navigation */}
          <div className="form-footer-nav">
            <button
              className="btn-nav outline"
              onClick={() => setStep(step - 1)}
              style={{ visibility: step > 1 ? "visible" : "hidden" }}
            >
              <FiChevronLeft /> Previous
            </button>

            {step < 4 ? (
              <button
                className="btn-nav primary"
                onClick={() => setStep(step + 1)}
              >
                Next Step <FiChevronRight />
              </button>
            ) : (
              <button
                className="btn-nav primary execute"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  "Publishing..."
                ) : (
                  <>
                    <FiCheckCircle /> Publish Listing
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCarListing;
