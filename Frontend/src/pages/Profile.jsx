import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEdit3,
  FiCheck,
  FiCamera,
  FiShield,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import AuthContext from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/Profile.css";

const CustomerProfile = () => {
  // RETAINED BACKEND LOGIC
  const { user, updateProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [message, setMessage] = useState({ text: "", type: "" });
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  useEffect(() => {
    if (!user || user.role !== "customer") {
      navigate(user ? "/" : "/login");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      name: user.name || "",
      email: user.email || "",
      bio: user.bio || "Distinguished Member of Bounteous Motors.",
    }));
  }, [user, navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "Syncing profile with registry...", type: "info" });

    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmNewPassword
    ) {
      setMessage({ text: "Passwords do not match.", type: "error" });
      return;
    }

    try {
      const result = await updateProfile(formData);
      if (result.success) {
        setMessage({ text: "Profile updated successfully.", type: "success" });
        setFormData((prev) => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        }));
        setShowPasswordFields(false);
      } else {
        setMessage({
          text: result.error || "Failed to update profile.",
          type: "error",
        });
      }
    } catch {
      setMessage({ text: "A system error occurred.", type: "error" });
    }
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "BM";

  return (
    <div className="profile-page-root">
      <Navbar />

      <main className="profile-content">
        {/* --- LUXURY HERO SECTION --- */}
        <section className="profile-hero">
          <div className="profile-container">
            <div className="profile-header-flex">
              <div className="avatar-wrapper">
                <div className="profile-avatar-large">{initials}</div>
                <button className="avatar-edit-badge">
                  <FiCamera />
                </button>
              </div>

              <div className="profile-identity">
                <span className="identity-eyebrow">MEMBER PROFILE</span>
                <h1 className="identity-name">{user?.name}</h1>
                <p className="identity-bio">"{formData.bio}"</p>
              </div>

              <div className="profile-quick-stats">
                <div className="stat-box">
                  <span className="stat-label">Member Since</span>
                  <span className="stat-value">2024</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- DATA MANAGEMENT AREA --- */}
        <section className="profile-container">
          {message.text && (
            <div className={`message ${message.type}`}>{message.text}</div>
          )}

          <div className="profile-grid">
            {/* Sidebar info */}
            <aside className="profile-sidebar">
              <div className="sidebar-card">
                <h3 className="card-title">Security Status</h3>
                <p className="card-sub">
                  Your account is encrypted and secured with Bounteous Motors'
                  tier-one protection.
                </p>
                <div className="security-status">
                  <FiShield className="status-icon" />
                  <span>Account Verified</span>
                </div>
              </div>
            </aside>

            {/* Main Form */}
            <div className="profile-main-card">
              <form onSubmit={handleSubmit} className="premium-form">
                <div className="form-section-header">
                  <h2 className="section-title">Identity & Contact</h2>
                </div>

                <div className="input-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <div className="input-wrap">
                      <FiUser className="input-icon" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Email Registry</label>
                    <div className="input-wrap">
                      <FiMail className="input-icon" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Personal Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="3"
                  />
                </div>

                {/* Password Toggle */}
                <div className="password-toggle-area">
                  <button
                    type="button"
                    className="toggle-password-btn"
                    onClick={() => setShowPasswordFields(!showPasswordFields)}
                  >
                    <span>Security Credentials</span>
                    {showPasswordFields ? <FiChevronUp /> : <FiChevronDown />}
                  </button>

                  {showPasswordFields && (
                    <div className="password-drawer">
                      <div className="form-group">
                        <label>Current Password</label>
                        <div className="input-wrap">
                          <FiLock className="input-icon" />
                          <input
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="input-row" style={{ marginTop: "15px" }}>
                        <div className="form-group">
                          <label>New Password</label>
                          <div className="input-wrap">
                            <FiLock className="input-icon" />
                            <input
                              type="password"
                              name="newPassword"
                              value={formData.newPassword}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Confirm New</label>
                          <div className="input-wrap">
                            <FiLock className="input-icon" />
                            <input
                              type="password"
                              name="confirmNewPassword"
                              value={formData.confirmNewPassword}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn-premium">
                    <FiCheck /> Synchronize Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CustomerProfile;
