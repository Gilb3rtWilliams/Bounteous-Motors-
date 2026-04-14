// src/pages/AdminReviews.jsx
import React, { useEffect, useState } from "react";
import { FaStar, FaRegStar, FaCheckCircle, FaTimesCircle, FaTrash, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/Review.css";
import AdminSlideshow from "../components/AdminSlideshow";

const AdminReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("user"))?.token;
            const res = await fetch("http://localhost:5000/api/reviews", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) throw new Error("Failed to fetch reviews");

            const data = await res.json();
            setReviews(data);
        } catch (err) {
            console.error("Fetch reviews error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id, status) => {
        try {
            const token = JSON.parse(localStorage.getItem("user"))?.token;
            const res = await fetch(`http://localhost:5000/api/reviews/${id}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status }),
            });

            if (!res.ok) throw new Error("Failed to update status");
            await fetchReviews();
        } catch (err) {
            console.error("Status update error:", err);
            alert("Error updating status");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this review?")) return;
        try {
            const token = JSON.parse(localStorage.getItem("user"))?.token;
            const res = await fetch(`http://localhost:5000/api/reviews/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) throw new Error("Failed to delete review");
            await fetchReviews();
        } catch (err) {
            console.error("Delete review error:", err);
            alert("Error deleting review");
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
        <div className="review-page">
            <Navbar />
            <AdminSlideshow />
            <div className="review-container">
                <h2>Admin – Customer Reviews</h2>

                {loading ? (
                    <p className="loading-message">Loading reviews...</p>
                ) : reviews.length === 0 ? (
                    <p>No reviews available.</p>
                ) : (
                    <div className="review-list">
                        {reviews.map((review) => (
                            <div key={review._id} className="review-card">
                                <div className="review-header">
                                    <strong>{review.customer?.name || "Anonymous"}</strong>
                                    <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                                </div>

                                <div className="review-rating">
                                    <RatingStars value={review.rating} />
                                </div>

                                <br></br>

                                <p className="review-comment">
                                    <FaQuoteLeft className="quote-icon" /> {review.comment} <FaQuoteRight className="quote-icon" />
                                </p>

                                {review.recommend && (
                                    <p className="recommend-text">
                                        <FaCheckCircle color="green" /> Recommended
                                    </p>
                                )}
                                {!review.recommend && (
                                    <p className="recommend-text">
                                        <FaTimesCircle color="red" /> Not Recommended
                                    </p>
                                )}

                                {/* Status control */}
                                <div className="status-controls">
                                    <label>Status:</label>
                                    <select
                                        value={review.status}
                                        onChange={(e) => handleStatusChange(review._id, e.target.value)}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="published">Published</option>
                                        <option value="hidden">Hidden</option>
                                    </select>
                                </div>

                                <br></br>

                                {/* Delete option */}
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(review._id)}
                                >
                                    <FaTrash /> Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default AdminReviews;
