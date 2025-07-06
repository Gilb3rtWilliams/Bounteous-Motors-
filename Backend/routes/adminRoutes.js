const express = require("express");
const { checkRole } = require("../middleware/rbacMiddleware");
const { protect } = require("../middleware/authMiddleware");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const router = express.Router();

// Admin Dashboard
router.get("/admin/dashboard", protect, checkRole(["admin"]), asyncHandler(async (req, res) => {
  // Get counts for dashboard statistics
  const userCount = await User.countDocuments({ role: "customer" });
  const adminCount = await User.countDocuments({ role: "admin" });

  res.json({
    success: true,
    data: {
      message: "Welcome to the Admin Dashboard",
      stats: {
        totalCustomers: userCount,
        totalAdmins: adminCount
      },
      admin: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
      }
    }
  });
}));

// Get all users (excluding passwords)
router.get("/users", protect, checkRole(["admin"]), asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.json({ success: true, data: users });
}));

// Get user by ID
router.get("/users/:id", protect, checkRole(["admin"]), asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json({ success: true, data: user });
}));

// Update user role
router.put("/users/:id/role", protect, checkRole(["admin"]), asyncHandler(async (req, res) => {
  const { role } = req.body;
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Prevent changing own role
  if (user.id === req.user.id) {
    res.status(400);
    throw new Error("Cannot change your own role");
  }

  user.role = role;
  await user.save();

  res.json({
    success: true,
    message: "User role updated successfully",
    data: { id: user.id, role: user.role }
  });
}));

// Delete user
router.delete("/users/:id", protect, checkRole(["admin"]), asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Prevent deleting own account
  if (user.id === req.user.id) {
    res.status(400);
    throw new Error("Cannot delete your own account");
  }

  await user.deleteOne();

  res.json({
    success: true,
    message: "User deleted successfully",
    data: { id: user.id }
  });
}));

module.exports = router;
