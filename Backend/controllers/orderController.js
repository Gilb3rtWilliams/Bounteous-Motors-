const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");

// Fetch all orders (Admin only)
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "name email");
  res.json(orders);
});

// Fetch a single order by ID
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
});

// Create a new order
const createOrder = asyncHandler(async (req, res) => {
  const { user, car, totalPrice, paymentMethod, status } = req.body;
  const order = await Order.create({ user, car, totalPrice, paymentMethod, status });

  if (order) {
    res.status(201).json(order);
  } else {
    res.status(400).json({ message: "Invalid order data" });
  }
});

// Update order status
const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.status = req.body.status || order.status;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
});

module.exports = { getOrders, getOrderById, createOrder, updateOrderStatus };
