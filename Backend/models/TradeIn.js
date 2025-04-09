const mongoose = require("mongoose");

const tradeInSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  oldCarDetails: { type: String, required: true },
  newCar: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  estimatedValue: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("TradeIn", tradeInSchema);
