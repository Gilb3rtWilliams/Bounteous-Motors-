const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Car = require("../models/Car");

// Fetch all cars
const getCars = asyncHandler(async (req, res) => {
  const cars = await Car.find({});
  res.json(cars);
});

// Fetch a single car by ID with full details
const getCarById = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id)
    .populate('seller', 'name email') // Populate seller details
    .select('-__v'); // Exclude version key

  if (car) {
    // Enhance the car object with additional details
    const enhancedCar = {
      ...car.toObject(),
      features: car.features || [],
      performance: {
        engine: car.engine || 'Not specified',
        horsepower: car.horsepower || 'Not specified',
        acceleration: car.acceleration || 'Not specified',
        transmission: car.transmission || 'Not specified'
      },
      location: car.location || 'Not specified',
      fuelType: car.fuelType || 'Not specified'
    };
    res.json(enhancedCar);
  } else {
    res.status(404).json({ message: "Car not found" });
  }
});

// Create a new car listing (Admin only)
const createCar = async (req, res) => {
  try {
    const { brand, model, year, price, type, mileage, images, description, seller } = req.body;

    // ✅ Check for missing required fields
    if (!brand || !model || !year || !price || !type || !seller) {
      return res.status(400).json({ message: "Please provide all required fields: brand, model, year, price, type, and seller." });
    }

    // ✅ Validate `type` (must be either "new" or "used")
    if (!["new", "used"].includes(type.toLowerCase())) {
      return res.status(400).json({ message: "Type must be either 'new' or 'used'." });
    }

    // ✅ Ensure seller ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(seller)) {
      return res.status(400).json({ message: "Invalid seller ID format" });
    }

    // ✅ Create a new car
    const car = new Car({
      brand,
      model,
      year,
      price,
      type,
      mileage: mileage || 0, // Default to 0 if not provided
      images: images || [], // Default to empty array if not provided
      description: description || "No description available",
      seller, // Must be a valid ObjectId
    });

    await car.save();
    res.status(201).json({ message: "Car added successfully", car });

  } catch (error) {
    console.error("Error creating car:", error);

    // ✅ Handle validation errors specifically
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Validation Error", errors: error.errors });
    }

    res.status(500).json({ message: "Internal Server Error" });
  }
};


// Update a car listing
const updateCar = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id);
  if (car) {
    car.name = req.body.name || car.name;
    car.brand = req.body.brand || car.brand;
    car.model = req.body.model || car.model;
    car.price = req.body.price || car.price;
    car.condition = req.body.condition || car.condition;
    car.description = req.body.description || car.description;
    
    const updatedCar = await car.save();
    res.json(updatedCar);
  } else {
    res.status(404).json({ message: "Car not found" });
  }
});

// Delete a car
const deleteCar = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id);
  if (car) {
    await car.remove();
    res.json({ message: "Car deleted successfully" });
  } else {
    res.status(404).json({ message: "Car not found" });
  }
});

module.exports = { getCars, getCarById, createCar, updateCar, deleteCar };
