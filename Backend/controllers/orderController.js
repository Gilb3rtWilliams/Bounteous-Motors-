const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");
const Notification = require("../models/Notification");
const Car = require("../models/Car");

// 🟢 Customer places an order
const placeOrder = asyncHandler(async (req, res) => {
  const { carId, paymentMethod, deliveryLocation } = req.body;

  console.log('🔍 Request Body:', req.body);
  console.log('👤 User:', req.user);

  if (!carId || !paymentMethod || !deliveryLocation) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const order = await Order.create({
    car: carId,
    buyer: req.user._id,
    paymentMethod,
    deliveryLocation
  });

  await Notification.create({
    message: `New order placed by ${req.user.name} for car ID ${carId}`,
    recipientRole: 'admin',
    user: req.user._id,
    car: carId
  });

  res.status(201).json({ success: true, order });
});


// 🔵 Admin gets all pending orders
const getPendingOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ status: 'pending' })
    .populate('car')
    .populate('buyer', 'name email');
  res.json(orders);
});

// ✅ Admin approves an order
const approveOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('buyer');
  if (!order) return res.status(404).json({ message: 'Order not found' });

  order.status = "approved";
  await order.save();

  await Notification.create({
    message: `Your order for car ID ${order.car} has been approved.`,
    recipientRole: 'customer',
    user: order.buyer._id,
    car: order.car
  });

  res.json({ success: true, message: "Order approved" });
});

// ❌ Admin rejects an order
const rejectOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('buyer');
  if (!order) return res.status(404).json({ message: 'Order not found' });

  order.status = "rejected";
  order.adminResponse = req.body.reason || 'No reason provided';
  await order.save();

  await Notification.create({
    message: `Your order was rejected. Reason: ${order.adminResponse}`,
    recipientRole: 'customer',
    user: order.buyer._id,
    car: order.car
  });

  res.json({ success: true, message: "Order rejected" });
});

module.exports = { 
  placeOrder,
  getPendingOrders,
  approveOrder,
  rejectOrder};
