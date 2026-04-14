// controllers/reviewController.js
const Review = require("../models/Review");

// @desc Create new review
// @route POST /api/reviews
// @access Customer
const createReview = async (req, res) => {
  try {
    const { rating, comment, recommend } = req.body;

    const review = new Review({
      customer: req.user._id,
      rating,
      comment,
      recommend
    });

    await review.save();

    res.status(201).json({
      message: "Review submitted successfully and is pending approval",
      review
    });
  } catch (error) {
    console.error("Create review error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Get all reviews (Admin)
// @route GET /api/reviews
// @access Admin
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("customer", "name email")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    console.error("Get all reviews error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Get published reviews (Homepage/Public)
// @route GET /api/reviews/published
// @access Public
const getPublishedReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ status: "published" })
      .populate("customer", "name")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    console.error("Get published reviews error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Update review status (publish/hide)
// @route PUT /api/reviews/:id/status
// @access Admin
const updateReviewStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    review.status = status;
    await review.save();

    res.json({
      message: `Review status updated to ${status}`,
      review
    });
  } catch (error) {
    console.error("Update review status error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Delete review
// @route DELETE /api/reviews/:id
// @access Admin  

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    await review.deleteOne();
    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    console.error("Delete review error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


module.exports = {
  createReview,
  getAllReviews,
  getPublishedReviews,
  updateReviewStatus,
  deleteReview
};
