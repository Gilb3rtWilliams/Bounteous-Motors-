// src/pages/SubmitReview.jsx
import React, { useState } from "react";
import { FaStar, FaRegStar, FaPaperPlane } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/Review.css";
import CustomerSlideshow from "../components/CustomerSlideshow";

const SubmitReview = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [recommend, setRecommend] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !comment.trim()) {
      alert("Please provide a rating and comment.");
      return;
    }

    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      const res = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating, comment, recommend }),
      });

      if (!res.ok) throw new Error("Failed to submit review");

      setRating(0);
      setComment("");
      setRecommend(false);
      alert("Review submitted successfully! Pending approval.");
    } catch (err) {
      console.error("Submit review error:", err);
      alert("Error submitting review. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const RatingStars = ({ value, onChange }) => (
    <div className="stars-container">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onChange(star)}
          className="star"
        >
          {star <= value ? <FaStar /> : <FaRegStar />}
        </span>
      ))}
    </div>
  );

  return (
    <div className="review-page">
      <Navbar />
        <CustomerSlideshow />
      <div className="review-container">
        <h2>Share Your Experience</h2>
        <p>
          At <strong>Bounteous Motors</strong>, we value your voice. Your
          reviews help us improve and guide other customers in making the
          right decision.
        </p>

        <form className="review-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Overall Rating</label>
            <RatingStars value={rating} onChange={setRating} />
          </div>

          <div className="form-group">
            <label>Would you recommend us?</label>
            <input
              type="checkbox"
              checked={recommend}
              onChange={(e) => setRecommend(e.target.checked)}
            />{" "}
            Yes
          </div>

          <div className="form-group">
            <label>Your Review</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us about your experience..."
              rows="4"
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            <FaPaperPlane /> {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default SubmitReview;
