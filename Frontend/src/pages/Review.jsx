// src/pages/Reviews.jsx
import React, { useEffect, useState } from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/Feedback.css";
import Slideshow from "../components/Slideshow";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [sortBy, setSortBy] = useState("recent");
  const [filterRating, setFilterRating] = useState("all");

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [reviews, sortBy, filterRating]);

  const fetchReviews = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/reviews/published");
      if (!res.ok) throw new Error("Failed to fetch reviews");
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error("Fetch reviews error:", err);
    }
  };

  const applyFilters = () => {
    let updated = [...reviews];

    // Filter by rating
    if (filterRating !== "all") {
      updated = updated.filter((rev) => rev.rating === parseInt(filterRating));
    }

    // Sort
    if (sortBy === "recent") {
      updated.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "highest") {
      updated.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "lowest") {
      updated.sort((a, b) => a.rating - b.rating);
    }

    setFilteredReviews(updated);
  };

  return (
    <div>
      <Navbar />
      <Slideshow />
      <div className="reviews-section">
        <h2>Customer Reviews</h2>

        {/* Filters and Sorting */}
        <div className="review-controls">
          <div>
            <label>Filter by Rating: </label>
            <select value={filterRating} onChange={(e) => setFilterRating(e.target.value)}>
              <option value="all">All</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>

          <div>
            <label>Sort by: </label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="recent">Most Recent</option>
              <option value="highest">Highest Rated</option>
              <option value="lowest">Lowest Rated</option>
            </select>
          </div>
        </div>

        {/* Reviews List */}
        <div className="reviews-grid">
          {filteredReviews.length === 0 ? (
            <p>No reviews available yet.</p>
          ) : (
            filteredReviews.map((review) => (
              <div key={review._id} className="review-card">
                <div className="review-header">
                  <FaQuoteLeft className="quote-icon" />
                  <div className="stars-container">
                    {[...Array(review.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
                <p className="review-text">"{review.comment}"</p>
                <div className="review-footer">
                  <span>- {review.customer?.name || "Anonymous"}</span>
                  <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Reviews;
