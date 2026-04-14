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

  // Collect missing fields
  const missingFields = [];
  if (!carId) missingFields.push("carId");
  if (!buyerId) missingFields.push("buyerId");
  if (!sellerId) missingFields.push("sellerId");
  if (!paymentMethod) missingFields.push("paymentMethod");
  if (!deliveryOption) missingFields.push("deliveryOption");
  if (!pickupDate) missingFields.push("pickupDate");
  if (!paymentAmount) missingFields.push("paymentAmount");

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  console.log("📥 Incoming order payload:", req.body);

  const order = new Order({
    carId,
    buyerId,
    sellerId,
    paymentMethod,
    deliveryOption,
    pickupDate,
    paymentAmount,
    orderStatus: "Processing",
    paymentStatus: "Pending",
  });

  const savedOrder = await order.save();

  res.status(201).json({
    success: true,
    message: "Order created successfully",
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

  // ✅ Only allow expected fields
  if (!["orderStatus", "paymentStatus"].includes(field)) {
    res.status(400);
    throw new Error("Invalid field");
  }

  order[field] = value;
  await order.save();

  // ✅ Try sending notification (won’t crash if it fails)
  try {
    if (order.buyerId) {
      await Notification.create({
        userId: order.buyerId,
        recipientRole: "customer",  // 👈 since it’s the customer receiving the update
        type: "order",           // 👈 you can categorize (order, payment, delivery, etc.)
        title: `${field} updated`,
        message: `Your order #${order._id.toString().slice(0, 8).toUpperCase()} now has ${field} set to ${value}.`
      });
    }
  } catch (err) {
    console.error("❌ Notification failed:", err.message);
  }

  res.json({ message: `${field} updated successfully.`, order });
});

// @desc Cancel an order
// @route DELETE /api/orders/:id/cancel
// @access Private (Customer only)
const cancelOrder = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // ✅ Ensure order belongs to logged-in user
    if (order.buyerId.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: "Not authorized to cancel this order" });
    }

    // ✅ Prevent cancelling if already delivered or completed
    if (["Delivered", "Completed", "Cancelled"].includes(order.orderStatus)) {
      return res.status(400).json({ success: false, message: `Order cannot be cancelled (status: ${order.orderStatus})` });
    }

    // ✅ Update status
    order.orderStatus = "Cancelled";
    order.paymentStatus = "Refunded"; // optional
    await order.save();

    const handleCancel = async (orderId) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to cancel this order? This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, cancel it!",
      });

      if (!result.isConfirmed) return; // ❌ stop if user canceled

      try {
        const API_URL = "http://localhost:5000/api";
        const { data } = await axios.delete(`${API_URL}/orders/${orderId}/cancel`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        // ✅ Toast notification on success
        toast.success(data.message || "Order canceled successfully!");

        // Refresh orders in state
        setOrders((prevOrders) =>
          prevOrders.map((o) =>
            o._id === orderId ? { ...o, orderStatus: "Canceled" } : o
          )
        );
      } catch (error) {
        console.error("Cancel order error:", error);
        toast.error(error.response?.data?.message || "Failed to cancel order");
      }
    };

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    console.error("Cancel order error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred while canceling order",
    });
  }
});




// 🔄 Export All Controllers
module.exports = {
  createOrder,
  getOrdersByUser,
  getAllOrders,
  updateOrder,
  deleteOrder,
  approveOrder,
  updateOrderStatus,
  cancelOrder
};
