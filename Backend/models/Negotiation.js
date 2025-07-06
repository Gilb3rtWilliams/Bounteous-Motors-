const mongoose = require("mongoose");

const negotiationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
    required: true,
  },
  offeredPrice: {
    type: Number,
    required: true,
  },
  status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

const Negotiation = mongoose.model("Negotiation", negotiationSchema);
module.exports = Negotiation;