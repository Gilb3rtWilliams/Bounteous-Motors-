const express = require("express");
const Review = require("../models/Review");
const { protect } = require("../middleware/authMiddleware");
const { getReviewsByCar, createReview } = require("../controllers/reviewController");

const router = express.Router();

// Public Routes
router.get("/:carId", getReviewsByCar);

// User Routes
router.post("/", protect, createReview);

// Submit a review
router.post("/", async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json({ message: "Review submitted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all reviews
router.get("/", async (req, res) => {
  const reviews = await Review.find().populate("user").populate("car");
  res.json(reviews);
});

// Get reviews for a specific car
router.get("/car/:carId", async (req, res) => {
  const reviews = await Review.find({ car: req.params.carId }).populate("user");
  res.json(reviews);
});

module.exports = router;
