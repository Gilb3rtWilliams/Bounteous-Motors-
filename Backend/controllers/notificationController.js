const asyncHandler = require("express-async-handler");
const Notification = require("../models/Notification");

// GET /api/notifications - Get all notifications for logged in user
const getNotifications = asyncHandler(async (req, res) => {
  
  const notifications = await Notification.find({
    user: req.user.id,
    recipientRole: req.user.role // 🔥 Filter by the user's role
  })
    .populate('car', 'brand model year')
    .populate('order', 'totalAmount status')
    .sort({ createdAt: -1 });

  res.json(notifications);
});

// POST /api/notifications - Create a notification
const createNotification = asyncHandler(async (req, res) => {
  const {
    title,
    message,
    type,
    priority = 'low',
    recipientRole,
    user, // Optional: can be set manually or default to req.user.id
    car,
    order,
    action
  } = req.body;

  if (!title || !message || !type || !recipientRole) {
    return res.status(400).json({ message: "Missing required fields: title, message, type, recipientRole" });
  }

  const notification = await Notification.create({
    title,
    message,
    type,
    priority,
    recipientRole,
    user: user || req.user._id,
    car,
    order,
    action
  });

  res.status(201).json({ message: "Notification created successfully", notification });
});

// PUT /api/notifications/:id/read - Mark notification as read
const markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);
  if (!notification) {
    return res.status(404).json({ message: "Notification not found" });
  }

  notification.isRead = true;
  await notification.save();
  res.json({ message: "Notification marked as read", notification });
});

module.exports = { getNotifications, createNotification, markAsRead };
