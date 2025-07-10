const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: {
    type: String,
    enum: ['order', 'negotiation', 'test_drive', 'trade_in', 'car_listing_rejected', 'car_listing_approved', 'car_listing_pending' ],
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'low'
  },
  isRead: { type: Boolean, default: false },

  // Optional action: { label, link }
  action: {
    label: { type: String },
    link: { type: String }
  },

  recipientRole: { type: String, enum: ['admin', 'customer'], required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' }

}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
