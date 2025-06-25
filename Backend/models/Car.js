const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  type: { type: String, enum: ["new", "used"], required: true },
  mileage: { type: Number, default: 0 },
  images: [{ type: String }],
  description: { type: String },

   // User who created the listing
  seller: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
},

  createdAt: { type: Date, default: Date.now },
  
  // Additional fields for detailed information
  condition: { type: String, enum: ["New", "Used", "Certified Pre-Owned"], required: true },
  fuelType: { type: String, enum: ["Gasoline", "Diesel", "Electric", "Hybrid", "Other"] },
  transmission: { type: String, enum: ["Automatic", "Manual", "CVT", "Other"] },
  location: { type: String },
  
  // Performance specifications
  engine: { type: String },
  horsepower: { type: String },
  acceleration: { type: String },
  
  // Features and amenities
  features: [{ type: String }],
  
  // Additional specifications
  exteriorColor: { type: String },
  interiorColor: { type: String },
  vin: { type: String },
  bodyStyle: { type: String },
  
  // Status
  status: { type: String, enum: ["Available", "Sold", "Reserved"], default: "Available" },

  
  // Timestamps for various events
  lastModified: { type: Date, default: Date.now },
  soldDate: { type: Date }
});

module.exports = mongoose.model("Car", carSchema);
