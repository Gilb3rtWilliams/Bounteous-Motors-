const asyncHandler = require("express-async-handler");
const Payment = require("../models/Payment");

// Fetch all payments (Admin only)
const getPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find({}).populate("user", "name email");
  res.json(payments);
});

// Create a new payment
const createPayment = asyncHandler(async (req, res) => {
  const { user, order, amount, paymentMethod, status } = req.body;
  const payment = await Payment.create({ user, order, amount, paymentMethod, status });

  if (payment) {
    res.status(201).json(payment);
  } else {
    res.status(400).json({ message: "Invalid payment data" });
  }
});

// Update payment status
const updatePaymentStatus = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id);
  if (payment) {
    payment.status = req.body.status || payment.status;
    const updatedPayment = await payment.save();
    res.json(updatedPayment);
  } else {
    res.status(404).json({ message: "Payment not found" });
  }
});

module.exports = { getPayments, createPayment, updatePaymentStatus };
