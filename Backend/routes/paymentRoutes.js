const express = require("express");
const Payment = require("../models/Payment");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  getPayments,
  createPayment,
  updatePaymentStatus,
} = require("../controllers/paymentController");


const router = express.Router();

// User Routes
router.post("/", protect, createPayment);

// Admin Routes
router.get("/", protect, adminOnly, getPayments);
router.put("/:id/status", protect, adminOnly, updatePaymentStatus);

// Make a payment
router.post("/", async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.status(201).json({ message: "Payment successful!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all payments
router.get("/", async (req, res) => {
  const payments = await Payment.find().populate("order").populate("user");
  res.json(payments);
});

module.exports = router;
