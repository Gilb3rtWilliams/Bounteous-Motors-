const Order = require('../models/Order');
const Notification = require('../models/Notification');
const asyncHandler = require('express-async-handler');

// 🔹 Create a New Order
const createOrder = asyncHandler(async (req, res) => {
  const {
    carId,
    buyerId,
    sellerId,
    paymentMethod,
    deliveryOption,
    pickupDate,
    paymentAmount,
  } = req.body;

  if (
    !carId ||
    !buyerId ||
    !sellerId ||
    !paymentMethod ||
    !deliveryOption ||
    !pickupDate ||
    !paymentAmount
  ) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required.',
    });
  }

  const order = new Order({
    carId,
    buyerId,
    sellerId,
    paymentMethod,
    deliveryOption,
    pickupDate,
    paymentAmount,
    orderStatus: 'Processing',
    paymentStatus: 'Pending',
  });

  const savedOrder = await order.save();
  res.status(201).json({
    success: true,
    message: 'Order created successfully',
    order: savedOrder,
  });
});

// 🔹 Get Orders for a Specific Buyer
const getOrdersByUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  const orders = await Order.find({ buyerId: userId })
    .populate('carId')
    .sort({ createdAt: -1 });

  res.json({ success: true, orders });
});

// 🔹 Get All Orders (Admin)
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate('carId buyerId sellerId')
    .sort({ createdAt: -1 });

  res.json({ success: true, orders });
});

// 🔹 Update Order Status or Payment Status
const updateOrder = asyncHandler(async (req, res) => {
  const { orderStatus, paymentStatus } = req.body;

  const updates = {};

  if (orderStatus) {
    updates.orderStatus = orderStatus;
    if (orderStatus === 'Approved') updates['timestamps.approvedAt'] = new Date();
    if (orderStatus === 'Delivered') updates['timestamps.deliveredAt'] = new Date();
  }

  if (paymentStatus) {
    updates.paymentStatus = paymentStatus;
    if (paymentStatus === 'Completed') updates['timestamps.paymentConfirmedAt'] = new Date();
  }

  const updatedOrder = await Order.findByIdAndUpdate(
    req.params.id,
    { $set: updates },
    { new: true }
  );

  if (!updatedOrder) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  res.json({
    success: true,
    message: 'Order updated successfully',
    order: updatedOrder,
  });
});

// 🔹 Delete an Order (Admin or Buyer)
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  await order.deleteOne();
  res.json({ success: true, message: 'Order deleted successfully' });
});

// 🔹 Admin Approves Order and Sends Notification
const approveOrder = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  order.orderStatus = 'Processing';
  order.paymentStatus = "Processing";
  await order.save();

  const notification = new Notification({
    userId: order.buyerId,
    title: 'Order Approved',
    message: `Your order #${order._id.toString().slice(0, 8).toUpperCase()} has been approved and is now being processed.`,
    type: 'order',
    link: '/my-orders',
    read: false,
  });

  await notification.save();

  res.json({
    success: true,
    message: 'Order approved and buyer notified.',
    order,
  });
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { field, value } = req.body;
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  if (!["orderStatus", "paymentStatus"].includes(field)) {
    res.status(400);
    throw new Error("Invalid field");
  }

  order[field] = value;
  await order.save();

  // Optional: Send notification
  await Notification.create({
    userId: order.buyerId,
    title: `${field} updated`,
    message: `Your order #${order._id.toString().slice(0, 8).toUpperCase()} now has ${field} set to ${value}.`
  });

  res.json({ message: `${field} updated successfully.` });
});


// 🔄 Export All Controllers
module.exports = {
  createOrder,
  getOrdersByUser,
  getAllOrders,
  updateOrder,
  deleteOrder,
  approveOrder,
  updateOrderStatus
};
