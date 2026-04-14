// routes/reviewRoutes.js
const express = require("express");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  createReview,
  getAllReviews,
  getPublishedReviews,
  updateReviewStatus,
  deleteReview
} = require("../controllers/reviewController");

const router = express.Router();

// Customer submits review
router.post("/", protect, createReview);

// Admin views all reviews
router.get("/", protect, adminOnly, getAllReviews);

// Public homepage reviews
router.get("/published", getPublishedReviews);

// Admin updates review status
router.put("/:id/status", protect, adminOnly, updateReviewStatus);

// Admin deletes a review
router.delete("/:id", protect, adminOnly, deleteReview);

module.exports = router;
