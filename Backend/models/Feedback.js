const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order", // optional link if feedback is tied to an order
    },
    ratings: {
      listings: { type: Number, min: 1, max: 5 },
      testDrive: { type: Number, min: 1, max: 5 },
      tradeIn: { type: Number, min: 1, max: 5 },
      negotiation: { type: Number, min: 1, max: 5 },
      posting: { type: Number, min: 1, max: 5 },
      ordering: { type: Number, min: 1, max: 5 },
      delivery: { type: Number, min: 1, max: 5 },
      overall: { type: Number, min: 1, max: 5, required: true },
    },
    suggestions: {
      type: String,
      maxlength: 1000,
    },
    status: {
      type: String,
      enum: ["pending", "published", "hidden", "reviewed"],
      default: "pending",
    },
    response: {
      message: { type: String, trim: true },
      admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      date: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
