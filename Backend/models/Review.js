const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, maxlength: 1000, required: true },
  recommend: { type: Boolean, default: false }, // Would they recommend Bounteous Motors?
  status: {
    type: String,
    enum: ["pending", "published", "hidden"],
    default: "pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Review", reviewSchema);
