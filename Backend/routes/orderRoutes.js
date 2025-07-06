const express = require("express");
const Order = require("../models/Order");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
} = require("../controllers/orderController");

const router = express.Router();

// User Routes
router.post("/", protect, createOrder);
router.get("/:id", protect, getOrderById);

// Admin Routes
router.get("/", protect, adminOnly, getOrders);
router.put("/:id/status", protect, adminOnly, updateOrderStatus);

// Place an order
router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ message: "Order placed successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all orders
router.get("/", async (req, res) => {
  const orders = await Order.find().populate("user").populate("car");
  res.json(orders);
});

// Get order by ID
router.get("/:id", async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user").populate("car");
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
});

module.exports = router;
