const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
    required: true,
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  paymentMethod: {
    type: String,
    enum: ["cash", "credit card", "installments"],
    required: true,
  },
  deliveryLocation: {
    type: String,
    required: true,
  },
  adminResponse: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model("Order", orderSchema);
