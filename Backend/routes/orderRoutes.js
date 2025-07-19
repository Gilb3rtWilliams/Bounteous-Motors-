const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const {
  createOrder,
  getOrdersByUser,
  getAllOrders,
  updateOrder,
  deleteOrder,
  approveOrder,
  updateOrderStatus
} = require('../controllers/orderController');
console.log({
  createOrder,
  getOrdersByUser,
  getAllOrders,
  updateOrder,
  deleteOrder,
  approveOrder,
  updateOrderStatus
});

// @route   POST /api/orders
router.post('/', protect, createOrder);

// @route   GET /api/orders/user/:userId
router.get('/user/:userId', protect, getOrdersByUser);

// @route   GET /api/orders (admin)
router.get('/', protect, adminOnly, getAllOrders);

// @route   PUT /api/orders/:id
router.put('/:id', protect, adminOnly, updateOrder);

// @route   DELETE /api/orders/:id
router.delete('/:id', protect, adminOnly, deleteOrder);

// @route   PATCH /api/orders/approve/:id
router.patch('/approve/:id', protect, adminOnly, approveOrder);

// @route PATCH /api/orders/update-status/:id
router.patch("/update-status/:id", protect, adminOnly, updateOrderStatus);


module.exports = router;
