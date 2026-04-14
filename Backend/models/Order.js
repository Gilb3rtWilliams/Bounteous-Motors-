const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car',
      required: true
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false // ✅ allow admin-posted cars
    },
    paymentMethod: {
      type: String,
      enum: ['credit_card', 'cash', 'trade_in'], // ✅ future proof for trade-ins
      required: true
    },
    deliveryOption: {
      type: String,
      enum: ['pickup', 'home_delivery'],
      required: true
    },
    pickupDate: {
      type: Date,
      required: true
    },
    paymentAmount: {
      type: Number,
      required: true
    },
    orderStatus: {
      type: String,
      enum: [
        'Pending',
        'Processing',
        'Approved',
        'Completed',
        'Delivered',
        'Cancelled'
      ],
      default: 'Pending'
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Processing', 'Paid', 'Refunded'],
      default: 'Pending'
    },
    approvedAt: Date,
    deliveredAt: Date,
    paymentConfirmedAt: Date
  },
  { timestamps: true } // ✅ auto add createdAt, updatedAt
);

module.exports = mongoose.model('Order', orderSchema);
