// src/pages/AdminFeedback.jsx
import React, { useEffect, useState } from "react";
import { FaStar, FaRegStar, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/Feedback.css";
import AdminSlideshow from "../components/AdminSlideshow";

const AdminFeedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [responseMessage, setResponseMessage] = useState({});

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      if (!token) throw new Error("No authentication token found");

      const res = await fetch("http://localhost:5000/api/feedback", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch feedback");
      const data = await res.json();
      setFeedbackList(data);
      setLoading(false);
    } catch (err) {
      console.error("Fetch feedback error:", err);
      setLoading(false);
    }
  };

  const handleResponseSubmit = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      const res = await fetch(`http://localhost:5000/api/feedback/${id}/response`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: responseMessage[id] }),
      });

      if (!res.ok) throw new Error("Failed to add response");
      await fetchFeedback(); // refresh list
      setResponseMessage((prev) => ({ ...prev, [id]: "" }));
      alert("Response added successfully!");
    } catch (err) {
      console.error("Response error:", err);
      alert("Error adding response");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      const res = await fetch(`http://localhost:5000/api/feedback/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error("Failed to update status");
      await fetchFeedback();
      alert("Status updated successfully!");
    } catch (err) {
      console.error("Status update error:", err);
      alert("Error updating status");
    }
  };

  const RatingStars = ({ value }) => (
    <div className="stars-container">
      {[1, 2, 3, 4, 5].map((star) =>
        star <= value ? <FaStar key={star} /> : <FaRegStar key={star} />
      )}
    </div>
  );

  return (
    <div className="feedback-page">
      <Navbar />
      <AdminSlideshow />
      <div className="feedback-container">
        <h2>Customer Feedback Dashboard</h2>

        {loading ? (
          <p className="loading-message">Loading feedback...</p>
        ) : feedbackList.length === 0 ? (
          <p>No feedback available yet.</p>
        ) : (
          <div className="feedback-history">
            {feedbackList.map((fb) => (
              <li key={fb._id} className="feedback-card">
                <div className="feedback-header">
                  <strong>Feedback by: {fb.customer?.name || "Anonymous"}</strong>
                  <span className="feedback-date">
                    {new Date(fb.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="overall-rating">
                  <span>Overall Rating:</span>
                  <RatingStars value={fb.ratings?.overall} />
                </div>

                <div className="ratings-summary">
                  <div className="rating-item">
                    <span>Car Listings:</span> <RatingStars value={fb.ratings?.listings} />
                  </div>
                  <div className="rating-item">
                    <span>Test Drives:</span> <RatingStars value={fb.ratings?.testDrive} />
                  </div>
                  <div className="rating-item">
                    <span>Trade-In:</span> <RatingStars value={fb.ratings?.tradeIn} />
                  </div>
                  <div className="rating-item">
                    <span>Negotiation:</span> <RatingStars value={fb.ratings?.negotiation} />
                  </div>
                  <div className="rating-item">
                    <span>Car Posting:</span> <RatingStars value={fb.ratings?.posting} />
                  </div>
                  <div className="rating-item">
                    <span>Car Ordering:</span> <RatingStars value={fb.ratings?.ordering} />
                  </div>
                  <div className="rating-item">
                    <span>Car Delivery:</span> <RatingStars value={fb.ratings?.delivery} />
                  </div>
                </div>

                {fb.suggestions && (
                  <div className="feedback-comment">
                    <FaQuoteLeft className="quote-icon" />
                    <p>{fb.suggestions}</p>
                    <FaQuoteRight className="quote-icon" />
                  </div>
                )}

                {/* Existing Admin Response */}
                {fb.response ? (
                  <div className="admin-response">
                    <h4>Admin Response:</h4>
                    <p>{fb.response.message}</p>
                    <small>
                      Responded on {new Date(fb.response.date).toLocaleDateString()}
                    </small>
                  </div>
                ) : (
                  <div className="response-form">
                    <textarea
                      placeholder="Write a response..."
                      value={responseMessage[fb._id] || ""}
                      onChange={(e) =>
                        setResponseMessage((prev) => ({
                          ...prev,
                          [fb._id]: e.target.value,
                        }))
                      }
                    />
                    <button
                      className="submit-button"
                      onClick={() => handleResponseSubmit(fb._id)}
                    >
                      Send Response
                    </button>
                  </div>
                )}

                {/* Status Update */}
                <div className="status-controls">
                  <label>Status:</label>
                  <select
                    value={fb.status}
                    onChange={(e) => handleStatusChange(fb._id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="published">Published</option>
                    <option value="hidden">Hidden</option>
                  </select>
                </div>
              </li>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminFeedback;
