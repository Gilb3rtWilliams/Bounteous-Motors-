import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiLock,
  FiCheck,
  FiCamera,
  FiShield,
  FiChevronDown,
  FiChevronUp,
  FiShieldOff,
} from "react-icons/fi";
import AuthContext from "../context/AuthContext";
import Navbar from "../components/Navbar";
import AdminSlideshow from "../components/AdminSlideshow";
import Footer from "../components/Footer";
import "../css/Profile.css";

const AdminProfile = () => {
  // RETAINED BACKEND LOGIC & CONTEXT
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
    // Role-based protection logic
    if (!user || user.role !== "admin") {
      navigate(user ? "/" : "/admin/login");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      name: user.name || "",
      email: user.email || "",
      bio: user.bio || "System Administrator for Bounteous Motors.",
    }));
  }, [user, navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "Updating administrative records...", type: "info" });

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
        setMessage({
          text: "Admin profile updated successfully.",
          type: "success",
        });
        setFormData((prev) => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        }));
        setShowPasswordFields(false);
      } else {
        setMessage({ text: result.error || "Update failed.", type: "error" });
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
    : "AD";

  return (
    <div className="profile-page-root">
      <Navbar />

      <main className="profile-content">
        {/* --- LUXURY ADMIN HERO SECTION --- */}
        <section className="profile-hero">
          <AdminSlideshow />
          <div className="profile-container">
            <div className="profile-header-flex">
              <div className="avatar-wrapper">
                {/* Gold border remains for Admin as per Dashboard aesthetic */}
                <div
                  className="profile-avatar-large"
                  style={{ borderColor: "var(--gold)" }}
                >
                  {initials}
                </div>
                <button className="avatar-edit-badge">
                  <FiCamera />
                </button>
              </div>

              <div className="profile-identity">
                <span
                  className="identity-eyebrow"
                  style={{ color: "var(--gold)" }}
                >
                  Authorized Personnel
                </span>
                <h1 className="identity-name">{user?.name}</h1>
                <p className="identity-bio">"{formData.bio}"</p>
              </div>

              <div className="profile-quick-stats">
                <div
                  className="stat-box"
                  style={{ borderRightColor: "var(--gold)" }}
                >
                  <span className="stat-label">Access Level</span>
                  <span className="stat-value" style={{ color: "var(--gold)" }}>
                    Root Admin
                  </span>
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
                <h3 className="card-title">System Privileges</h3>
                <p className="card-sub">
                  You are logged into the Bounteous Motors secure node. Changes
                  here affect your administrative credentials.
                </p>
                <div
                  className="security-status"
                  style={{ color: "var(--gold)" }}
                >
                  <FiShield className="status-icon" />
                  <span>Secure Session</span>
                </div>
              </div>
            </aside>

            {/* Main Form */}
            <div className="profile-main-card">
              <form onSubmit={handleSubmit} className="premium-form">
                <div className="form-section-header">
                  <h2 className="section-title">Administrative Identity</h2>
                </div>

                <div className="input-row">
                  <div className="form-group">
                    <label>Public Name</label>
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
                    <label>Official Registry</label>
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
                  <label>Professional Bio</label>
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
                    style={{ color: "var(--gold)" }}
                    onClick={() => setShowPasswordFields(!showPasswordFields)}
                  >
                    <span>Authentication Settings</span>
                    {showPasswordFields ? <FiChevronUp /> : <FiChevronDown />}
                  </button>

                  {showPasswordFields && (
                    <div className="password-drawer">
                      <div className="form-group">
                        <label>Current Credentials</label>
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
                          <label>New Passphrase</label>
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
                          <label>Verify Entry</label>
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
                  <button
                    type="submit"
                    className="btn-premium"
                    style={{ backgroundColor: "var(--gold)" }}
                  >
                    <FiCheck /> Synchronize Vault
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

export default AdminProfile;
