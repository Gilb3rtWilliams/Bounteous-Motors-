// routes/feedbackRoutes.js
const express = require("express");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  createFeedback,
  getAllFeedback,
  getMyFeedback,
  addResponse,
  updateFeedbackStatus
} = require("../controllers/feedbackController");

const router = express.Router();

// Customer submits feedback
router.post("/", protect, createFeedback);

// Customer views their feedback history
router.get("/my", protect, getMyFeedback);

// Admin views all feedback
router.get("/", protect, adminOnly, getAllFeedback);

// Admin responds to feedback
router.post("/:id/response", protect, adminOnly, addResponse);

// Admin updates feedback status
router.put("/:id/status", protect, adminOnly, updateFeedbackStatus);

module.exports = router;
