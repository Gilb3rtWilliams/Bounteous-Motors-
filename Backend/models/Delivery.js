const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  status: { type: String, enum: ["pending", "shipped", "delivered"], default: "pending" },
  trackingNumber: { type: String },
  estimatedDelivery: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Delivery", deliverySchema);
