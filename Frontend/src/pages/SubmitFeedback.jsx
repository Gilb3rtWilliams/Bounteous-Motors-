// pages/SubmitFeedback.jsx
import React, { useState, useEffect } from "react";
import { FaStar, FaRegStar, FaPaperPlane, FaHistory, FaInfoCircle } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/Feedback.css";
import CustomerSlideshow from "../components/CustomerSlideshow";

const SubmitFeedback = () => {
  const [feedbackHistory, setFeedbackHistory] = useState([]);
  const [newFeedback, setNewFeedback] = useState({
    ratings: {
      listings: 0,
      testDrive: 0,
      tradeIn: 0,
      negotiation: 0,
      posting: 0,
      ordering: 0,
      delivery: 0,
      overall: 0
    },
    suggestions: ""
  });

  useEffect(() => {
    fetchMyFeedback();
  }, []);

  const fetchMyFeedback = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      const res = await fetch("http://localhost:5000/api/feedback/my", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setFeedbackHistory(data);
    } catch (err) {
      console.error("Error fetching feedback history:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      const res = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(newFeedback)
      });
      const data = await res.json();
      if (data.success) {
        setFeedbackHistory([data.feedback, ...feedbackHistory]);
        setNewFeedback({
          ratings: {
            listings: 0, testDrive: 0, tradeIn: 0,
            negotiation: 0, posting: 0, ordering: 0,
            delivery: 0, overall: 0
          },
          suggestions: ""
        });
        alert("Feedback submitted successfully!");
      }
    } catch (err) {
      console.error("Error submitting feedback:", err);
    }
  };

  const RatingStars = ({ value, onChange }) => (
    <div className="stars-container">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} onClick={() => onChange(star)}>
          {star <= value ? <FaStar /> : <FaRegStar />}
        </span>
      ))}
    </div>
  );

  // Guidance text for tooltips
  const serviceDescriptions = {
    listings: "How clear and easy-to-navigate our car listings are.",
    testDrive: "Your experience with scheduling and completing a test drive.",
    tradeIn: "Your experience with our trade-in process.",
    negotiation: "Was the negotiation process fair and transparent?",
    posting: "How easy was it to post or view cars in the system?",
    ordering: "The ordering process, from selection to confirmation.",
    delivery: "Was delivery or pickup timely and convenient?",
    overall: "Your overall satisfaction with Bounteous Motors."
  };

  return (
    <div className="feedback-page">
      <Navbar />
      <CustomerSlideshow />
      <div className="feedback-container">
        <h2>We Value Your Feedback</h2>
        <p className="feedback-intro">
          At <strong>Bounteous Motors</strong>, we prioritize user-centered design. 
          Your feedback helps us improve our services and create a better experience for you. 
          Please rate each service below and share your suggestions.
        </p>

        <br></br>

        <form onSubmit={handleSubmit} className="feedback-form">
          {Object.keys(newFeedback.ratings).map((key) => (
            <div className="rating-group" key={key}>
              <label>
                {key.charAt(0).toUpperCase() + key.slice(1)}{" "}
                <span className="tooltip">
                  <FaInfoCircle className="info-icon" />
                  <span className="tooltip-text">{serviceDescriptions[key]}</span>
                </span>
              </label>
              <RatingStars
                value={newFeedback.ratings[key]}
                onChange={(val) =>
                  setNewFeedback({
                    ...newFeedback,
                    ratings: { ...newFeedback.ratings, [key]: val }
                  })
                }
              />
            </div>
          ))}

          <div className="form-group">
            <label>Suggestions</label>
            <textarea
              value={newFeedback.suggestions}
              onChange={(e) =>
                setNewFeedback({ ...newFeedback, suggestions: e.target.value })
              }
              placeholder="Tell us how we can improve..."
              rows="4"
            ></textarea>
          </div>

          <button type="submit" className="submit-button">
            <FaPaperPlane /> Submit
          </button>
        </form>

        <h3><FaHistory /> My Feedback History</h3>
        <ul className="feedback-history">
          {feedbackHistory.map((fb) => (
            <li key={fb._id}>
              <strong>Overall:</strong> {fb.ratings.overall}/5 <br />
              <small>{fb.suggestions}</small>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default SubmitFeedback;
