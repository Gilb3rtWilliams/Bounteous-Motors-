const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  // Basic Info
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  type: { type: String, enum: ['new', 'used'], required: true },

  // Status & Moderation
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected', 'Available', 'Sold', 'Reserved'], default: 'Pending' },
  rejectionReason: { type: String, default: '' },
  listedByAdmin: { type: Boolean, default: false },

  // Seller Info
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Condition & Specs
  condition: { type: String, enum: ['new', 'used', 'certified pre-owned'], required: true },
  mileage: { type: Number, default: 0 },
  fuelType: { type: String, enum: ['Gasoline', 'Diesel', 'Electric', 'Hybrid', 'Other'] },
  transmission: { type: String, enum: ['Automatic', 'Manual', 'CVT', 'Other'] },
  location: { type: String },

  // Performance
  engine: { type: String },
  horsepower: { type: Number },  // Keep as number for calculations
  acceleration: { type: String },

  // Appearance & Details
  exteriorColor: { type: String },
  interiorColor: { type: String },
  vin: { type: String },
  bodyStyle: { type: String },
  description: { type: String },

  // Features & Images
  features: [{ type: String }],
  images: [{ type: String }],

  // Sold info
  soldDate: { type: Date }
}, { timestamps: true }); // Adds createdAt and updatedAt

module.exports = mongoose.model('Car', carSchema);
