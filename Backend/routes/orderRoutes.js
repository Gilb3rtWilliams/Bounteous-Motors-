const express = require("express");
const Order = require("../models/Order");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  placeOrder,
  getPendingOrders,
  approveOrder,
  rejectOrder
} = require("../controllers/orderController");

const router = express.Router();


// Customer places order
router.post('/', protect, placeOrder);

// Admin routes
router.get("/pending", adminOnly, getPendingOrders);
router.put("/:id/approve", adminOnly, approveOrder);
router.put("/:id/reject", adminOnly, rejectOrder);


module.exports = router;
