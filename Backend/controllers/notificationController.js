const asyncHandler = require("express-async-handler");
const Notification = require("../models/Notification");

// Fetch all notifications for a user
const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ recipient: req.user.id }); // Ensure correct filtering
  res.json(notifications);
});

// Create a new notification
const createNotification = asyncHandler(async (req, res) => {
  const { recipient, message } = req.body;

  if (!recipient || !message) {
    return res.status(400).json({ message: "Recipient and message are required" });
  }

  const notification = new Notification({ recipient, message, isRead: false });
  await notification.save();

  res.status(201).json({ message: "Notification created successfully", notification });
});

// Mark a notification as read
const markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);
  if (notification) {
    notification.isRead = true;
    await notification.save();
    res.json({ message: "Notification marked as read" });
  } else {
    res.status(404).json({ message: "Notification not found" });
  }
});

module.exports = { getNotifications, createNotification, markAsRead };
