const express = require("express");
const { checkRole } = require("../middleware/rbacMiddleware");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Customer dashboard - unified view for both buying and selling activities
router.get("/dashboard", protect, checkRole(["customer"]), (req, res) => {
  res.json({ message: "Welcome to your Customer Dashboard" });
});

// Example of a buying-related route
router.get("/my-purchases", protect, checkRole(["customer"]), (req, res) => {
  res.json({ message: "Your purchase history" });
});

// Example of a selling-related route
router.get("/my-listings", protect, checkRole(["customer"]), (req, res) => {
  res.json({ message: "Your car listings" });
});

module.exports = router;
