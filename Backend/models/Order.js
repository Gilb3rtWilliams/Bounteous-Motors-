const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
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
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'cash'],
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
    enum: ['Pending', 'Processing', 'Approved', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Processing', 'Completed', 'Failed'],
    default: 'Pending'
  },
  timestamps: {
    approvedAt: Date,
    deliveredAt: Date,
    paymentConfirmedAt: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('Order', orderSchema);