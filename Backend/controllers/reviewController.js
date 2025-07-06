const asyncHandler = require("express-async-handler");
const Review = require("../models/Review");

// Fetch all reviews for a car
const getReviewsByCar = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ car: req.params.carId }).populate("user", "name");
  res.json(reviews);
});

// Create a new review
const createReview = asyncHandler(async (req, res) => {
  const { user, car, rating, comment } = req.body;
  const review = await Review.create({ user, car, rating, comment });

  if (review) {
    res.status(201).json(review);
  } else {
    res.status(400).json({ message: "Invalid review data" });
  }
});

module.exports = { getReviewsByCar, createReview };
