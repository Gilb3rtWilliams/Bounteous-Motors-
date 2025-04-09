const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { getNotifications, createNotification, markAsRead } = require("../controllers/notificationController");

const router = express.Router();

// User Routes
router.get("/", protect, getNotifications);
router.post("/", protect, createNotification);
router.put("/:id/read", protect, markAsRead);

module.exports = router;
