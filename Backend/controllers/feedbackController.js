// controllers/feedbackController.js
const Feedback = require("../models/Feedback");

// @desc Create new feedback (customer)
// @route POST /api/feedback
// @access Customer
const createFeedback = async (req, res) => {
  try {
    const { ratings, suggestions, order } = req.body;

    const feedback = new Feedback({
      customer: req.user._id,
      order,
      ratings,
      suggestions
    });

    await feedback.save();

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      feedback
    });
  } catch (error) {
    console.error("Feedback submission error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get all feedback (Admin only)
// @route GET /api/feedback
const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate("customer", "name email")
      .sort({ createdAt: -1 });

    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get feedback by logged-in customer
// @route GET /api/feedback/my
const getMyFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ customer: req.user._id })
      .sort({ createdAt: -1 });

    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Add admin response to feedback
// @route POST /api/feedback/:id/response
// @access Admin
const addResponse = async (req, res) => {
  try {
    const { message } = req.body;
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    feedback.response = {
      message,
      admin: req.user._id,
      date: new Date(),
    };

    await feedback.save();

    res.json({
      message: "Response added successfully",
      feedback,
    });
  } catch (error) {
    console.error("Add response error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Update feedback status
// @route PUT /api/feedback/:id/status
// @access Admin
const updateFeedbackStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    feedback.status = status;
    await feedback.save();

    res.json({
      message: "Feedback status updated successfully",
      feedback,
    });
  } catch (error) {
    console.error("Update status error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createFeedback, getAllFeedback, getMyFeedback, addResponse, updateFeedbackStatus };
